import { adminProductCreatedDTO, adminProductDeletedDTO, adminProductFullOutputDto, adminProductListOutputDto, adminProductSummaryOutputDto, adminProductUpdatedDTO, CreateProductDto, deleteProductDto, publicProductOutputDto, updateProductDto } from "@/dto/product";
import { productCategoryConnectSchema, productImageSchema, productInventorySchema, productMetadataSchema, productShippingSchema } from "@/dto/product/schemas";
import z from "zod";

export type CreateProductInput = z.infer<typeof CreateProductDto>
export type ProductImage = z.infer<typeof productImageSchema>
export type ProductInventory = z.infer<typeof productInventorySchema>
export type ProductShipping = z.infer<typeof productShippingSchema>
export type ProductMetadata = z.infer<typeof productMetadataSchema>
export type ProductCategoryConnect = z.infer<typeof productCategoryConnectSchema>

export type PublicProductOutput = z.infer<typeof publicProductOutputDto>

export type AdminProductFullOutput = z.infer<typeof adminProductFullOutputDto>
export type AdminProductCreated = z.infer<typeof adminProductCreatedDTO>
export type AdminProductListOutput = z.infer<typeof adminProductListOutputDto>
export type AdminProductSummaryOutput = z.infer<typeof adminProductSummaryOutputDto>

export type UpdateProductInput = z.infer<typeof updateProductDto>;
export type AdminProductUpdatedOutput = z.infer<typeof adminProductUpdatedDTO>;

export type DeleteProductInput = z.infer<typeof deleteProductDto>;
export type AdminProductDeletedOutput = z.infer<typeof adminProductDeletedDTO>;