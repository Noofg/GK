import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// ✅ Mở rộng kiểu Request để TypeScript nhận diện `req.user`
interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1]; // Lấy token từ header

  if (!token) {
    res.status(401).json({ error: "Không có token, từ chối truy cập" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    req.user = { id: decoded.id }; // Gán user vào request
    next(); // ✅ Gọi next() để tiếp tục xử lý request
  } catch (err) {
    res.status(401).json({ error: "Token không hợp lệ" });
  }
};

export default authMiddleware;
