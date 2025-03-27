import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import BASE_URL from "../service/config";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  MainTabs: undefined;
};

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList, "Login">>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log(" Gửi request:", { email, password });
    axios.post(`${BASE_URL}/auth/login`, { email, password })
    .then((response) => {
      console.log("Phản hồi từ server:", response.data);
      if (response.data.token) {
        navigation.reset({
          index: 0,
          routes: [{ name: "MainTabs" }],
        });
      } else {
        Alert.alert("Lỗi", response.data.message || "Thông tin đăng nhập không đúng!");
      }
    })
    .catch((error) => {
      console.error("Lỗi đăng nhập:", error.response ? error.response.data : error.message);
      Alert.alert("Lỗi", "Không thể đăng nhập!");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      {/* Nhập email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Nhập mật khẩu */}
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Nút đăng nhập */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      {/* Chuyển sang đăng ký */}
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerText}>Chưa có tài khoản? Đăng ký ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161b22",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1f2937",
    color: "#fff",
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#238636",
    padding: 12,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    color: "#58a6ff",
    textAlign: "center",
    marginTop: 15,
  },
});

export default LoginScreen;
