import { ProductResponse } from "@/types/products";
import { ErrorTemplate } from "@/types/templates";

export function ok<S>(data: S): ProductResponse<never, S> {
    return [null, data];
}

export function error<E extends ErrorTemplate>(error: E): ProductResponse<E, never> {
    return [error, null];
}