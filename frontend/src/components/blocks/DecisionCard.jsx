import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DecisionCard = ({ decision }) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className="w-full h-full cursor-pointer"
            style={{ perspective: "1000px" }}
            onClick={() => setFlipped((v) => !v)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setFlipped((v) => !v);
            }}
        >
            <div
                className="relative w-full h-full transition-transform duration-500"
                style={{
                    transformStyle: "preserve-3d",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >
                <Card
                    className="absolute inset-0 bg-card text-primary"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div className="p-4 space-y-3 h-full flex flex-col">
                        <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold leading-tight line-clamp-3">
                                {decision.title}
                            </h3>

                            {decision.confidence && (
                                <Badge variant="secondary" className="shrink-0">
                                    {decision.confidence}
                                </Badge>
                            )}
                        </div>

                        {Array.isArray(decision.tags) &&
                            decision.tags.length > 0 && (
                                <div className="mt-auto flex flex-wrap gap-2">
                                    {decision.tags
                                        .slice(0, 4)
                                        .map((tag, idx) => (
                                            <Badge
                                                key={`${tag}-${idx}`}
                                                variant="outline"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                </div>
                            )}
                    </div>
                </Card>

                <Card
                    className="absolute inset-0 bg-card text-primary"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    <div className="p-4 h-full flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold leading-tight line-clamp-2">
                                Details
                            </h3>
                            <Badge variant="secondary" className="shrink-0">
                                Click to flip
                            </Badge>
                        </div>

                        {decision.summary ? (
                            <p className="text-sm text-muted-foreground overflow-auto">
                                {decision.summary}
                            </p>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                No extra details available.
                            </p>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DecisionCard;
