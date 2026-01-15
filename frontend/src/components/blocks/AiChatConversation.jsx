import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TypingBubble from "./TypingBubble";
import AiRecommendButton from "./AiRecommendButton";
import { useEffect, useRef } from "react";

function normalize(text) {
    return text.replace(/\\n/g, "\n");
}

function isRecommendationMessage(text) {
    return text.includes("###") || text.includes("- ");
}

function AiChatConversation({ messages, onAiRecommend }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scroll">
            {messages.map((msg, i) => {
                console.log(msg.text);
                if (msg.loading) return <TypingBubble key={i} />;

                const isUser = msg.sender === "user";

                return (
                    <div
                        key={i}
                        className={`max-w-[80%] p-3 rounded-xl text-sm ${
                            isUser
                                ? "ml-auto bg-primary text-white"
                                : "mr-auto bg-white/10 text-white border border-white/10"
                        }`}
                    >
                        {isUser ? (
                            msg.text
                        ) : (
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h3: ({ node, ...props }) => (
                                        <h3
                                            className="font-semibold text-white mt-2 mb-1"
                                            {...props}
                                        />
                                    ),
                                    ul: ({ node, ...props }) => (
                                        <ul
                                            className="list-disc ml-4 space-y-1"
                                            {...props}
                                        />
                                    ),
                                    li: ({ node, ...props }) => (
                                        <li className="text-white" {...props} />
                                    ),
                                    p: ({ node, ...props }) => (
                                        <p
                                            className="my-1 leading-snug text-white"
                                            {...props}
                                        />
                                    ),
                                }}
                            >
                                {normalize(msg.text)}
                            </ReactMarkdown>
                        )}
                        {!isUser && isRecommendationMessage(msg.text) && (
                            <AiRecommendButton
                                onClick={() => onAiRecommend(msg.text)}
                            />
                        )}
                    </div>
                );
            })}
            <div ref={bottomRef} />
        </div>
    );
}

export default AiChatConversation;
