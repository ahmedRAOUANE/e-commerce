import { ErrorTemplate } from "@/types/templates";

export type ApiSuccess<T> = {
    success: true;
    data: T;
};

export type ApiFail<E = unknown> = {
    success: false;
    reason?: string;
} & E;

export type ApiResponse<T, E = unknown> =
    | ApiSuccess<T>
    | ApiFail<E>;

export const res = {
    success<T>(data: T): ApiSuccess<T> {
        return {
            success: true,
            data,
        };
    },

    fail<E extends ErrorTemplate>(
        error: E
    ): ApiFail<Omit<E, "reason">> {
        return {
            success: false,
            ...error,
        };
    },
};