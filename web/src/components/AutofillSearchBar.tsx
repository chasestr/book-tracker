import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { getSearch } from "../bookApi";
import { SearchResult } from "../types/SearchResult";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const handleChange = async (value: string) => {
    setInput(value);
    setResults(await getSearch(value));
  };

  return (
    <div className="input-wrapper">
      <SearchIcon id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
