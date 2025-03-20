import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import CustomTabBar from "./component/CustomTabBar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{children}</View>
      <CustomTabBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
});

export default MainLayout;
