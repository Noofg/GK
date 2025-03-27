import multer from "multer";
import path from "path";

// Cấu hình nơi lưu trữ file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Đổi tên file
  }
});

// Kiểm tra loại file (chỉ cho phép ảnh)
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ cho phép upload file ảnh!"), false);
  }
};

// Tạo middleware upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Giới hạn 5MB
});

export default upload;
