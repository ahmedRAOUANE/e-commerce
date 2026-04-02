// api/v1/route.ts

import { CreateProductDto } from "@/dto/product";
import { createProductService } from "@/services/products/create";
import { fetchPublicProductsService } from "@/services/products/fetch";
import { res } from "@/utils/api-response";
import { handleService } from "@/utils/handle-service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => 
    handleService(
        fetchPublicProductsService({max: 1}),
        200
    );

export const POST = async (req: NextRequest) => {
    const body = await req.json()

    const parsedData = CreateProductDto.safeParse(body);
    if (!parsedData.success) 
        return NextResponse.json(res.fail({
            message: parsedData.error.message, 
            code: "VALIDATION_ERROR",
            status: 400,
            name: "validation error"
        }));

    return handleService(
        createProductService(parsedData.data),
        201
    )
}
