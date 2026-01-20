import DecisionContext from "../../context/DecisionProvider";
import React, { useContext } from "react";

function DecisionRequest() {
    const { summary, error } = useContext(DecisionContext);

    if (!summary && !error) return null;

    return (
        <div className="mt-3 sm:mt-5 md:mt-6 flex flex-col gap-2 text-secondary text-sm sm:text-base">
            {summary && (
                <p className="w-full text-left text-sm sm:text-base md:truncate md:whitespace-nowrap">
                    Scenario: <strong>{summary}</strong>
                </p>
            )}

            {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
    );
}

export default DecisionRequest;
