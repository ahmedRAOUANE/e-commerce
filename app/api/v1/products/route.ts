import { NextRequest } from "next/server";
import { createProductService } from "@/services/products/create";
import { fetchPublicProductsService } from "@/services/products/fetch";
import { handleService } from "@/utils/handle-service";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;

    const max = parseInt(searchParams.get("max") || "20");

    return handleService(
        fetchPublicProductsService({ max }),
        200
    );
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    return handleService(
        createProductService(body),
        201
    );
}