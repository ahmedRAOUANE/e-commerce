import { ProductAlreadyExistsError, ProductNotFoundError } from "@/errors/product.error";
import prisma from "@/lib/prisma";
import { CreateProductInput } from "@/types/products";
// import { ErrorTemplate } from "@/types/templates";
// import { error, ok } from "@/utils/success-status";
import { Prisma, Products, ProductStatus } from "@prisma/client";

interface ProductFilterType {
    // type: "ALL" | "DRAFT" | "ACTIVE" | "OUT_OF_STOCK",
    status: "ALL" | ProductStatus,
    max: number,
    id?: number,
}

export async function fetchProductsService(
    filter?: Partial<ProductFilterType>
// ): Promise<ServiceResult<AppError, Products | Products[]>> {
): Promise<Products | Products[]> {
    if (filter?.id) {
        const product = await prisma.products.findUnique({ where: { id: filter?.id } })
        // if (!product) {
        //     return error({ reason: "product not found" })
        // }
        if (!product) 
            throw new ProductNotFoundError();

        // return ok(product);
        return product;
    }

    const where: Prisma.ProductsWhereInput = {};

    if (filter?.status && filter.status !== "ALL") {
        where.status = filter.status;
    }

    const products = await prisma.products.findMany({ where, take: Math.min(filter?.max ?? 20, 100) });

    return products;
    // return ok(products);
    // try {
    // } catch (err) {
    //     console.log("services > products > fetchProductsService: ", err);
    //     return error({ reason: "unable to fetch products" });
    // }
}

export async function createProductService(
    data: CreateProductInput
): Promise<Products> {
    const exists = await prisma.products.findFirst({
        where: {
            name: data.name,
            // categoryId: data.category
        }
    })

    if (exists) throw new ProductAlreadyExistsError();

    return await prisma.products.create({data});

    // try { 
    //     // const product = await prisma.products.create({data})

    //     // return ok(product);
    //     // return product;
    // } catch (err) {
    //     console.error(
    //         "services > products > createProductService",
    //         err
    //     );
    //     // return error({ reason: "unable to create producr" });
    // }
}