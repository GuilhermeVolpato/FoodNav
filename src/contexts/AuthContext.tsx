import React, { createContext, ReactNode, useState } from "react";

type AuthContextDataProps = {
  changeRoute: () => void;
  boolean: boolean;
};

export const AuthContext = createContext({} as AuthContextDataProps);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [privateRoute, setPrivateRoute] = useState<boolean>(false);

  function changeRoute() {
    console.log("changeRoute");
    setPrivateRoute((prevPrivateRoute) => !prevPrivateRoute);
  }

  return (
    <AuthContext.Provider value={{ changeRoute, boolean: privateRoute }}>
      {children}
    </AuthContext.Provider>
  );
}
