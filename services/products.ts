import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type ProductResponse<S, E> = [null, S] | [E, null]; // S for Success E for Error

function ok<S>(data: S): ProductResponse<S, never> {
    return [null, data];
}

function error<E extends { reson?: string }>(error: E): ProductResponse<never, E> {
    return [error, null];
}

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