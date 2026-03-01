// api/v1/route.ts

import { ProductsCreateInputObjectSchema } from "@/prisma/generated/schemas";
import { createProductService, fetchProductsService } from "@/services/products";
import { res } from "@/utils/api-response";
import { handleService } from "@/utils/handle-service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => 
    handleService(
        await fetchProductsService(),
        200
    );

export const POST = async (req: NextRequest) => {
    const body = await req.json()

    const parsedData = ProductsCreateInputObjectSchema.safeParse(body);
    if (!parsedData.success) 
        return NextResponse.json(res.fail({reason: parsedData.error.message ?? "invalid product data", code: 403}));

    return handleService(
        await createProductService(parsedData.data),
        201
    )
}