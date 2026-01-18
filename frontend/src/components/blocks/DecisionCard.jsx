import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DecisionCard = ({ decision }) => {
    return (
        <Card className="w-full h-full pt-15 text-primary bg-card cursor-pointer">
            <CardHeader className="select-none overflow-hidden whitespace-normal space-y-2">
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-2">
                        {decision.title}
                    </CardTitle>

                    {decision.confidence && (
                        <Badge variant="secondary" className="shrink-0">
                            {decision.confidence}
                        </Badge>
                    )}
                </div>

                {decision.summary && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {decision.summary}
                    </p>
                )}
            </CardHeader>

            <CardContent className="pt-0">
                {Array.isArray(decision.tags) && decision.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {decision.tags.slice(0, 4).map((tag, idx) => (
                            <Badge key={`${tag}-${idx}`} variant="outline">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default DecisionCard;
