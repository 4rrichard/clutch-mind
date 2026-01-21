import { Button } from "@/components/ui/button";

function SearchButton() {
    return (
        <Button
            type="submit"
            variant="ghost"
            className="
        h-12 sm:h-14 md:h-16
        px-6 sm:px-8
        rounded-none

        text-base sm:text-lg md:text-xl
    font-semibold tracking-wide

    text-primary

        bg-[color-mix(in_srgb,var(--highlight)_75%,transparent)]
        border-l border-[color-mix(in_srgb,var(--highlight)_100%,transparent)]

        hover:bg-[color-mix(in_srgb,var(--highlight)_90%,transparent)]
        active:bg-[color-mix(in_srgb,var(--highlight)_100%,transparent)]

        transition-colors
        cursor-pointer
      "
        >
            Analyze
        </Button>
    );
}

export default SearchButton;
