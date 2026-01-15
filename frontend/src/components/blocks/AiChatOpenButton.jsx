import { Sparkles } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

function AiChatOpenButton({ onOpen }) {
    return (
        <Tooltip delayDuration={150}>
            <TooltipTrigger asChild>
                <button
                    type="button"
                    onClick={onOpen}
                    className="
                        absolute right-5 top-1/2 -translate-y-1/2 
                        text-white opacity-70 
                        hover:opacity-100 
                        transition-all duration-300
                        p-1 rounded-full
                        hover:scale-110
                        hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]
                        active:scale-95
                        hover:cursor-pointer
                    "
                >
                    <Sparkles
                        className="
                            w-6 h-6
                            transition-all duration-300
                            group-hover:rotate-12
                        "
                    />
                </button>
            </TooltipTrigger>

            <TooltipContent
                side="top"
                className="
                    bg-white/10 
                    backdrop-blur-md
                    border border-white/20 
                    text-white 
                    shadow-lg 
                    px-3 py-1.5 
                    rounded-md
                    text-sm
                    transition-all duration-200
                "
            >
                <p>Chat with AI</p>
            </TooltipContent>
        </Tooltip>
    );
}

export default AiChatOpenButton;
