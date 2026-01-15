import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function SearchButton() {
    return (
        <Button variant="ghost" type="submit" className="cta-button">
            <MagnifyingGlassIcon className="size-8" />
        </Button>
    );
}

export default SearchButton;
