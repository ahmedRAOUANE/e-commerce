import { authUserOutputDto, registerDto } from "@/dto/auth";
import { AppError } from "@/errors/base.error";
import { ValidationError } from "@/errors/validation.error";
import prisma from "@/lib/prisma";
import { RegisterInput } from "@/types/auth.types";
import bcrypt from "bcryptjs";
import z from "zod";

export async function setupInitAdminService(data: RegisterInput) {
    try {
        await prisma.$transaction(async (tx) => {
            // 1. check the app configuration
            const isConfigured = await tx.appConfig.findFirst();
            if (isConfigured && isConfigured.isSetup) {
                throw new AppError(
                    "Application is already set up. Initial admin can only be created once.",
                    403,
                    "APP_ALREADY_SETUP"
                );
            }

            // 2. check if an admin already exists
            const adminExists = await tx.user.findFirst({
                where: { role: "ADMIN" }
            });
            if (adminExists) {
                throw new AppError(
                    "An admin user already exists.",
                    403,
                    "ADMIN_ALREADY_EXISTS"
                );
            }

            // 3. validate the data
            const validated = registerDto.parse(data);

            // 4. create admin
            const newAdmin = await tx.user.create({
                data: {
                    name: validated.name,
                    email: validated.email,
                    password: await bcrypt.hash(validated.password, 12),
                    role: "ADMIN"
                }
            })

            // 5. validate the admin
            const parsedAdmin = authUserOutputDto.safeParse(newAdmin)
            if (!parsedAdmin.success) {
                throw new ValidationError("the created admin does not match the app standards")
            }

            // 5. update the config - mark as configured
            const { isSetup } = await tx.appConfig.upsert({
                where: { id: 1 },
                update: { isSetup: true },
                create: { isSetup: true },
            });

            if (!isSetup) throw new AppError("setup failed");

            return parsedAdmin.data;
        })

    } catch (error) {
        console.log("admin register error: ", error);
        if (error instanceof AppError) throw error;
        if (error instanceof z.ZodError) {
            throw new ValidationError("Invalid registration data");
        }
        throw new AppError("Registration failed", 500, "REGISTRATION_FAILED");
    }
}