import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image 
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import BASE_URL from "../service/config";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
  EditProject: { project: any };
};

type EditProjectScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "EditProject">;
type EditProjectScreenRouteProp = RouteProp<RootStackParamList, "EditProject">;

type Props = {
  navigation: EditProjectScreenNavigationProp;
  route: EditProjectScreenRouteProp;
};

const EditProject: React.FC<Props> = ({ route, navigation }) => {
  const { project } = route.params;
  console.log("Updating project with ID:", project._id);

  const [image, setImage] = useState(project.image);
  const [name, setName] = useState(project.name);
  const [type, setType] = useState(project.type);
  const [price, setPrice] = useState(project.price.toString());

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

  
  const handleUpdate = () => {
    axios
      .put(`${BASE_URL}/project/${project._id}`, { name, type, price: Number(price), image })
      .then((response) => {
        Alert.alert("Thành công", "Dự án đã được cập nhật!");
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật dự án:", error);
        Alert.alert("Lỗi", "Không thể cập nhật dự án!");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Chỉnh sửa Dự án</Text>

      
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={[styles.image, styles.imagePlaceholder]}>
              <Text style={styles.imagePlaceholderText}>Chọn ảnh</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          placeholder="Tên dự án"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Loại"
          value={type}
          onChangeText={setType}
          style={styles.input}
        />
        <TextInput
          placeholder="Giá"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>CẬP NHẬT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProject;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
  },
  form: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#dcdcdc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  imagePlaceholderText: {
    color: "#999",
    fontSize: 16,
  },
});
