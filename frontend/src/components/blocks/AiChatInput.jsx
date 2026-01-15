import React, { useState } from "react";
import { Input } from "../ui/input";

function AiChatInput({ onUserMessage }) {
    const [value, setValue] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        onUserMessage(value);
        setValue("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Let me help..."
                required
                className={
                    "h-14 border-2 border-solid border-white rounded-full placeholder:text-white/40 caret-white text-white"
                }
            />
        </form>
    );
}

export default AiChatInput;
