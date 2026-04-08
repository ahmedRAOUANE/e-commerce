import prisma from "@/lib/prisma";
import { AppError } from "@/errors/base.error";
import { DatabaseError } from "@/errors/db.error";
import { ValidationError } from "@/errors/validation.error";
import { updateCategoryDto, adminCategoryUpdatedDTO } from "@/dto/categories";
import { AdminCategoryUpdatedOutput, UpdateCategoryInput } from "@/types/categories";
import z from "zod";

export async function updateCategoryService(
    data: UpdateCategoryInput
): Promise<AdminCategoryUpdatedOutput> {
    try {
        // 1. Validate input
        const validated = updateCategoryDto.parse(data);

        // 2. Check if category exists
        const existing = await prisma.categories.findUnique({
            where: { id: validated.id },
            select: { id: true, name: true },
        });

        if (!existing) {
            throw new AppError(
                `Category with id ${validated.id} not found`,
                404,
                "CATEGORY_NOT_FOUND"
            );
        }

        // 3. Check for duplicate name (if name is being changed)
        if (validated.name) {
            const duplicate = await prisma.categories.findUnique({
                where: {
                    name: validated.name,
                    NOT: { id: validated.id }
                },
            });

            if (duplicate) {
                throw new AppError(
                    `Category with name "${validated.name}" already exists`,
                    409,
                    "CATEGORY_ALREADY_EXISTS"
                );
            }
        }

        // 4. Update category
        const updatedCategory = await prisma.categories.update({
            where: { id: validated.id },
            data: {
                name: validated.name,
                description: validated.description,
                status: validated.status,
            },
            select: {
                id: true,
                name: true,
                description: true,
                status: true,
                updatedAt: true,
            },
        });

        // 5. Return validated output
        return adminCategoryUpdatedDTO.parse({
            ...updatedCategory,
            message: "Category updated successfully",
        });

    } catch (error) {
        if (error instanceof AppError) throw error;
        if (error instanceof z.ZodError) {
            throw new ValidationError("Invalid category update data");
        }
        throw new DatabaseError("Failed to update category", error as unknown as Record<string, unknown>);
    }
}