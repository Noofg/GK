import React, { useState } from "react";
import { 
  View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, Image 
} from "react-native";
import * as ImagePicker from "expo-image-picker";  // Import thư viện chọn ảnh
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
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Hàm chọn ảnh từ thư viện
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Xử lý tạo dự án
  const handleCreate = async () => {
    if (!name || !type || !price || !image) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin và chọn ảnh!");
      return;
    }

    setLoading(true);
    try {
      let projectData = {
        name,
        type,
        price: parseFloat(price) || 0, 
        image, // Ảnh sẽ được lưu dưới dạng URI
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
      navigation.goBack();
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
      <TextInput style={styles.input} placeholder="Loại" value={type} onChangeText={setType} />
      <TextInput style={styles.input} placeholder="Giá (VND)" keyboardType="numeric" value={price} onChangeText={setPrice} />

   
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Chọn ảnh</Text>
      </TouchableOpacity>

      
      {image && <Image source={{ uri: image }} style={styles.previewImage} />}

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
  imagePicker: { backgroundColor: "#0052cc", padding: 10, borderRadius: 5, alignItems: "center", marginBottom: 10 },
  imagePickerText: { color: "#fff", fontWeight: "bold" },
  previewImage: { width: "100%", height: 200, marginTop: 10, borderRadius: 5 },
});

export default AddProject;
