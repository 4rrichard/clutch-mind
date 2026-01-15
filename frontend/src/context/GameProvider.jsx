import { createContext, useState } from "react";
// import mockData from "../data/games.json";
import { RECOMMENDATION_PROMPT } from "../ai/prompts";
const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
    const [games, setGames] = useState([]);
    const [summary, setSummary] = useState("");

    console.log(games);

    const askAI = async (prompt) => {
        try {
            const response = await fetch("/api/gemini/recommend", {
                method: "POST",
                headers: { "Content-Type": "text/plain" },
                body: prompt,
            });
            return response.text();
        } catch (error) {
            console.error("AI error:", error);
            return null;
        }
    };

    const searchGames = async (userInput) => {
        try {
            // mock data
            // setGames(mockData.results);

            const aiResponse = await askAI(RECOMMENDATION_PROMPT(userInput));

            const clean = aiResponse
                .replace(/```json/gi, "")
                .replace(/```/g, "")
                .trim();

            console.log("Clean AI output:", clean);

            const parsed = JSON.parse(clean);
            setSummary(parsed.summary);
            const gameTitlesWithMatch = parsed.titles;

            let results = [];

            for (const item of gameTitlesWithMatch) {
                const resp = await fetch(
                    `/api/recommend?recommendation=${item.name}`
                );
                const gameData = await resp.json();
                results.push({
                    ...gameData[0],
                    match: item.match,
                });
            }
            setGames(results);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <GameContext.Provider value={{ games, searchGames, summary }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;
