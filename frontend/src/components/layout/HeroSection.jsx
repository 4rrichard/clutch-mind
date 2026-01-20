import { useContext, useState } from "react";
import DecisionCarousel from "./DecisionCarousel";
import SkeletonDecisionCarousel from "./SkeletonDecisionCarousel";
import SearchSection from "./SearchSection";
import DecisionContext from "../../context/DecisionProvider";
import AiChatModal from "./AiChatModal";

function HeroSection() {
    const { recommendDecisions } = useContext(DecisionContext);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    //const [searchValue, setSearchValue] = useState("");

    async function handleSearch(value) {
        setIsSearching(true);
        setIsLoading(true);

        try {
            await recommendDecisions(value);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="hero-bg flex min-h-[100svh] sm:min-h-screen w-full pb-16 sm:pb-24 overflow-x-hidden">
            <div
                className={`w-full flex flex-col justify-start sm:justify-center content-center text-center transition-all duration-300${
                    isSearching
                        ? "pt-32 justify-center overflow-y-hidden"
                        : "pt-16 sm:pt-24 md:pt-28 lg:pt-32"
                }`}
            >
                <div
                    className={`overflow-hidden transition-all duration-500 ${
                        isSearching
                            ? "max-h-0 opacity-0 -translate-y-4"
                            : "max-h-[200px] opacity-100 translate-y-0"
                    }`}
                >
                    <h1 className="text-7xl text-primary font-bold drop-shadow">
                        Clutch Mind
                    </h1>

                    <p className="text-secondary text-xl max-w-xl mx-auto">
                        Find the perfect decision for a certain scenario.
                    </p>
                </div>

                <div className="w-full flex flex-col items-center gap-10 sm:gap-12 lg:gap-0">
                    <div
                        className={`w-full transition-all duration-700 ease-out transform-gpu
    ${isSearching ? "opacity-100 scale-100" : "translate-y-0 opacity-100 scale-100"}`}
                    >
                        <SearchSection
                            onSearch={handleSearch}
                            onOpenChat={() => setIsChatOpen(true)}
                        />
                    </div>

                    {isSearching && (
                        <div className="w-full flex flex-col items-center mt-12 sm:mt-0">
                            {isLoading ? (
                                <SkeletonDecisionCarousel />
                            ) : (
                                <div className="w-full max-w-6xl px-4 sm:px-0">
                                    <DecisionCarousel />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {isChatOpen && (
                <AiChatModal
                    isOpen={isChatOpen}
                    onClose={() => setIsChatOpen(false)}
                />
            )}
        </section>
    );
}

export default HeroSection;
