import { AppError } from "@/errors/base.error";
import { DatabaseError } from "@/errors/db.error";
import prisma from "@/lib/prisma";
import { CreateProductInput } from "@/types/products";
import { Products } from "@prisma/client";

/**
 * @param data.category must be {connect: {id}}, where the id is the category id
 * @param data 
 * @returns {Promise<Products>}
 */
export async function createProductService(
    data: CreateProductInput
): Promise<Products> {
    try {
        const categoryId = data.category?.connect?.id;
        if (!categoryId) throw new AppError(
            "category id is not available",
            400,
            "MISSING_PRODUCT_CATEGORY_ID"
        );

        return await prisma.products.upsert({
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
        });
    } catch (error) {
        if (error instanceof AppError) 
            throw error

        throw new DatabaseError(
            "failed to create or update new product",
            {cause: error}
        )
    }
}