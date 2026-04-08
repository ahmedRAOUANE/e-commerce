import z from "zod";
import { nonEmptyString } from "../product/schemas";

export const categoryMetadataSchema = z.object({
    seo: z.object({
        title: nonEmptyString,
        description: nonEmptyString,
    }).strict(),
}).strict()