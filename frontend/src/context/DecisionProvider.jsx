import { createContext, useState } from "react";
const DecisionContext = createContext(null);

const USE_MOCK = false;

const mockResponse = {
    summary:
        "Down 1, ~10 seconds left, off timeout — need a high-quality look with turnover safety.",
    recommendations: [
        {
            title: "High PnR to force a switch",
            summary:
                "Use a high screen to create a mismatch and get a paint touch or kickout.",
            detailed:
                "Run a high pick-and-roll with strong spacing. If they switch, attack the mismatch quickly. If they blitz, hit the short roll and play 4v3.",
            confidence: "High",
            tags: ["Clutch", "PnR", "Spacing"],
        },
        {
            title: "Quick-hitter: zipper into DHO",
            summary: "A quick action to get downhill without over-dribbling.",
            detailed:
                "Use a zipper cut into a dribble handoff to generate momentum. The goal is to attack the gap early before help loads. Keep the second option as a corner kickout.",
            confidence: "Medium",
            tags: ["ATO", "DHO", "Tempo"],
        },
        {
            title: "Empty-corner drive + lift",
            summary: "Create a clear lane and a simple read: finish or spray.",
            detailed:
                "Place shooters on the weak side and clear the strong-side corner. Drive hard to the rim; if the low man helps, make the lift pass for a catch-and-shoot.",
            confidence: "Medium",
            tags: ["Paint touch", "Read", "Kickout"],
        },
        {
            title: "Post mismatch with safety outlet",
            summary:
                "If you have a size advantage, punish it with a clean entry and outlet.",
            detailed:
                "Enter the ball to the mismatch and keep a safety outlet above the break. If the double comes, hit the outlet and swing to the weak side. Avoid slow cross-court passes late.",
            confidence: "Low",
            tags: ["Mismatch", "Outlet", "No TO"],
        },
        {
            title: "Two-for-one mindset (if clock fits)",
            summary:
                "If there’s enough time, prioritize a quick shot to get another possession.",
            detailed:
                "If the shot clock and game clock allow it, take a good quick attempt early. The aim is to guarantee the last shot. Don’t force a bad look just for speed.",
            confidence: "Low",
            tags: ["Clock", "2-for-1", "Shot quality"],
        },
    ],
};

export const DecisionProvider = ({ children }) => {
    const [decisions, setDecisions] = useState([]);
    const [summary, setSummary] = useState("");
    const [error, setError] = useState("");

    const askBackend = async (userInput) => {
        const response = await fetch("/api/decision/recommend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userInput }),
        });

        const contentType = response.headers.get("content-type") || "";

        if (!response.ok) {
            const errorText = contentType.includes("application/json")
                ? JSON.stringify(await response.json())
                : await response.text();
            throw new Error(`Backend error ${response.status}: ${errorText}`);
        }

        return response.json();
    };

    const recommendDecisions = async (userInput) => {
        try {
            setError("");

            if (USE_MOCK) {
                setSummary(mockResponse.summary);
                setDecisions(mockResponse.recommendations);
                return;
            }

            const parsed = await askBackend(userInput);

            setSummary(parsed.summary || "");
            setDecisions(parsed.recommendations || []);
        } catch (e) {
            console.error(e);
            setError(e.message || "Unknown error");
            setSummary("");
            setDecisions([]);
        }
    };

    return (
        <DecisionContext.Provider
            value={{ decisions, recommendDecisions, summary, error }}
        >
            {children}
        </DecisionContext.Provider>
    );
};

export default DecisionContext;
