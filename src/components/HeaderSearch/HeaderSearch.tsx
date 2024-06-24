import React, { useState } from "react";
import { FeatherLogo, SearchBar, ViewContainer } from "./styles";

export default function HeaderSearch({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <ViewContainer>
      <FeatherLogo />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
    </ViewContainer>
  );
}
