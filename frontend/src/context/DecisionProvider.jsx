import { createContext, useState } from "react";
const DecisionContext = createContext(null);

export const DecisionProvider = ({ children }) => {
    const [decisions, setDecisions] = useState([]);
    const [summary, setSummary] = useState("");

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

    const recommendDecisions = async (userInput) => {
        try {
            const aiResponse = await askAI(userInput);

            const clean = aiResponse
                .replace(/```json/gi, "")
                .replace(/```/g, "")
                .trim();

            console.log("Clean AI output:", clean);

            const parsed = JSON.parse(clean);
            setSummary(parsed.summary || "");

            const decisions = parsed.recommendations || [];
            setDecisions(decisions);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DecisionContext.Provider
            value={{ decisions, recommendDecisions, summary }}
        >
            {children}
        </DecisionContext.Provider>
    );
};

export default DecisionContext;
