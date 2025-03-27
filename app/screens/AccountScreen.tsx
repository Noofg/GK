import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

// Định nghĩa kiểu navigation
type AccountScreenNavigationProp = StackNavigationProp<
  { Home: undefined; Register: undefined },
  "Home"
>;

const Account = () => {
  const navigation = useNavigation<AccountScreenNavigationProp>();
  const { width } = useWindowDimensions(); // Lấy kích thước màn hình để responsive
  const [image, setImage] = useState<string | null>(null);

  // Kiểm tra quyền truy cập thư viện ảnh
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Bạn cần cấp quyền truy cập thư viện ảnh!");
      }
    })();
  }, []);

  // Hàm chọn ảnh từ thư viện
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Thông tin người dùng */}
      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholderAvatar}>
              <Text style={styles.avatarText}>+</Text>
            </View>
          )}
        </TouchableOpacity>
        <View>
          <Text style={styles.username}>No hary</Text>
          <Text style={styles.email}>nonofg15@gmail.com</Text>
        </View>
      </View>

      {/* Các tùy chọn tài khoản */}
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Switch accounts</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Manage account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style = {styles.optionText}>Edit Account</Text>
      </TouchableOpacity>

      {/* Điều hướng về Home */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>

    </View>
  );
};

// Định nghĩa CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161b22",
    padding: 20,
    justifyContent: "center",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  placeholderAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#6b46c1",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  username: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    color: "#b0b0b0",
    fontSize: 14,
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    color: "#58a6ff",
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#238636",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Account;
