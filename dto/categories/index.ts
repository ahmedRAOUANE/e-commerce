import { z } from "zod";
import { categoryMetadataSchema } from "./schemas";
import { nonEmptyString } from "../product/schemas";
import { CategoryStatusSchema } from "@/prisma/generated/schemas";

export const createCategoryDto = z.object({
    name: nonEmptyString.min(2, "Name must be at least 2 characters"),
    description: nonEmptyString,
    status: CategoryStatusSchema.default("ACTIVE"),
    metadata: categoryMetadataSchema, 
});

export const adminCategoryCreatedDTO = z.object({
    id: z.number(),
    name: nonEmptyString.min(2, "Name must be at least 2 characters"),
    description: nonEmptyString.nullable(),
    status: CategoryStatusSchema,
    createdAt: z.date(),
    message: nonEmptyString.default("Category created successfully"),
});

export const updateCategoryDto = createCategoryDto.partial().extend({
    id: z.number().int().positive("Category ID is required"),
});

export const adminCategoryUpdatedDTO = z.object({
    id: z.number(),
    name: nonEmptyString,
    description: nonEmptyString.nullable(),
    status: CategoryStatusSchema,
    updatedAt: z.date(),
    message: nonEmptyString.default("Category updated successfully"),
});

export const deleteCategoryDto = z.object({
    id: z.number().int().positive("Category ID is required"),
});

export const adminCategoryDeletedDTO = z.object({
    id: z.number(),
    name: nonEmptyString,
    deletedAt: z.date(),
    message: nonEmptyString.default("Category deleted successfully"),
});

export const publicCategoryOutputDto = z.object({
    id: z.number(),
    name: nonEmptyString,
    description: nonEmptyString.nullable(),
    status: CategoryStatusSchema,
});

// Admin list/table view (lighter)
export const adminCategoryListOutputDto = z.object({
    id: z.number(),
    name: nonEmptyString,
    description: nonEmptyString.nullable(),
    status: CategoryStatusSchema,
    createdAt: z.date(),
    updatedAt: z.date(),
    _count: z.object({
        products: z.number().optional(), // Number of products in this category
    }).optional(),
});

// Admin single view (for edit form)
export const adminCategoryFullOutputDto = adminCategoryListOutputDto.extend({
    metadata: categoryMetadataSchema,
});