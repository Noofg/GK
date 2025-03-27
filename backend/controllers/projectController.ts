import { Request, Response } from "express";
import Project from "../models/Project";
import { promises } from "dns";

// Controller add
const addProject = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Dữ liệu nhận được:", req.body);

    const newProject = new Project(req.body);


    await newProject.save();

    console.log("Dự án đã được lưu:", newProject);
    res.status(201).json({ message: "Dự án đã được thêm!", project: newProject });
  } catch (error) {
    console.error("Lỗi server:", error);
    res.status(500).json({ error: "Lỗi server!" });
  }
};

// Controller get
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
      const { name, type, price,image } = req.body;
      const projectId = req.params.id;
  
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { name, type, price,image },
        { new: true } 
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
  const searchProject = async(req:Request, res: Response  ):Promise<void>=>{
    try {
      const query = req.query.query as string; 
      console.log("Từ khóa tìm kiếm:", query);
      if (!query) {
        res.status(400).json({ error: "Thiếu tham số tìm kiếm!" });
        return;
      }
  
      const projects = await Project.find({ 
        name: { $regex: query, $options: "i" } 
      });
  
      res.status(200).json(projects);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm dự án:", error);
      res.status(500).json({ error: "Lỗi server khi tìm kiếm!" });
    }

  }

// Xuất riêng từng controller
export { addProject, listProjects, deleteProject,updateProject,searchProject };
