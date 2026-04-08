import prisma from "@/lib/prisma";
import { AppError } from "@/errors/base.error";
import { DatabaseError } from "@/errors/db.error";
import { ValidationError } from "@/errors/validation.error";
import { deleteCategoryDto, adminCategoryDeletedDTO } from "@/dto/categories";
import { AdminCategoryDeletedOutput, DeleteCategoryInput } from "@/types/categories";
import z from "zod";

export async function deleteCategoryService(
    data: DeleteCategoryInput
): Promise<AdminCategoryDeletedOutput> {
    try {
        // 1. Validate input
        const validated = deleteCategoryDto.parse(data);

        // 2. Check if category exists
        const existing = await prisma.categories.findUnique({
            where: { id: validated.id },
            select: {
                id: true,
                name: true,
                // Check if any products are using this category
                _count: {
                    select: { products: true }
                }
            },
        });

        if (!existing) {
            throw new AppError(
                `Category with id ${validated.id} not found`,
                404,
                "CATEGORY_NOT_FOUND"
            );
        }

        // 3. Optional: Prevent deletion if products are linked (Business Logic)
        if (existing._count.products > 0) {
            throw new AppError(
                `Cannot delete category "${existing.name}" because it has ${existing._count.products} products linked to it.`,
                409,
                "CATEGORY_HAS_PRODUCTS"
            );
        }

        // 4. Delete the category
        await prisma.categories.delete({
            where: { id: validated.id },
        });

        // 5. Return success response
        return adminCategoryDeletedDTO.parse({
            id: existing.id,
            name: existing.name,
            deletedAt: new Date(),
            message: "Category deleted successfully",
        });

    } catch (error) {
        if (error instanceof AppError) throw error;
        if (error instanceof z.ZodError) {
            throw new ValidationError("Invalid delete request",);
        }
        throw new DatabaseError("Failed to delete category", error as unknown as Record<string, unknown>);
    }
}