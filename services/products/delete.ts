import prisma from "@/lib/prisma";
import { AppError } from "@/errors/base.error";
import { DatabaseError } from "@/errors/db.error";
import { ProductNotFoundError } from "@/errors/product.error";
import { deleteProductDto, adminProductDeletedDTO } from "@/dto/product";
import { AdminProductDeletedOutput, DeleteProductInput } from "@/types/products";
import { ValidationError } from "@/errors/validation.error";
import z from "zod";

export async function deleteProductService(
    data: DeleteProductInput
): Promise<AdminProductDeletedOutput> {
    try {
        // 1. Validate input
        const validated = deleteProductDto.parse(data);

        // 2. Check if product exists
        const existingProduct = await prisma.products.findUnique({
            where: { id: validated.id },
            select: { id: true, name: true },
        });

        if (!existingProduct) {
            throw new ProductNotFoundError();
        }

        // 3. Delete the product (Hard delete - matches current schema)
        await prisma.products.delete({
            where: { id: validated.id },
        });

        // 4. Return success response
        return adminProductDeletedDTO.parse({
            id: existingProduct.id,
            name: existingProduct.name,
            deletedAt: new Date(),
            message: "Product deleted successfully",
        });

    } catch (error) {
        console.log("delete product error: ", error);
        if (error instanceof AppError) throw error;
        if (error instanceof z.ZodError) {
            throw new ValidationError("Invalid delete request");
        }
        throw new DatabaseError("Failed to delete product", error as unknown as Record<string, unknown>);
    }
}