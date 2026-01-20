import { Input } from "@/components/ui/input";

function SearchInput({ value, setValue }) {
    return (
        <Input
            className="h-12 sm:h-14 md:h-16
  text-base sm:text-lg md:text-xl
  placeholder:text-base sm:placeholder:text-lg md:placeholder:text-xl
  placeholder:text-muted placeholder:opacity-60
  backdrop-blur-xl bg-card/30 text-primary 
  border-2 border-[#cc3558]/70 rounded-l-full px-6 
  focus-visible:ring-transparent
  focus:border-[#cc3558] focus:border-3
  focus:bg-[#cc3558]/20
  hover:bg-[#cc3558]/20  
  focus:placeholder:opacity-0
"
            placeholder="Describe a basketball scenario"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}

export default SearchInput;
