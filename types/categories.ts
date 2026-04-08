import { adminCategoryCreatedDTO, adminCategoryUpdatedDTO, createCategoryDto, updateCategoryDto } from "@/dto/categories";
import z from "zod";

export type CreateCategoryInput = z.infer<typeof createCategoryDto>;
export type AdminCategoryCreatedOutput = z.infer<typeof adminCategoryCreatedDTO>;

export type UpdateCategoryInput = z.infer<typeof updateCategoryDto>;
export type AdminCategoryUpdatedOutput = z.infer<typeof adminCategoryUpdatedDTO>;