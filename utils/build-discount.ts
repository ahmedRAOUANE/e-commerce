import { PublicProductOutput } from "@/types/products";

export const buildDiscount = (product: Pick<PublicProductOutput, "price" | "discount">) => {
    return product.discount
        ? Math.round(product.price * (1 - product.discount / 100) * 100) / 100 // round to 2 decimals
        : product.price;
}