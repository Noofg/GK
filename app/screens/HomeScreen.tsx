import React, { useEffect, useState,useCallback } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from "react-native";
import { useNavigation,useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import MainLayout from "../MainLayout";
import BASE_URL from "../service/config";
import axios from "axios";

// Định nghĩa kiểu dữ liệu Project
type Project = {
  _id: string;
  name: string;
  type: string;
  price: number;
};

// Định nghĩa kiểu dữ liệu của navigation
type HomeScreenNavigationProp = StackNavigationProp<
  { Home:{ updatedProject?: any }| undefined; Register: undefined; AddProject: undefined; EditProject: undefined},
  "Home"
>;

const HomeScreen = (route) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { width } = useWindowDimensions();
  const [menuVisible, setMenuVisible] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]); // Sửa kiểu dữ liệu

  
  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (route.params?.updatedProject) {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === route.params.updatedProject._id ? route.params.updatedProject : project
        )
      );
    }
  }, [route.params?.updatedProject]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get<Project[]>(`${BASE_URL}/project`);
      setProjects(response.data);
      console.log("Dữ liệu dự án:", response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách dự án:", error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchProjects();
    }, [])
  );
  useEffect(() => {
    axios
      .get<Project[]>(`${BASE_URL}/project`)
      .then((response) => {
        console.log("Projects từ API:", response.data);
        setProjects(response.data);
      })
      .catch((error) => console.error("Lỗi khi lấy project:", error));
  }, []);

  // Hàm xử lý xóa dự án
  const handleDeleteProject = (projectId: string) => {
    console.log("handleDeleteProject được gọi với ID:", projectId);

    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa dự án này?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: () => {
            // Đặt hành động xóa vào trong callback
            deleteProject(projectId);
          },
        },
      ],
      { cancelable: true }
    );
  };
  
  const deleteProject = (projectId: string) => {
    // Xử lý xóa project sau khi xác nhận
    axios
      .delete(`${BASE_URL}/project/${projectId}`)
      .then((response) => {
        console.log("Dự án đã được xóa", response.data);
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== projectId)
        );
      })
      .catch((error) => {
        console.error("Lỗi khi xóa dự án:", error);
      });
  };
  

  

  return (
    <MainLayout>
      <View style={styles.container}>
        {/* Sidebar */}
        {width > 768 && (
          <View style={styles.sidebar}>
            <Text style={styles.title}>Jira</Text>
            <TouchableOpacity style={styles.sidebarButton}>
              <Text style={styles.buttonText}>For you</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarButton}>
              <Text style={styles.buttonText}>Recent</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarButton}>
              <Text style={styles.buttonText}>Starred</Text>
            </TouchableOpacity>

            {/* Projects + Dropdown Menu */}
            <View>
              <TouchableOpacity
                style={styles.projectButton}
                onPress={() => setMenuVisible(!menuVisible)}
              >
                <Text style={styles.buttonText}>Projects</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate("AddProject")}
                >
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </TouchableOpacity>

              {/* Dropdown Menu */}
              {menuVisible && (
                <View style={styles.dropdownMenu}>
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <TouchableOpacity key={project._id}>
                        <Text style={styles.menuItem}>📌 {project.name}</Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={styles.menuItem}>Chưa có dự án</Text>
                  )}
                </View>
              )}
            </View>
          </View>
        )}

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Header */}
          <View style={styles.header}>
            <TextInput style={styles.searchBox} placeholder="Search" />
            <Button
              title="+ ADD"
              color="#0052cc"
              onPress={() => navigation.navigate("AddProject")}
            />
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>LiST</Text>

            {/* Tiêu đề cột */}
            <View style={styles.headerRow}>
              <Text style={[styles.headerText, styles.columnName]}>Tên sản phẩm</Text>
              <Text style={[styles.headerText, styles.columnType]}>Loại</Text>
              <Text style={[styles.headerText, styles.columnPrice]}>Giá</Text>
              <Text style={[styles.headerText, styles.columnActions]}>Hành động</Text>
            </View>

            {/* Danh sách các dự án */}
            {projects.length > 0 ? (
              projects.map((project) => (
                <View key={project._id} style={styles.projectRow}>
                  <Text style={[styles.projectText, styles.columnName]}>
                    {project.name}
                  </Text>
                  <Text style={[styles.projectText, styles.columnType]}>
                    {project.type}
                  </Text>
                  <Text style={[styles.projectText, styles.columnPrice]}>
                    {project.price} USD
                  </Text>
                  <View style={styles.projectActions}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("EditProject" as any,{project })}>
                      <Text style={styles.actionText} >Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() =>{console.log("Click vào nút Xóa với ID:", project._id); handleDeleteProject(project._id)}}
                    >
                      <Text style={styles.actionText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text>Không có dự án nào.</Text>
            )}
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

// Styles
const styles = StyleSheet.create({
  // Đảm bảo rằng styles không bị thay đổi so với trước
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 250,
    backgroundColor: "#f4f5f7",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sidebarButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginVertical: 5,
  },
  projectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 18,
    color: "#fff",
  },
  buttonText: {
    fontSize: 16,
  },
  dropdownMenu: {
    marginTop: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
  mainContent: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  searchBox: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
    marginRight: 10,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  columnName: {
    width: "22%",
  },
  columnType: {
    width: "22%",
  },
  columnPrice: {
    width: "22%",
  },
  columnActions: {
    width: "22%",
  },
  projectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  projectText: {
    textAlign: "center",
  },
  projectActions: {
    flexDirection: "row",
    justifyContent: "center",
  },
  actionButton: {
    marginHorizontal: 5,
    padding: 5,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  actionText: {
    color: "#fff",
  },
});

export default HomeScreen;
