import React, { useContext, useState, useEffect } from "react";
import DecisionCard from "../blocks/DecisionCard";
import DecisionContext from "../../context/DecisionProvider";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

function DecisionCarousel() {
    const { decisions } = useContext(DecisionContext);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        setSelectedIndex(0);
    }, [decisions.length]);

    const moveToSelected = (direction) => {
        if (direction === "next") {
            setSelectedIndex((prev) => (prev + 1) % decisions.length);
        } else {
            setSelectedIndex((prev) =>
                prev === 0 ? decisions.length - 1 : prev - 1,
            );
        }
    };

    const getSlideClasses = (index) => {
        const relative =
            (index - selectedIndex + decisions.length) % decisions.length;

        // CENTER
        if (relative === 0)
            return "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[300px] md:h-[300px] z-30 scale-100 opacity-100 transition-all duration-700 pointer-events-auto hover:scale-110 hover:z-40 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] text-xl";

        //  RIGHT 1
        if (relative === 1)
            return "absolute top-1/2 left-[72%] -translate-x-1/2 -translate-y-1/2 w-[210px] h-[210px] sm:w-[240px] sm:h-[240px] md:w-[260px] md:h-[260px] z-10 scale-90 opacity-80 transition-all duration-700 blur-[1px] pointer-events-none text-lg";

        // RIGHT 2
        if (relative === 2)
            return "absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[220px] md:h-[220px] -translate-y-[15%] z-5 scale-75 opacity-50 blur-sm transition-all duration-700 pointer-events-none";

        // LEFT 1
        if (relative === decisions.length - 1)
            return "absolute top-1/2 left-[28%] -translate-x-1/2 -translate-y-1/2 w-[210px] h-[210px] sm:w-[240px] sm:h-[240px] md:w-[260px] md:h-[260px] z-10 scale-90 opacity-80 blur-[1px] transition-all duration-700 pointer-events-none text-lg";

        // LEFT 2
        if (relative === decisions.length - 2)
            return "absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[220px] md:h-[220px] -translate-y-[15%] z-5 scale-75 opacity-50 blur-sm transition-all duration-700 pointer-events-none";

        // HIDDEN
        return "absolute opacity-0 pointer-events-none transition-all duration-700";
    };

    if (!decisions || decisions.length === 0) {
        return <p className="text-center text-white">No decisions yet.</p>;
    }

    return (
        <div className="w-full mt-0 sm:mt-3 overflow-visible">
            <div className="relative h-[260px] sm:h-[340px] w-full mt-1 sm:mt-3">
                {decisions.map((decision, index) => {
                    const relative =
                        (index - selectedIndex + decisions.length) %
                        decisions.length;

                    return (
                        <div
                            key={decision.title ?? index}
                            className={getSlideClasses(index)}
                        >
                            <DecisionCard
                                decision={decision}
                                isActive={relative === 0}
                            />
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-center gap-10 mt-3 sm:mt-4">
                <button
                    onClick={() => moveToSelected("prev")}
                    className="text-white"
                >
                    <ArrowBigLeft className="w-10 h-10 sm:w-12 sm:h-12 stroke-white hover:fill-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] transition-all duration-300" />
                </button>

                <button
                    onClick={() => moveToSelected("next")}
                    className="text-white"
                >
                    <ArrowBigRight className="w-10 h-10 sm:w-12 sm:h-12 stroke-white hover:fill-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] transition-all duration-300" />
                </button>
            </div>
        </div>
    );
}

export default DecisionCarousel;
