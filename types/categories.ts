import { adminCategoryCreatedDTO, adminCategoryDeletedDTO, adminCategoryFullOutputDto, adminCategoryListOutputDto, adminCategoryUpdatedDTO, createCategoryDto, deleteCategoryDto, publicCategoryOutputDto, updateCategoryDto } from "@/dto/categories";
import z from "zod";

export type CreateCategoryInput = z.infer<typeof createCategoryDto>;
export type AdminCategoryCreatedOutput = z.infer<typeof adminCategoryCreatedDTO>;

export type UpdateCategoryInput = z.infer<typeof updateCategoryDto>;
export type AdminCategoryUpdatedOutput = z.infer<typeof adminCategoryUpdatedDTO>;

export type DeleteCategoryInput = z.infer<typeof deleteCategoryDto>;
export type AdminCategoryDeletedOutput = z.infer<typeof adminCategoryDeletedDTO>;

export type PublicCategoryOutput = z.infer<typeof publicCategoryOutputDto>;
export type AdminCategoryListOutput = z.infer<typeof adminCategoryListOutputDto>;
export type AdminCategoryFullOutput = z.infer<typeof adminCategoryFullOutputDto>;