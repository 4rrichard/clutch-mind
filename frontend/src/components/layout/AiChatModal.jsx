import React, { useContext, useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import AiChatInput from "../blocks/AiChatInput";
import AiChatConversation from "../blocks/AiChatConversation";
import DecisionContext from "../../context/DecisionProvider";

function AiChatModal({ isOpen, onClose }) {
    const { recommendDecisions } = useContext(DecisionContext);

    const [messages, setMessages] = useState([
        { sender: "ai", text: "Hi! how can I help you?" },
    ]);

    useEffect(() => {
        localStorage.setItem("chat", JSON.stringify(messages));
    }, [messages]);

    const sendChatMessage = async (message) => {
        const response = await fetch("/api/gemini/chat", {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: message,
        });
        return await response.text();
    };

    const handleUserMessage = async (text) => {
        setMessages((prev) => [
            ...prev,
            { sender: "user", text },
            { sender: "ai", text: "", loading: true },
        ]);

        const aiReply = await sendChatMessage(text);

        setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { sender: "ai", text: aiReply };
            return copy;
        });
    };

    const handleAiRecommend = (text) => {
        onClose();
        recommendDecisions(text);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose} className={"h-[700px] "}>
            <DialogContent
                aria-describedby={undefined}
                className="sm:max-w-lg border-2 border-solid border-white"
            >
                <DialogHeader className="text-center">
                    <DialogTitle className="text-xl text-white">
                        AI Basketball Assistant
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col h-[480px]">
                    <AiChatConversation
                        messages={messages}
                        onAiRecommend={handleAiRecommend}
                    />
                    <AiChatInput onUserMessage={handleUserMessage} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AiChatModal;
