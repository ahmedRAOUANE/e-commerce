// app/api/categories/[id]/route.ts
import { NextRequest } from "next/server";
import { handleService } from "@/utils/handle-service";
import { fetchAdminCategoryById } from "@/services/categpries/fetch";
import { updateCategoryService } from "@/services/categpries/update";
import { deleteCategoryService } from "@/services/categpries/delete";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const {id} = await params;
    const intId = parseInt(id);
    return handleService(
        fetchAdminCategoryById(intId),
        200
    );
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const intId = parseInt(id);
    const body = await req.json();

    return handleService(
        updateCategoryService({ ...body, id: intId }),
        200
    );
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const intId = parseInt(id);
    return handleService(
        deleteCategoryService({ id: intId }),
        200
    );
}