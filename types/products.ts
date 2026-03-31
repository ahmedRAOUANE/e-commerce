import { CreateProductDto, publicProductOutputDto } from "@/dto/product";
import { productCategoryConnectSchema, productImageSchema, productInventorySchema, productMetadataSchema, productShippingSchema } from "@/dto/product/schemas";
import { Products } from "@prisma/client";
import z from "zod";

export type CreateProductInput = z.infer<typeof CreateProductDto>
export type ProductImage = z.infer<typeof productImageSchema>
export type ProductInventory = z.infer<typeof productInventorySchema>
export type ProductShipping = z.infer<typeof productShippingSchema>
export type ProductMetadata = z.infer<typeof productMetadataSchema>
export type ProductCategoryConnect = z.infer<typeof productCategoryConnectSchema>

export type PublicProductOutput = z.infer<typeof publicProductOutputDto>

type OmittedAdminProductOutputKeys = "salesCount";
export type AdminProductOutput = Omit<Products, OmittedAdminProductOutputKeys>

export type ProductImgsType = ProductImage
