import React from "react";
import { View, Text, Platform, StyleSheet,TouchableOpacity,
  useWindowDimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AccountScreen from"../screens/AccountScreen";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TextInput } from "react-native-gesture-handler";
import AddProject from "../screens/AddProject";
import EditProject from "../screens/EditProject";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 📌 Header trên Web
// const WebHeader = () => (
//   <View
//     style={{
//       height: 60,
//       backgroundColor: "#6200ea",
//       justifyContent: "center",
//       alignItems: "center",
//       paddingHorizontal: 16,
//     }}
//   >
//     <Text style={{ color: "white", fontSize: 20 }}>My App</Text>
//   </View>
// );

// 📌 Stack Navigator (Web)
type NavigationProp = StackNavigationProp<
  { Home:  { updatedProject?: any }|undefined; Register: undefined; Account:undefined; EditProject:undefined },
  "Home"
>;
const WebStack = () => {
  const navigation = useNavigation<NavigationProp>();


  return (
    <>
      {/* Header */}
      {/* <WebHeader /> */}

      {/* Thanh menu ngang trên Web */}
      <View style={styles.header}>
  <Text onPress={() => navigation.navigate("Home")} style={styles.logo}>Taskly</Text>
  <View style={styles.menu}>
    <Text onPress={() => navigation.navigate("Home")} style={styles.menuItem}>Workspaces</Text>
    <Text onPress={() => navigation.navigate("Register")} style={styles.menuItem}>📝Recent</Text>
    <Text onPress={() => navigation.navigate("Account")} style={styles.menuItem}>👤 Started</Text>
  </View>
</View>

      {/* Stack Navigator */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="AddProject" component={AddProject}/>
        <Stack.Screen name="EditProject" component={EditProject as React.ComponentType<any>}/>

      </Stack.Navigator>
    </>
  );
};
const MobileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tab Navigator chứa các màn hình chính */}
      <Stack.Screen name="MainTabs" component={MobileTabs} />
      {/* Các màn hình không nằm trong menu tab */}
      <Stack.Screen name="AddProject" component={AddProject} />
      <Stack.Screen name="EditProject"component={EditProject as React.ComponentType<any>} />
    </Stack.Navigator>
  );
};

// 📌 Bottom Tabs (Mobile)
const MobileTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = "home";
        if (route.name === "Register") iconName = "edit";
        if (route.name === "Account") iconName = "person";
        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Register" component={RegisterScreen} />
    <Tab.Screen name="Account" component={AccountScreen} />
  </Tab.Navigator>
);

// 📌 Navigation chính
const Navigation = () => {
  return (
    <NavigationContainer>
      {Platform.OS === "web" ? <WebStack /> : <MobileStack />}
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: "row", // Menu nằm ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f8f9fa",
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
    marginRight: 20, // Khoảng cách giữa logo và menu
  },
  menu: {
    flexDirection: "row", 
    gap: 15, // Khoảng cách giữa các mục menu (chỉ hỗ trợ React Native 0.71+)
  },
  menuItem: {
    fontSize: 16,
    color: "#333",
    paddingHorizontal: 10, // Thêm padding cho dễ bấm
  },

})

export default Navigation;
