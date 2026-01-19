import DecisionContext from "../../context/DecisionProvider";
import React, { useContext } from "react";

function DecisionRequest() {
    const { summary, error } = useContext(DecisionContext);

    if (!summary && !error) return null;

    return (
        <div className="flex flex-col items-start text-secondary text-lg mt-4 gap-2">
            {summary && (
                <p>
                    Showing results for: <strong>{summary}</strong>
                </p>
            )}

            {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
    );
}

export default DecisionRequest;
