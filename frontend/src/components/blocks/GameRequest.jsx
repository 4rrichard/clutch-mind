import GameContext from "../../context/GameProvider";
import React, { useContext } from "react";

function GameRequest() {
    const { summary } = useContext(GameContext);

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

export default GameRequest;
