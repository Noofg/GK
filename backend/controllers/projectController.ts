import { Request, Response } from "express";
import Project from "../models/Project";

// Controller để thêm dự án mới
const addProject = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Dữ liệu nhận được:", req.body);

    const newProject = new Project(req.body);

    // Lưu vào MongoDB
    await newProject.save();

    console.log("Dự án đã được lưu:", newProject);
    res.status(201).json({ message: "Dự án đã được thêm!", project: newProject });
  } catch (error) {
    console.error("Lỗi server:", error);
    res.status(500).json({ error: "Lỗi server!" });
  }
};

// Controller để lấy danh sách các dự án
const listProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find();

    console.log("Danh sách dự án:", projects);

    res.status(200).json(projects);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách dự án:", error);
    res.status(500).json({ error: "Lỗi server khi lấy danh sách dự án!" });
  }
};
const deleteProject = async (req: Request, res:Response)=>{
    const projectId = req.params.id;
    try {
        const deletedProject = await Project.findByIdAndDelete(projectId);
        if(!deletedProject){
            res.status(404).json({message:"Dự án không tôn tại"});
        }
        console.log("Sản phẩm đã được xoá", deletedProject);
        res.status(200).json({message:"sản phẩm đã được xoá thành", deletedProject});
        
    } catch (error) {
        console.error("Lỗi khi xóa :", error);
    res.status(500).json({ error: "Lỗi server khi xóa sản phẩm!" });
    }
}
const updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, type, price } = req.body;
      const projectId = req.params.id;
  
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { name, type, price },
        { new: true } // Trả về dữ liệu sau khi cập nhật
      );
  
      if (!updatedProject) {
        res.status(404).json({ error: "Không tìm thấy dự án!" });
        return;
      }
  
      res.status(200).json({ message: "Cập nhật thành công!", project: updatedProject });
    } catch (error) {
      console.error("Lỗi cập nhật dự án:", error);
      res.status(500).json({ error: "Lỗi server khi cập nhật!" });
    }
  };

// Xuất riêng từng controller
export { addProject, listProjects, deleteProject,updateProject };
