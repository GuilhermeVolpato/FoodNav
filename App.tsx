import "react-native-gesture-handler";

import { AuthContextProvider } from "src/contexts/AuthContext";
import { useState } from "react";
import { Routes } from "src/routes";
import { OnboardingTour } from "@components/OnboardingTour";
import { Text, View } from "react-native";

export default function App() {
  const [showRoutes, setShowRoutes] = useState(true);

  const handleOnDone = () => {
    setShowRoutes(!showRoutes);
  };

  if (showRoutes) {
    return <OnboardingTour onDone={handleOnDone} />;
  }

  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
}
