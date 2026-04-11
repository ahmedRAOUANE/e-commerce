import prisma from "@/lib/prisma";
import { AppError } from "@/errors/base.error";
import { ValidationError } from "@/errors/validation.error";
import { registerDto, authUserOutputDto } from "@/dto/auth";
import bcrypt from "bcryptjs";
import { RegisterInput } from "@/types/auth.types";
import z from "zod";
import { buildSelect } from "@/dto/select.dto";

export async function registerService(data: RegisterInput) {
    try {
        // 1. Validate input with DTO
        const validated = registerDto.parse(data);

        // 2. Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: validated.email },
            select: { id: true },
        });

        if (existingUser) {
            throw new AppError(
                "User with this email already exists",
                409,
                "USER_ALREADY_EXISTS"
            );
        }

        // 3. Hash the password
        const hashedPassword = await bcrypt.hash(validated.password, 12);

        // 4. Create the user
        const newUser = await prisma.user.create({
            data: {
                email: validated.email,
                name: validated.name,
                password: hashedPassword,
                role: "CUSTOMER", // Default role
            },
            select: buildSelect(authUserOutputDto.shape),
        });

        // 5. Return safe user data (never return password)
        return authUserOutputDto.parse({
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
        });

    } catch (error) {
        console.log("register error: ", error);
        if (error instanceof AppError) throw error;
        if (error instanceof z.ZodError) {
            throw new ValidationError("Invalid registration data");
        }
        throw new AppError("Registration failed", 500, "REGISTRATION_FAILED");
    }
}