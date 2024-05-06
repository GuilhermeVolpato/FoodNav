import "react-native-gesture-handler";

import { AuthContextProvider } from "src/contexts/AuthContext";
import { UserLocationProvider } from "src/contexts/UserLocationContext";
import { useState } from "react";
import { Routes } from "src/routes";
import { OnboardingTour } from "@components/OnboardingTour/OnboardingTour";

import { ThemeProvider } from "styled-components";
import theme from "@theme/index";

export default function App() {
  const [showRoutes, setShowRoutes] = useState(true);

  const handleOnDone = () => {
    setShowRoutes(!showRoutes);
  };

  if (showRoutes) {
    return <OnboardingTour onDone={handleOnDone} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <UserLocationProvider>
          <Routes />
        </UserLocationProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
