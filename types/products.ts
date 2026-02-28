import { Products } from "@prisma/client";

type CreateProductKeys = "name" | "description" | "price" | "categoryId" | "price" | "status";
export type CreateProductInput = Pick<Products, CreateProductKeys>;

export type ProductResponse<S, E> = [null, S] | [E, null]; // S for Success E for Error
