import { Input } from "@/components/ui/input";

function SearchInput({ value, setValue }) {
    return (
        <Input
            className="
    h-12 sm:h-14 md:h-16
    text-base sm:text-lg md:text-xl
    placeholder:text-base sm:placeholder:text-lg md:placeholder:text-xl
    placeholder:text-secondary placeholder:opacity-60

    bg-transparent text-primary
    border-0 rounded-none
    px-6

    hover:bg-[color:var(--highlight)/0.10]
    focus:bg-[color:var(--highlight)/0.14]

    focus-visible:ring-0
    focus:placeholder:opacity-0
  "
            placeholder="Describe a basketball scenario"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}

export default SearchInput;
