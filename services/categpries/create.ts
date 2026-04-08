import prisma from "@/lib/prisma";
import { AppError } from "@/errors/base.error";
import { DatabaseError } from "@/errors/db.error";
import { ValidationError } from "@/errors/validation.error";
import { createCategoryDto, adminCategoryCreatedDTO} from "@/dto/categories";
import { AdminCategoryCreatedOutput, CreateCategoryInput } from "@/types/categories";
import z from "zod";

export async function createCategoryService(
    data: CreateCategoryInput
): Promise<AdminCategoryCreatedOutput> {
    try {
        // 1. Validate input with DTO
        const validated = createCategoryDto.parse(data);

        // 2. Check for duplicate name (good practice)
        // TODO: replace this with fetchPublicSingleCategory when implemented
        const existing = await prisma.categories.findUnique({
            where: { name: validated.name },
        });

        if (existing) {
            throw new AppError(
                `Category with name "${validated.name}" already exists`,
                409,
                "CATEGORY_ALREADY_EXISTS"
            );
        }

        // 3. Create category
        const newCategory = await prisma.categories.create({
            data: validated,
            select: {
                id: true,
                name: true,
                description: true,
                status: true,
                createdAt: true,
            },
        });

        // 4. Return validated output
        return adminCategoryCreatedDTO.parse({
            ...newCategory,
            message: "Category created successfully",
        });

    } catch (error) {
        if (error instanceof AppError) throw error;
        if (error instanceof z.ZodError) {
            throw new ValidationError("Invalid category data");
        }
        throw new DatabaseError("Failed to create category", error as unknown as Record<string, unknown>);
    }
}