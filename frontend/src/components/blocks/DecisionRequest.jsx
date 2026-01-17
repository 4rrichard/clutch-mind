import DecisionContext from "../../context/DecisionProvider";
import React, { useContext } from "react";

function DecisionRequest() {
    const { summary } = useContext(DecisionContext);

    return (
        <div className="flex content-start text-secondary text-lg mt-4">
            {summary ? (
                <p>
                    Showing results for: <strong>{summary}</strong>
                </p>
            ) : null}
        </div>
    );
}

export default DecisionRequest;
