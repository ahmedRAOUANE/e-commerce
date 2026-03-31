import z from "zod";

export const nonEmptyString = z.string().trim().min(1);

export const productImageSchema = z.object({
    alt: nonEmptyString,
    url: z.url(),
}).strict()

export const productImgsSchema = z.array(productImageSchema).min(1)

export const productInventorySchema = z.object({
    sku: nonEmptyString,
    barcode: nonEmptyString,
    quantity: z.number().int().nonnegative(),
}).strict()

export const productShippingSchema = z.object({
    weight: z.number().nonnegative(),
    length: z.number().nonnegative(),
    width: z.number().nonnegative(),
    height: z.number().nonnegative(),
}).strict()

export const productMetadataSchema = z.object({
    seo: z.object({
        title: nonEmptyString,
        description: nonEmptyString,
    }).strict(),
}).strict()

export const productCategoryConnectSchema = z.object({
    connect: z.object({
        id: z.number().int().positive(),
    }).strict(),
}).strict()

export const productCategorySelectSchema = z.object({
    id: z.number().int().positive(),
    name: nonEmptyString,
    description: nonEmptyString,
}).strict()