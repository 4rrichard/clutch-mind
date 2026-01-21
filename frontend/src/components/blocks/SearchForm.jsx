import React, { useState } from "react";
import SearchInput from "./SearchInput";
import SearchButton from "./SearchButton";
import GameRequest from "./DecisionRequest";
import AiChatOpenButton from "./AiChatOpenButton";

function SearchForm({ onSearch, onOpenChat }) {
    const [value, setValue] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        onSearch(value);
        setValue("");
    }

    return (
        <form onSubmit={handleSubmit} className="w-full pt-3 md:pt-8">
            <div className="w-full max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto">
                <div
                    className=" flex items-stretch w-full
                                rounded-full overflow-hidden
                                border-2
                                bg-card/30 backdrop-blur-xl
                                border-[color-mix(in_srgb,var(--highlight)_70%,transparent)]
hover:border-[color-mix(in_srgb,var(--highlight)_85%,transparent)]
focus-within:border-[color-mix(in_srgb,var(--highlight)_100%,transparent)]
                                transition-colors
    "
                >
                    <div className="relative flex-1 min-w-0">
                        <SearchInput value={value} setValue={setValue} />
                        <AiChatOpenButton onOpen={onOpenChat} />
                    </div>

                    <SearchButton />
                </div>
            </div>
        </form>
    );
}

export default SearchForm;
