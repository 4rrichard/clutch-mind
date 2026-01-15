import React, { useState } from "react";
import SearchInput from "./SearchInput";
import SearchButton from "./SearchButton";
import GameRequest from "./GameRequest";
import AiChatOpenButton from "./AiChatOpenButton";

function SearchForm({ onSearch, onOpenChat }) {
    const [value, setValue] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        onSearch(value);
        setValue("");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex justify-center pt-20"
        >
            <div className="relative w-full max-w-xl">
                <SearchInput value={value} setValue={setValue} />
                <AiChatOpenButton onOpen={onOpenChat} />
            </div>
            <SearchButton />
        </form>
    );
}

export default SearchForm;
