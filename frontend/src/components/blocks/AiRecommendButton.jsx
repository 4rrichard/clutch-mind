function AiRecommendButton({ onClick }) {
    return (
        <button
            className="mt-3 px-3 py-1.5 
                border border-blue-400/50 
                text-blue-300 text-xs font-medium
                rounded-md
                hover:bg-blue-400/10 
                transition-all duration-150 cursor-pointer"
            onClick={onClick}
        >
            Recommend decisions
        </button>
    );
}

export default AiRecommendButton;
