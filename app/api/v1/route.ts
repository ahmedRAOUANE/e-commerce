// api/v1/route.ts

import { ProductsCreateInputObjectSchema } from "@/prisma/generated/schemas";
import { createProductService, fetchProductsService } from "@/services/products";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    const res = await fetchProductsService();

    return NextResponse.json(res);
}

export const POST = async (req: NextRequest) => {
    const body = await req.json()

    const parsedData = ProductsCreateInputObjectSchema.safeParse(body);
    if (!parsedData.success) 
        return NextResponse.json({reson: parsedData.error.message ?? "invalid product data"});
    
    const [error, data] = await createProductService(parsedData.data);

    if (error) 
        return NextResponse.json({success: false}, {status: 400});

    return NextResponse.json({success: true, data}, {status: 201});
}