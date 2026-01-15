import { useContext, useState } from "react";
import GameCarousel from "./GameCarousel";
import SkeletonGameCarousel from "./SkeletonGameCarousel";
import SearchSection from "./SearchSection";
import GameContext from "../../context/GameProvider";
import AiChatModal from "./AiChatModal";

function HeroSection() {
    const { searchGames } = useContext(GameContext);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    //const [searchValue, setSearchValue] = useState("");

    async function handleSearch(value) {
        setIsSearching(true);
        setIsLoading(true);
        //setSearchValue(value);

        await searchGames(value);
        // setTimeout(() => {
        //     setIsLoading(false);
        // }, 1200);
        setIsLoading(false);
    }

    return (
        <section className="hero-bg flex min-h-screen  w-full">
            <div
                className={`w-full flex flex-col justify-center content-center text-center transition-all duration-300${
                    isSearching
                        ? "pt-32 justify-center overflow-y-hidden"
                        : "pt-32"
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

                <div
                    className={` w-full transition-all duration-700 ease-out transform-gpu
        ${
            isSearching
                ? "opacity-100 scale-100"
                : "translate-y-0 opacity-100 scale-100"
        }`}
                >
                    <SearchSection
                        onSearch={handleSearch}
                        onOpenChat={() => setIsChatOpen(true)}
                    />
                </div>

                {isSearching && (
                    <div className="mt-10 w-full flex flex-col justify-center">
                        {isLoading ? (
                            <SkeletonGameCarousel />
                        ) : (
                            <div className=" w-full">
                                <GameCarousel />
                            </div>
                        )}
                    </div>
                )}
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
