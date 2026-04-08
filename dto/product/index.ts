import z from "zod";
import { ProductStatusSchema } from "@/prisma/generated/schemas";
import {nonEmptyString, productCategoryConnectSchema, productCategoryGetSchema, productImgsSchema, productInventorySchema, productMetadataSchema, productShippingSchema} from "./schemas"

export const CreateProductDto = z.object({
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

export const publicProductOutputDto = z.object({
    id: z.number(),
    name: nonEmptyString,
    description: nonEmptyString,
    price: z.number().int().positive(),
    discount: z.number().int().nonnegative().optional(),
    imgs: productImgsSchema,
    tags: z.array(nonEmptyString).optional(),
    metadata: productMetadataSchema.optional(),
    category: productCategoryGetSchema,
})

// 1. Full admin view (for edit form + single product detail)
export const adminProductFullOutputDto = z.object({
    id: z.number(),
    name: nonEmptyString,
    description: nonEmptyString,
    price: z.number().int().positive(),
    discount: z.number().int().nonnegative().optional(),
    quantity: z.number().int().nonnegative().optional(),
    status: ProductStatusSchema,
    imgs: productImgsSchema,
    tags: z.array(nonEmptyString).optional(),
    inventory: productInventorySchema,
    shipping: productShippingSchema, 
    metadata: productMetadataSchema, 
    category: productCategoryGetSchema,
    salesCount: z.number().int().nonnegative(),     // ← admin-only field
    createdAt: z.date(),
    updatedAt: z.date(),
});

// 2. List/table view (for admin/products/page.tsx - lighter)
export const adminProductListOutputDto = adminProductFullOutputDto
    .omit({ inventory: true, shipping: true, metadata: true, description: true })
    .extend({ categoryName: nonEmptyString }); // denormalized for table performance

// 3. Summary view (for dashboard popular/recent products)
export const adminProductSummaryOutputDto = z.object({
    id: z.number(),
    name: nonEmptyString,
    price: z.number().int().positive(),
    discount: z.number().int().nonnegative().optional(),
    imgs: productImgsSchema, // first image only
    salesCount: z.number().int().nonnegative(),
    categoryName: nonEmptyString,
    status: ProductStatusSchema,
});

// 4. product created
export const adminProductCreatedDTO = adminProductFullOutputDto.pick({
    id: true,
    name: true,
    createdAt: true
})

// update product
export const updateProductDto = CreateProductDto.partial().extend({
    id: z.number().int().positive(),           
    category: productCategoryConnectSchema.optional(), 
});

export const adminProductUpdatedDTO = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number().int().positive(),
    discount: z.number().int().nonnegative().nullable(),
    quantity: z.number().int().nonnegative(),
    status: ProductStatusSchema,
    updatedAt: z.date(),
    //? Optional: return full data if needed
});