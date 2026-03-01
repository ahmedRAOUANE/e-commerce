import { AppError } from "@/errors/base.error";

export type ApiSuccess<T> = {
    success: true;
    data: T;
};

export type ApiFail<E = unknown> = {
    success: false;
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

    fail<E extends AppError>(
        error: E
    ): ApiFail<E> {
        return {
            success: false,
            ...error,
        };
    },
};