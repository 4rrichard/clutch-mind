import React from "react";
import SearchForm from "../blocks/SearchForm";
import DecisionRequest from "../blocks/DecisionRequest";

function SearchSection({ onSearch, onOpenChat }) {
    return (
        <div className="flex flex-col items-center px-20">
            <SearchForm onSearch={onSearch} onOpenChat={onOpenChat} />
            <DecisionRequest />
        </div>
    );
}

export default SearchSection;
