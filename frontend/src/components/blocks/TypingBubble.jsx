import React from "react";

function TypingBubble() {
    return (
        <div className="max-w-[80%] p-3 rounded-xl text-sm mr-auto bg-white/10 text-white border border-white/10 flex gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-typing-dot"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-typing-dot delay-150"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-typing-dot delay-300"></div>
        </div>
    );
}

export default TypingBubble;
