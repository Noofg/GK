import React from "react";
import { registerRootComponent } from "expo";
import { SafeAreaView } from "react-native";
import Navigation from "./navigation/Navigation"; // Chỉ import Navigation.tsx
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
  
    <SafeAreaView style={{ flex: 1 }}>
     
      <Navigation />
     
    </SafeAreaView>
    
  );
};

export default registerRootComponent(App);
