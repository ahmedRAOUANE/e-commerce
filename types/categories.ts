import { adminCategoryCreatedDTO, adminCategoryDeletedDTO, adminCategoryUpdatedDTO, createCategoryDto, deleteCategoryDto, updateCategoryDto } from "@/dto/categories";
import z from "zod";

export type CreateCategoryInput = z.infer<typeof createCategoryDto>;
export type AdminCategoryCreatedOutput = z.infer<typeof adminCategoryCreatedDTO>;

export type UpdateCategoryInput = z.infer<typeof updateCategoryDto>;
export type AdminCategoryUpdatedOutput = z.infer<typeof adminCategoryUpdatedDTO>;

export type DeleteCategoryInput = z.infer<typeof deleteCategoryDto>;
export type AdminCategoryDeletedOutput = z.infer<typeof adminCategoryDeletedDTO>;