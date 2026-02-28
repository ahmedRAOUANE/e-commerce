import prisma from "@/lib/prisma";
import { error, ok } from "@/utils/response";

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