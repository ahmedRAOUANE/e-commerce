import { NextRequest } from "next/server";
import { fetchSinglePublicProductService } from "@/services/products/fetch";
import { updateProductService } from "@/services/products/update";
import { deleteProductService } from "@/services/products/delete";
import { handleService } from "@/utils/handle-service";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const intId = parseInt(id);
    return handleService(
        fetchSinglePublicProductService(intId),
        200
    );
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const {id} = await params;
    const intId = parseInt(id);
    const body = await req.json();

    return handleService(
        updateProductService({ ...body, id: intId }),
        200
    );
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const {id} = await params;
    const intId = parseInt(id);
    return handleService(
        deleteProductService({ id: intId }),
        200
    );
}