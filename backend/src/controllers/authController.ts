import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User, UserRole } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const registerSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.nativeEnum(UserRole).optional()
});

export const register = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const validatedData = registerSchema.parse(req.body);

        const existingUser = await userRepository.findOneBy({ email: validatedData.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(validatedData.password, 10);

        const user = userRepository.create({
            ...validatedData,
            password: hashedPassword,
            role: validatedData.role || UserRole.CUSTOMER
        });

        await userRepository.save(user);

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });

        return res.status(201).json({ token, user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role } });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const { email, password } = req.body;
        const user = await userRepository.findOneBy({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1d" });

        return res.json({ token, user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role } });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
