// app/api/categories/route.ts
import { NextRequest } from "next/server";
import { handleService } from "@/utils/handle-service";
import { createCategoryService } from "@/services/categpries/create";
import { fetchAdminCategoriesService, fetchPublicCategoriesService } from "@/services/categpries/fetch";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const admin = searchParams.get("admin") === "true";

    return handleService(
        admin
            ? fetchAdminCategoriesService(true)
            : fetchPublicCategoriesService(),
        200
    );
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    return handleService(
        createCategoryService(body),
        201
    );
}