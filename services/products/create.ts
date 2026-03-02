import { ProductAlreadyExistsError } from "@/errors/product.error";
import prisma from "@/lib/prisma";
import { CreateProductInput } from "@/types/products";
import { Products } from "@prisma/client";

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

    return await prisma.products.create({ data });
}