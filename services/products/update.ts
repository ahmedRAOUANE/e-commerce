import { AppError } from "@/errors/base.error";
import { DatabaseError } from "@/errors/db.error";
import { ProductNotFoundError } from "@/errors/product.error";
import { updateProductDto, adminProductUpdatedDTO } from "@/dto/product";
import { buildSelect } from "@/dto/select.dto";
import prisma from "@/lib/prisma";
import { AdminProductUpdatedOutput, UpdateProductInput } from "@/types/products";
import { ValidationError } from "@/errors/validation.error";
import z from "zod";
import { fetchSinglePublicProductService } from "./fetch";
import { CategoryNotFoundError } from "@/errors/category.error";

export async function updateProductService(
    data: UpdateProductInput
): Promise<AdminProductUpdatedOutput> {
    try {
        // 1. Validate input with DTO
        const parsedProduct = updateProductDto.safeParse(data);
        if (!parsedProduct.success) {
            console.log("update product: validation error");
            throw new ValidationError(`the prouduct data provided is invalid`);
        }

        const validated = parsedProduct.data;

        // 2. Check if product exists
        const existing = await fetchSinglePublicProductService(validated.id);

        if (!existing) {
            throw new ProductNotFoundError();
        }

        // 3. Extract categoryId if provided
        let categoryId = existing.category.id;
        if (validated.category?.connect?.id) {
            categoryId = validated.category.connect.id;

            // Optional: Verify category exists
            // TODO: change it to the getPublicCategoryService when implemented
            const categoryExists = await prisma.categories.findUnique({
                where: { id: categoryId },
            });
            if (!categoryExists) {
                throw new AppError("Category not found", 400, "CATEGORY_NOT_FOUND");
            }
        }

        // 4. Prepare update data
        const { id, category, ...updateData} = validated;
        if (categoryId !== id) {
            if (category?.connect.id){
                category.connect.id = categoryId;
            } else {
                throw new CategoryNotFoundError() 
            }
        }

        // 5. Perform update
        const updatedProduct = await prisma.products.update({
            where: { id: validated.id },
            data: updateData,
            select: buildSelect(adminProductUpdatedDTO.shape),
        });

        // 6. Validate output
        return adminProductUpdatedDTO.parse(updatedProduct);
    } catch (error) {
        if (error instanceof AppError) throw error;
        if (error instanceof z.ZodError) {
            throw new ValidationError("Invalid update data");
        }
        throw new DatabaseError("Failed to update product", error as unknown as Record<string, unknown>);
    }
}