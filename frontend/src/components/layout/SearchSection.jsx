import React from "react";
import SearchForm from "../blocks/SearchForm";
import GameRequest from "../blocks/GameRequest";

function SearchSection({ onSearch, onOpenChat }) {
    return (
        <div className="flex flex-col items-center px-20">
            <SearchForm onSearch={onSearch} onOpenChat={onOpenChat} />
            <GameRequest />
        </div>
    );
}

export default SearchSection;
