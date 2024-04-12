import React from "react";
import { FeatherLogo, SearchBar, ViewContainer } from "./styles";

export default function HeaderSearch() {
  return (
    <ViewContainer>
      <FeatherLogo name="map-pin" size={24} color="#ffffff7f" />
      <SearchBar />
    </ViewContainer>
  );
}
