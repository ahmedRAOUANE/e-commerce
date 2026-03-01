import prisma from "@/lib/prisma";
import { CreateProductInput, ProductResponse } from "@/types/products";
import { ErrorTemplate } from "@/types/templates";
import { error, ok } from "@/utils/success-status";
import { Prisma, Products, ProductStatus } from "@prisma/client";

interface ProductFilterType {
    // type: "ALL" | "DRAFT" | "ACTIVE" | "OUT_OF_STOCK",
    status: "ALL" | ProductStatus,
    max: number,
    id?: number,
}

export async function fetchProductsService(
    filter?: Partial<ProductFilterType>
): Promise<ProductResponse<ErrorTemplate, Products | Products[]>> {
    try {
        if (filter?.id) {
            const product = await prisma.products.findUnique({ where: { id: filter?.id } })
            if (!product) {
                return error({ reason: "product not found" })
            }

            return ok(product);
        }

        const where: Prisma.ProductsWhereInput = {};

        if (filter?.status && filter.status !== "ALL") {
            where.status = filter.status;
        }

        const products = await prisma.products.findMany({ where, take: filter?.max });

        return ok(products);
    } catch (err) {
        console.log("services > products > fetchProductsService: ", err);
        return error({ reason: "unable to fetch products" });
    }
}

export async function createProductService(
    data: CreateProductInput
): Promise<ProductResponse<ErrorTemplate, Products>> {
    try { 
        const product = await prisma.products.create({data})

        return ok(product);
    } catch (err) {
        console.error(
            "services > products > createProductService",
            err
        );
        return error({ reason: "unable to create producr" });
    }
}