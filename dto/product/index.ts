import z from "zod";
import { ProductsCreateInputObjectZodSchema, ProductStatusSchema } from "@/prisma/generated/schemas";
import {nonEmptyString, productCategoryConnectSchema, productCategorySelectSchema, productImgsSchema, productInventorySchema, productMetadataSchema, productShippingSchema} from "./schemas"

export const CreateProductDto = ProductsCreateInputObjectZodSchema.omit({
    salesCount: true,
    createdAt: true,
    orderItems: true,
}).extend({
    name: nonEmptyString,
    description: nonEmptyString,
    price: z.number().int().positive(),
    discount: z.number().int().nonnegative().optional(),
    quantity: z.number().int().positive().optional(),
    status: ProductStatusSchema.optional(),
    imgs: productImgsSchema,
    tags: z.array(nonEmptyString).optional(),
    inventory: productInventorySchema,
    shipping: productShippingSchema,
    metadata: productMetadataSchema.optional(),
    category: productCategoryConnectSchema,
})

export const publicProductOutputDto = ProductsCreateInputObjectZodSchema.omit({
    salesCount: true,
    quantity: true,
    status: true,
    inventory: true,
    shipping: true,
    orderItems: true,
    createdAt: true,
}).extend({
    id: z.number(),
    name: nonEmptyString,
    description: nonEmptyString,
    price: z.number().int().positive(),
    discount: z.number().int().nonnegative().optional(),
    imgs: productImgsSchema,
    tags: z.array(nonEmptyString).optional(),
    metadata: productMetadataSchema.optional(),
    category: productCategorySelectSchema,
})
