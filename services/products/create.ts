import { adminProductCreatedDTO } from "@/dto/product";
import { buildSelect } from "@/dto/select.dto";
import { AppError } from "@/errors/base.error";
import { DatabaseError } from "@/errors/db.error";
import prisma from "@/lib/prisma";
import { AdminProductCreated, CreateProductInput } from "@/types/products";

/**
 * @param data.category must be {connect: {id}}, where the id is the category id
 * @param data 
 * @returns {Promise<{
 *  name: string,
 *  id: number,
 *  createdAt: Date,
 * }>}
 */
export async function createProductService(
    data: CreateProductInput
): Promise<AdminProductCreated> {
    try {
        const categoryId = data.category?.connect?.id;
        if (!categoryId) throw new AppError(
            "category id is not available",
            400,
            "MISSING_PRODUCT_CATEGORY_ID"
        );

        const createdProduct = await prisma.products.upsert({
            where: {
                name_categoryId: {
                    name: data.name,
                    categoryId,
                },
            },

            create: data,

            update: {
                quantity: {
                    increment: data.quantity ?? 1,
                },
            },

            // select: {id, name, createdAt}
            select: buildSelect(adminProductCreatedDTO.shape)
        });

        const parsedProduct = adminProductCreatedDTO.safeParse(createdProduct);
        if (!parsedProduct.success)
            throw new AppError("the created product does not match the standards");

        return parsedProduct.data
    } catch (error) {
        if (error instanceof AppError) 
            throw error

        throw new DatabaseError(
            "failed to create or update new product",
            {cause: error}
        )
    }
}