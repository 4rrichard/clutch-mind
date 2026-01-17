import SkeletonDecisionCard from "../blocks/SkeletonDecisionCard";

function SkeletonDecisionCarousel() {
    return (
        <div className="flex justify-center gap-6 px-4">
            <SkeletonDecisionCard />
            <SkeletonDecisionCard />
            <SkeletonDecisionCard />
        </div>
    );
}
export default SkeletonDecisionCarousel;
