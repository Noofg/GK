import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log("🔍 Email nhận được:", email);
        console.log("🔍 Password nhận được:", password);

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Email không tồn tại!" });

        console.log("Mật khẩu trong MongoDB:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🛠 Kết quả so sánh:", isMatch);

        if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu!" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error(" Lỗi server:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};
