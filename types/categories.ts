import { adminCategoryCreatedDTO, createCategoryDto } from "@/dto/categories";
import z from "zod";

export type CreateCategoryInput = z.infer<typeof createCategoryDto>;
export type AdminCategoryCreatedOutput = z.infer<typeof adminCategoryCreatedDTO>;