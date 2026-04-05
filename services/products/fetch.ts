import { adminProductFullOutputDto, adminProductListOutputDto, adminProductSummaryOutputDto, publicProductOutputDto } from "@/dto/product";
import { productCategoryGetSchema } from "@/dto/product/schemas";
import { buildSelect } from "@/dto/select.dto";
import { AppError } from "@/errors/base.error";
import { DatabaseError } from "@/errors/db.error";
import { ProductNotFoundError } from "@/errors/product.error";
import { ValidationError } from "@/errors/validation.error";
import prisma from "@/lib/prisma";
import { AdminProductFullOutput, AdminProductListOutput, AdminProductSummaryOutput, PublicProductOutput } from "@/types/products";
import { CategoryStatus, Prisma, ProductStatus } from "@prisma/client";

interface ProductPublicFilterType {
    max: number,
    id?: number,
}

const publicProductSelect = buildSelect(
    publicProductOutputDto.omit({
        category: true,
    }).shape
) satisfies Prisma.ProductsSelect;

const publicProductSelectWithCategory = {
    ...publicProductSelect,
    category: {
        select: buildSelect(productCategoryGetSchema.shape),
    },
} satisfies Prisma.ProductsSelect;

export async function fetchPublicProductsService(
    filter?: Partial<ProductPublicFilterType>
): Promise<PublicProductOutput[]> {
    const where: Prisma.ProductsWhereInput = {
        category: {
            status: "ACTIVE"
        },
        status: "ACTIVE"
    };

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
        if (!parsedProducts.success)
            throw new ValidationError(
                "Fetched products do not match the public product standards"
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
): Promise<PublicProductOutput> {
    try {
        const product = await prisma.products.findUnique({
            where: { id, status: "ACTIVE" },
            select: publicProductSelectWithCategory
        });

        if (!product)
            throw new ProductNotFoundError();

        const parsedProduct = publicProductOutputDto.safeParse(product);
        if (!parsedProduct.success) {
            console.log(parsedProduct.error);
            throw new ValidationError(
                "Fetched product do not match the public product dto"
            );
        }

        return parsedProduct.data;
    } catch (error) {
        if (error instanceof AppError)
            throw error;

        throw new DatabaseError(
            "Failed to fetch product",
            { cause: error },
        );
    }
}

interface AdminProductFilterType extends ProductPublicFilterType {
    status: ProductStatus | "ALL",
    categoryStatus: CategoryStatus | "ALL"
}

const buildQuery = (filter?: Partial<AdminProductFilterType>) => {
    const where: Prisma.ProductsWhereInput = {}

    if (filter?.status && filter?.status !== "ALL") {
        where.status = filter?.status;
    }

    if (filter?.categoryStatus && filter?.categoryStatus !== "ALL") {
        where.category = {
            status: filter?.categoryStatus
        };
    }

    return where;
}

interface Pagination {
    categoryId: number;
    offset: number;
};
const adminProductsSelect = buildSelect(adminProductListOutputDto.shape) satisfies Prisma.ProductsSelect
export async function fetchAdminProductsForTableSerivce(
    filter: Partial<AdminProductFilterType & Pagination> = {}
): Promise<AdminProductListOutput[]> {
    const limit = Math.min(filter?.max ?? 20, 100);

    if (limit <= 0)
        throw new ValidationError("Invalid products limit");

    const { 
        offset = 0, 
        // status, categoryId // !what do we do with these tow? 
    } = filter;

    try {
        const products = await prisma.products.findMany({
            where: buildQuery(filter),
            take: limit,
            skip: offset,
            select: adminProductsSelect,
            orderBy: { updatedAt: 'desc' },
        });

        const parsedProducts = adminProductListOutputDto.array().safeParse(products);
        if (!parsedProducts.success)
            throw new AppError("Fetched products do not match the public product dto");

        return parsedProducts.data
    } catch (error) {
        if (error instanceof AppError)
            throw error;

        throw new DatabaseError("Failed to fetch products", {
            cause: error,
        });
    }
}

export async function fetchAdminPopularProducts(limit = 5): Promise<AdminProductSummaryOutput[]> {
    if (limit <= 0)
        throw new ValidationError("Invalid products limit");

    try {
        const products = await prisma.products.findMany({
            take: Math.min(limit ?? 20, 100),
            orderBy: { salesCount: 'desc' },
            include: { category: { select: { name: true } } },
        });

        const parsedProducts = adminProductSummaryOutputDto.array().safeParse(products);
        if (!parsedProducts.success)
            throw new AppError("Fetched products do not match the public product dto");

        return parsedProducts.data;
    } catch (error) {
        if (error instanceof AppError)
            throw error;

        throw new DatabaseError("Failed to fetch products", {
            cause: error,
        });
    }
}

export async function fetchAdminProductById(id: number): Promise<AdminProductFullOutput> {
    try {
        const product = await prisma.products.findUnique({
            where: { id },
            include: { category: true },
        });

        if (!product) throw new ProductNotFoundError();
        const parsedProduct = adminProductFullOutputDto.safeParse(product);

        if(!parsedProduct.success)
            throw new AppError("Fetched product do not match the public product dto");

        return parsedProduct.data
    } catch (error) {
        if (error instanceof AppError)
            throw error;

        throw new DatabaseError("Failed to fetch products", {
            cause: error,
        });
    }
}
