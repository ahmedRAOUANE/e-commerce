// api/v1/route.ts

import { createProductService, fetchProductsService } from "@/services/products";
import { CreateProductInput } from "@/types/products";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    const res = await fetchProductsService();

    return NextResponse.json(res);
}

export const POST = async (req: NextRequest) => {
    const body = await req.json()
    const [error, data] = await createProductService(body as CreateProductInput);

    if (error) {
        return NextResponse.json({success: false}, {status: 400});
    }

    return NextResponse.json({success: true, data}, {status: 201});
}