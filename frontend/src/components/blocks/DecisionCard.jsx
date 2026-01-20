import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DecisionCard = ({ decision, isActive }) => {
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        if (!isActive) setFlipped(false);
    }, [isActive]);

    const periodLabel = decision.period ? `Q${decision.period}` : null;

    const scoreDiff = Number(decision.startscoredifferential);
    const scoreState = Number.isFinite(scoreDiff)
        ? scoreDiff > 0
            ? `LEADING (+${scoreDiff})`
            : scoreDiff < 0
              ? `TRAILING (${scoreDiff})`
              : "TIED (0)"
        : null;

    const timeLabel =
        decision.starttime && decision.endtime
            ? `${decision.starttime}–${decision.endtime}`
            : null;

    const startTypeLabel = decision.starttype ? decision.starttype : null;

    const scenarioLine = [periodLabel, timeLabel, scoreState, startTypeLabel]
        .filter(Boolean)
        .join(" • ");

    const conf = (decision.confidence || "").toLowerCase();

    const confidenceMap = {
        high: {
            label: "High",
            percent: 85,
            bar: "bg-green-500",
            pill: "bg-green-500/15 text-green-600 border-green-500/30",
        },
        medium: {
            label: "Medium",
            percent: 60,
            bar: "bg-yellow-500",
            pill: "bg-yellow-500/15 text-yellow-700 border-yellow-500/30",
        },
        low: {
            label: "Low",
            percent: 35,
            bar: "bg-red-500",
            pill: "bg-red-500/15 text-red-600 border-red-500/30",
        },
        unknown: {
            label: "Confidence",
            percent: 50,
            bar: "bg-primary",
            pill: "bg-primary/10 text-primary border-primary/20",
        },
    };

    const confidence = confidenceMap[conf] ?? confidenceMap.unknown;

    return (
        <div
            className={`w-full h-full ${isActive ? "cursor-pointer" : "cursor-default"}`}
            style={{ perspective: "1000px" }}
            onClick={() => isActive && setFlipped((v) => !v)}
            role={isActive ? "button" : undefined}
            tabIndex={isActive ? 0 : -1}
            onKeyDown={(e) => {
                if (!isActive) return;
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
                    <div className="p-3 sm:p-4 h-full flex flex-col gap-2 sm:gap-3">
                        <div className="flex-none">
                            <div className="flex items-start justify-between gap-2 min-w-0">
                                <h3 className="font-semibold leading-snug text-sm sm:text-base line-clamp-2 sm:line-clamp-3 min-w-0">
                                    {decision.title}
                                </h3>
                            </div>

                            {scenarioLine && (
                                <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-1 break-words mt-1">
                                    {scenarioLine}
                                </p>
                            )}
                        </div>

                        <div className="rounded-lg border bg-muted/30 p-3">
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-xs text-muted-foreground">
                                    Confidence
                                </span>

                                <span
                                    className={`text-xs px-2 py-0.5 rounded-full border ${confidence.pill}`}
                                >
                                    {confidence.label}
                                </span>

                                <span className="text-xs tabular-nums text-muted-foreground">
                                    {confidence.percent}%
                                </span>
                            </div>

                            <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
                                <div
                                    className={`h-full ${confidence.bar}`}
                                    style={{ width: `${confidence.percent}%` }}
                                />
                            </div>
                        </div>

                        {Array.isArray(decision.tags) &&
                            decision.tags.length > 0 && (
                                <div className="mt-auto flex flex-wrap gap-1.5 sm:gap-2">
                                    {decision.tags
                                        .slice(0, 2)
                                        .map((tag, idx) => (
                                            <Badge
                                                key={`${tag}-${idx}`}
                                                variant="outline"
                                                className="text-[11px] sm:text-xs"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                </div>
                            )}

                        {isActive && (
                            <p className="text-[11px] text-muted-foreground/70 mt-1">
                                Click to view details
                            </p>
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
                            <h3 className="font-semibold leading-tight">
                                Details
                            </h3>
                            {/* <Badge variant="secondary" className="shrink-0">
                                Click to flip
                            </Badge> */}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {scoreState && (
                                <Badge variant="outline">{scoreState}</Badge>
                            )}
                            {periodLabel && (
                                <Badge variant="outline">{periodLabel}</Badge>
                            )}
                            {decision.turnovers != null && (
                                <Badge variant="outline">
                                    TO: {decision.turnovers}
                                </Badge>
                            )}
                        </div>

                        {decision.detailed ? (
                            <p className="text-sm text-left text-muted-foreground overflow-auto">
                                {decision.detailed}
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
