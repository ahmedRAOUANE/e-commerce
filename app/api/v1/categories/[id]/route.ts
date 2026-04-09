// app/api/categories/[id]/route.ts
import { NextRequest } from "next/server";
import { handleService } from "@/utils/handle-service";
import { fetchAdminCategoryById } from "@/services/categpries/fetch";
import { updateCategoryService } from "@/services/categpries/update";
import { deleteCategoryService } from "@/services/categpries/delete";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    return handleService(
        fetchAdminCategoryById(id),
        200
    );
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const body = await req.json();

    return handleService(
        updateCategoryService({ ...body, id }),
        200
    );
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    return handleService(
        deleteCategoryService({ id }),
        200
    );
}