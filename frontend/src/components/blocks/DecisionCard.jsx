import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardDescription,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";

const DecisionCard = ({ gameData }) => {
    return (
        <Card className="w-full h-full pt-0 text-primary bg-card cursor-pointer">
            <CardContent className="px-0 relative">
                <img
                    src={gameData.image}
                    alt="Banner"
                    className="aspect-16/10 rounded-t-xl object-cover"
                />
                {gameData.match && (
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur select-none">
                        {gameData.match}% Match
                    </div>
                )}
            </CardContent>
            <CardHeader className="select-none overflow-hidden line-clamp-2 whitespace-normal">
                <CardTitle>{gameData.title}</CardTitle>
            </CardHeader>
        </Card>
    );
};

export default DecisionCard;
