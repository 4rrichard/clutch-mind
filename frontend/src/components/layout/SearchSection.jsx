import React from "react";
import SearchForm from "../blocks/SearchForm";
import DecisionRequest from "../blocks/DecisionRequest";

function SearchSection({ onSearch, onOpenChat }) {
    return (
        <div className="w-full flex justify-center px-4 sm:px-6 md:px-10">
            <div className="w-full max-w-xl md:max-w-3xl lg:max-w-4xl">
                <SearchForm onSearch={onSearch} onOpenChat={onOpenChat} />
                <DecisionRequest />
            </div>
        </div>
    );
}

export default SearchSection;
