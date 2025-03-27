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

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
//type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, "Login">;


const RegisterScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList, "Register">>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
      return;
    }
    setLoading(true);
    try {
      let userAccount = {
        name, email, password
      };
      let response = await fetch(`${BASE_URL}/auth/register`,{
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(userAccount),

      });
      let data = await response.json();
            if (!response.ok) {
              throw new Error(data.message || "Không thể tạo tài khoản!");
            }
      
            Alert.alert("Thành công", "Tài khoán  đã được tạo!");
            navigation.goBack;
      
    } catch (error: any) {
          console.error("Lỗi kết nối:", error.message);
          Alert.alert("Lỗi", error.message || "Không thể kết nối đến server!");
    }
    finally {
      setLoading(false);
    }
    Alert.alert("Thành công", "Tạo tài khoản thành công!");
    // Điều hướng về màn hình đăng nhập
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo tài khoản</Text>

      {/* Nhập tên */}
      <TextInput
        style={styles.input}
        placeholder="Tên của bạn"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />

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

      {/* Nút đăng ký */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>

      {/* Chuyển sang đăng nhập */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Đã có tài khoản? Đăng nhập ngay</Text>
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
  loginText: {
    color: "#58a6ff",
    textAlign: "center",
    marginTop: 15,
  },
});

export default RegisterScreen;
