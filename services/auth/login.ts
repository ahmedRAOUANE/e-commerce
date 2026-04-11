import prisma from "@/lib/prisma";
import { AppError } from "@/errors/base.error";
import { ValidationError } from "@/errors/validation.error";
import { loginDto, authUserOutputDto } from "@/dto/auth";
import bcrypt from "bcryptjs";
import { LoginInput } from "@/types/auth.types";
import z from "zod";
import { buildSelect } from "@/dto/select.dto";

export async function loginService(data: LoginInput) {
    try {
        // 1. Validate input
        const validated = loginDto.parse(data);

        // 2. Find user
        const user = await prisma.user.findUnique({
            where: { email: validated.email },
            select: {...buildSelect(authUserOutputDto.shape), password: true}
        });

        if (!user) {
            throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
        }

        // 3. Verify password
        const isPasswordValid = await bcrypt.compare(validated.password, user.password);
        if (!isPasswordValid) {
            throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
        }

        // 4. Return safe user data (never return password)
        return authUserOutputDto.parse({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        });

    } catch (error) {
        console.log("login error: ", error);
        if (error instanceof AppError) throw error;
        if (error instanceof z.ZodError) {
            throw new ValidationError("Invalid login data");
        }
        throw new AppError("Login failed", 500, "LOGIN_FAILED");
    }
}