import { Prisma } from "@prisma/client";

type OmittedProductKeys = "id" | "salesCount" | "createdAt" | "updatedAt" | "orderItems";
export type CreateProductInput = Omit<Prisma.ProductsCreateInput, OmittedProductKeys>;

// export type ProductResponse<E, S> = [null, S] | [E, null]; // S for Success E for Error
export type ServiceResult<E, S> = [null, S] | [E, null]; // S for Success E for Error
