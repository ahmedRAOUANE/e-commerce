import prisma from "@/lib/prisma";
import { DatabaseError } from "@/errors/db.error";
import {
    publicCategoryOutputDto,
    adminCategoryListOutputDto,
    adminCategoryFullOutputDto,
} from "@/dto/categories";
import { buildSelect } from "@/dto/select.dto";
import { AdminCategoryFullOutput, AdminCategoryListOutput, PublicCategoryOutput } from "@/types/categories";
import { AppError } from "@/errors/base.error";
import { CategoryNotFoundError } from "@/errors/category.error";

export async function fetchPublicCategoriesService(): Promise<PublicCategoryOutput[]> {
    try {
        const categories = await prisma.categories.findMany({
            where: { status: "ACTIVE" },
            select: buildSelect(publicCategoryOutputDto.shape),
            orderBy: { name: "asc" },
        });

        return publicCategoryOutputDto.array().parse(categories);
    } catch (error) {
        throw new DatabaseError("Failed to fetch public categories", error as unknown as Record<string, unknown>);
    }
}

export async function fetchAdminCategoriesService(
    includeCount = false
): Promise<AdminCategoryListOutput[]> {
    try {
        const categories = await prisma.categories.findMany({
            select: {
                ...buildSelect(adminCategoryListOutputDto.shape),
                _count: includeCount ? { select: { products: true } } : false,
            },
            orderBy: { updatedAt: "desc" },
        });

        return adminCategoryListOutputDto.array().parse(categories);
    } catch (error) {
        throw new DatabaseError("Failed to fetch admin categories", error as unknown as Record<string, unknown>);
    }
}

export async function fetchAdminCategoryById(
    id: number
): Promise<AdminCategoryFullOutput> {
    try {
        const category = await prisma.categories.findUnique({
            where: { id },
            select: buildSelect(adminCategoryFullOutputDto.shape),
        });

        if (!category) {
            throw new CategoryNotFoundError(); 
        }

        return adminCategoryFullOutputDto.parse(category);
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new DatabaseError("Failed to fetch category by id", error as unknown as Record<string, unknown>);
    }
}