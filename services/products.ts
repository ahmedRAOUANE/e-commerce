import prisma from "@/lib/prisma";
import { CreateProductInput, ProductResponse } from "@/types/products";
import { error, ok } from "@/utils/response";
import { Products } from "@prisma/client";

interface FilterType {
    type: "all" | "active",
    id?: number,
}

export async function fetchProductsService(filter?: FilterType) {
    if (filter?.type === "all") {
        // check auth
    }

    let res;

    if (filter?.id) {
        res = await prisma.products.findUnique({where: {id: filter.id}});
    } else {
        res = await prisma.products.findMany();
    }

    if (!res) {
        return error({reson: "unable to fetch products"});
    }

    console.log("services > products > fetchProductsService > res: ", res);

    return ok(res);
}

export async function createProductService(
    data: CreateProductInput
): Promise<ProductResponse<Products, {reson: string}>> {
    try { 
        const product = await prisma.products.create({data})

        return ok(product);
    } catch (err) {
        console.error(
            "services > products > createProductService",
            err
        );
        return error({ reson: "unable to create producr" });
    }
}