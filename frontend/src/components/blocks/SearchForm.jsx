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
            <div className="flex items-stretch flex-nowrap w-full max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto">
                <div className="relative flex-1 min-w-0">
                    <SearchInput value={value} setValue={setValue} />
                    <AiChatOpenButton onOpen={onOpenChat} />
                </div>
                <SearchButton />
            </div>
        </form>
    );
}

export default SearchForm;
