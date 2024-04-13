import "react-native-gesture-handler";

import { AuthContextProvider } from "src/contexts/AuthContext";
import { useState } from "react";
import { Routes } from "src/routes";
import { OnboardingTour } from "@components/OnboardingTour/OnboardingTour";

import { ThemeProvider } from "styled-components";
import theme from "@theme/index";
import { StatusBar } from "expo-status-bar";

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
        <Routes />
      </AuthContextProvider>
    </ThemeProvider>
  );
}
