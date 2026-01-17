import { Skeleton } from "@/components/ui/skeleton";

function SkeletonDecisionCard() {
    return (
        <div className="min-w-[340px]">
            <Skeleton className="aspect-video w-full min-h-[180px] rounded-xl bg-white/10 animate-pulse" />

            <div className="mt-4 space-y-2">
                <Skeleton className="h-5 w-2/3 bg-white/10 animate-pulse" />
                <Skeleton className="h-4 w-full bg-white/10 animate-pulse" />
                <Skeleton className="h-4 w-4/5 bg-white/10 animate-pulse" />
            </div>

            <div className="mt-4 flex gap-3">
                <Skeleton className="h-10 w-24 rounded-md bg-white/10 animate-pulse" />
                <Skeleton className="h-10 w-24 rounded-md bg-white/10 animate-pulse" />
            </div>
        </div>
    );
}

export default SkeletonDecisionCard;
