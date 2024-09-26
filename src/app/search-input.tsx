"use client";

import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

const SearchInput = () => {
  const queryString = useSearchParams();

  return (
    <Input
      name="search"
      type="search"
      placeholder="Search Memes"
      className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
      defaultValue={queryString.get("q") || ""}
    />
  );
};

export default SearchInput;
