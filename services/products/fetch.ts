import { AppError } from "@/errors/base.error";
import { DatabaseError } from "@/errors/db.error";
import { ProductNotFoundError } from "@/errors/product.error";
import { ValidationError } from "@/errors/validation.error";
import prisma from "@/lib/prisma";
import { Prisma, Products, ProductStatus } from "@prisma/client";

interface ProductFilterType {
    // type: "ALL" | "DRAFT" | "ACTIVE" | "OUT_OF_STOCK",
    status: "ALL" | ProductStatus,
    max: number,
    id?: number,
}

export async function fetchProductsService(
    filter?: Partial<ProductFilterType>
): Promise<Products[]> {

    const where: Prisma.ProductsWhereInput = {};

    if (filter?.status && filter.status !== "ALL") {
        where.status = filter.status;
    }

    const limit = Math.min(filter?.max ?? 20, 100);

    if (limit <= 0)
        throw new ValidationError("Invalid products limit");

    try {
        return await prisma.products.findMany({
            where,
            take: limit,
        });

    } catch (error) {
        if (error instanceof AppError)
            throw error;
        
        throw new DatabaseError("Failed to fetch products", {
            cause: error,
        });
    }
}

export async function fetchSingleProductService(
    id: number
): Promise<Products> {

    try {
        const product = await prisma.products.findUnique({
            where: { id }
        });

        if (!product)
            throw new ProductNotFoundError();

        return product;
    } catch (error) {
        if (error instanceof AppError)
            throw error;

        throw new DatabaseError(
            "Failed to fetch product",
            { cause: error },
        );
    }
}