import { NextRequest } from "next/server";
import { fetchSinglePublicProductService } from "@/services/products/fetch";
import { updateProductService } from "@/services/products/update";
import { deleteProductService } from "@/services/products/delete";
import { handleService } from "@/utils/handle-service";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    return handleService(
        fetchSinglePublicProductService(id),
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
        updateProductService({ ...body, id }),
        200
    );
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    return handleService(
        deleteProductService({ id }),
        200
    );
}