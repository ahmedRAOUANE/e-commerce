// api/v1/route.ts

import { fetchProductsService } from "@/services/products";
import { NextResponse } from "next/server";

export const GET = async () => {
    const res = await fetchProductsService();

    return NextResponse.json(res);
}