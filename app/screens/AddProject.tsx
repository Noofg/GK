import React, { useState } from "react";
import { 
  View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ActivityIndicator 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BASE_URL from "../service/config";

// Định nghĩa kiểu cho navigation
type RootStackParamList = {
  Home: undefined;
  AddProject: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "AddProject">;

const AddProject = () => {
  const navigation = useNavigation<NavigationProp>();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  // Xử lý tạo dự án
  const handleCreate = async () => {
    if (!name || !type || !price) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    try {
      let projectData = {
        name,
        type,
        price: parseFloat(price) || 0, // Giá trị mặc định là 0 nếu rỗng
      };

      let response = await fetch(`${BASE_URL}/project/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(projectData),
      });

      let data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Không thể tạo dự án!");
      }

      Alert.alert("Thành công", "Dự án đã được tạo!");
      navigation.goBack;
    } catch (error: any) {
      console.error("Lỗi kết nối:", error.message);
      Alert.alert("Lỗi", error.message || "Không thể kết nối đến server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm sản phẩm Mới</Text>
      <TextInput style={styles.input} placeholder="Tên sản phẩm" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="loại" value={type} onChangeText={setType} />
      <TextInput style={styles.input} placeholder="Giá (VND)" keyboardType="numeric" value={price} onChangeText={setPrice} />

      {loading ? (
        <ActivityIndicator size="large" color="#0052cc" />
      ) : (
        <Button title="Thêm" onPress={handleCreate} disabled={loading} />
      )}

      <Button title="Hủy" onPress={() => navigation.goBack()} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default AddProject;
