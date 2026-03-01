import { NextResponse } from "next/server";
import { res } from "./api-response";
import { ErrorTemplate } from "@/types/templates";

export function handleService<E extends ErrorTemplate, S>(
    result: [E | null, S | null],
    successStatus = 200
) {
    const [error, data] = result;

    if (error) {
        return NextResponse.json(
            res.fail({
                reason: error.reason ?? "Operation failed",
            }),
            { status: 400 }
        );
    }

    return NextResponse.json(
        res.success(data),
        { status: successStatus }
    );
}