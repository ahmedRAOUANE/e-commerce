import { ProductResponse } from "@/types/products";

export function ok<S>(data: S): ProductResponse<S, never> {
    return [null, data];
}

export function error<E extends { reson?: string }>(error: E): ProductResponse<never, E> {
    return [error, null];
}