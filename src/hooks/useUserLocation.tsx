import { UserLocationContextData, UserLocationContext } from "../contexts/UserLocationContext";
import { useContext } from "react";

export function useLocation(): UserLocationContextData {
  const context = useContext(UserLocationContext);
  return context;
}
