import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type CustonbarnavigationProp = StackNavigationProp<
{Home: undefined,Register: undefined},
"Home"
>;

const CustomTabBar = () => {
  const navigation = useNavigation<CustonbarnavigationProp>();

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.text}>🏠 Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.text}>📝 Register</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", 
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "purple",
  },
  text: { color: "white", fontSize: 16 },
});

export default CustomTabBar;
