import { NextResponse } from "next/server";
import { res } from "./api-response";
import { ErrorTemplate } from "@/types/templates";

export function handleService<E extends ErrorTemplate, S>(
    serviceCall: [E | null, S | null],
    statusCode: number
) {
    const [error, data] = serviceCall;

    if (error) {
        return NextResponse.json(
            res.fail({
                reason: error.reason ?? "Operation failed",
            }),
            { status: statusCode ?? 500 }
        );
    }

    return NextResponse.json(
        res.success(data),
        { status: statusCode }
    );
}