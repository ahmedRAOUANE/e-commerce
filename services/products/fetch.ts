import { publicProductOutputDto } from "@/dto/product";
import { productCategorySelectSchema } from "@/dto/product/schemas";
import { AppError } from "@/errors/base.error";
import { DatabaseError } from "@/errors/db.error";
import { ProductNotFoundError } from "@/errors/product.error";
import { ValidationError } from "@/errors/validation.error";
import prisma from "@/lib/prisma";
import { PublicProductOutput } from "@/types/products";
import { buildSelect } from "@/dto/select.dto";
import { Prisma, Products, ProductStatus } from "@prisma/client";

const publicProductSelect = buildSelect(
    publicProductOutputDto.omit({
        category: true,
    }).shape
) satisfies Prisma.ProductsSelect;

const publicProductSelectWithCategory = {
    ...publicProductSelect,
    category: {
        select: buildSelect(productCategorySelectSchema.shape),
    },
} satisfies Prisma.ProductsSelect;

interface ProductFilterType {
    // type: "ALL" | "DRAFT" | "ACTIVE" | "OUT_OF_STOCK",
    status: "ALL" | ProductStatus,
    max: number,
    id?: number,
}

export async function fetchPublicProductsService(
    filter?: Partial<ProductFilterType>
): Promise<PublicProductOutput[]> {

    const where: Prisma.ProductsWhereInput = {
        category: {
            status: "ACTIVE"
        }, // always select the products under of active categories
    };

    if (filter?.status && filter.status !== "ALL") {
        where.status = filter.status;
    }

    const limit = Math.min(filter?.max ?? 20, 100);

    if (limit <= 0)
        throw new ValidationError("Invalid products limit");

    try {
        const products = await prisma.products.findMany({
            where,
            take: limit,
            select: publicProductSelectWithCategory
        });
        
        const parsedProducts = publicProductOutputDto.array().safeParse(products);
        console.log("parsedProducts: ", parsedProducts);
        if (!parsedProducts.success)
            throw new ValidationError(
                "Fetched products do not match the public product dto"
            );

        return parsedProducts.data;
    } catch (error) {
        if (error instanceof AppError)
            throw error;
        
        throw new DatabaseError("Failed to fetch products", {
            cause: error,
        });
    }
}

export async function fetchSinglePublicProductService(
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
