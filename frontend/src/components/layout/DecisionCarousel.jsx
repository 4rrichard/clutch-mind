import React, { useContext, useState } from "react";
import DecisionCard from "../blocks/DecisionCard";
import DecisionContext from "../../context/DecisionProvider";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

function DecisionCarousel() {
    const { decisions } = useContext(DecisionContext);
    const [selectedIndex, setSelectedIndex] = useState(0);

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
            return "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] z-30 scale-100 opacity-100 transition-all duration-700 pointer-events-auto hover:scale-130 hover:z-40 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] text-xl";

        //  RIGHT 1
        if (relative === 1)
            return "absolute top-1/2 left-[72%] -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] z-10 scale-90 opacity-80 transition-all duration-700 blur-[1px] pointer-events-none text-lg";

        // RIGHT 2
        if (relative === 2)
            return "absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] -translate-y-[15%] z-5 scale-75 opacity-50 blur-sm transition-all duration-700 pointer-events-none";

        // LEFT 1
        if (relative === decisions.length - 1)
            return "absolute top-1/2 left-[28%] -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] z-10 scale-90 opacity-80 blur-[1px] transition-all duration-700 pointer-events-none text-lg";

        // LEFT 2
        if (relative === decisions.length - 2)
            return "absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] -translate-y-[15%] z-5 scale-75 opacity-50 blur-sm transition-all duration-700 pointer-events-none";

        // HIDDEN
        return "absolute opacity-0 pointer-events-none transition-all duration-700";
    };

    if (!decisions || decisions.length === 0) {
        return <p className="text-center text-white">No decisions yet.</p>;
    }

    return (
        <div className="relative w-full h-[540px] md:h-[620px] overflow-visible">
            <div className="relative h-[380px] w-full mt-5">
                {decisions.map((decision, index) => (
                    <div
                        key={decision.title ?? index}
                        className={getSlideClasses(index)}
                    >
                        <DecisionCard decision={decision} />
                    </div>
                ))}
            </div>

            <div className="absolute bottom-20 md:bottom-40 left-1/2 -translate-x-1/2 flex gap-30 z-50">
                <button
                    onClick={() => moveToSelected("prev")}
                    className="text-white text-3xl"
                >
                    <ArrowBigLeft className="w-15 h-15 stroke-white hover:fill-white hover:stroke-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] transition-all duration-300 cursor-pointer" />
                </button>
                <button
                    onClick={() => moveToSelected("next")}
                    className="text-white text-3xl"
                >
                    <ArrowBigRight
                        className="w-15 h-15
        stroke-white 
        hover:fill-white hover:stroke-white 
        hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]
        transition-all duration-300
        cursor-pointer"
                    />
                </button>
            </div>
        </div>
    );
}

export default DecisionCarousel;
