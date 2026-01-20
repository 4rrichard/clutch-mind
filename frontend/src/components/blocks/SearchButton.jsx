import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function SearchButton() {
    return (
        <Button
            variant="ghost"
            type="submit"
            className="cta-button h-12 sm:h-14 md:h-16 px-6 rounded-r-full"
        >
            Analyze
            {/* <MagnifyingGlassIcon className="w-4 h-4" /> */}
        </Button>
    );
}

export default SearchButton;
