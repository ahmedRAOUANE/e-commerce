import { ServiceResult } from "@/types/products";
import { ErrorTemplate } from "@/types/templates";

export function ok<S>(data: S): ServiceResult<never, S> {
    return [null, data];
}

export function error<E extends ErrorTemplate>(error: E): ServiceResult<E, never> {
    return [error, null];
}