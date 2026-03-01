import { NextResponse } from "next/server";
import { res } from "./api-response";
// import { ErrorTemplate } from "@/types/templates";
import { AppError } from "@/errors/base.error";

export async function handleService<S>(
    // serviceCall: [E | null, S | null],
    serviceCall: Promise<S>,
    statusCode: number
) {
    try {
    // const [error, data] = serviceCall;

    // if (error) {
    //     return NextResponse.json(
    //         res.fail({
    //             reason: error.reason ?? "Operation failed",
    //         }),
    //         { status: statusCode ?? 500 }
    //     );
    // }

    const data = await serviceCall

    return NextResponse.json(
        res.success(data),
        { status: statusCode }
    );
    } catch (err) {
        if (err instanceof AppError) {
            return NextResponse.json(
                res.fail({
                    code: err.code,
                    message: err.message,
                    status: err.status,
                    name: err.name
                }),
                {status: err.status}
            )
        }

        return NextResponse.json(
            res.fail({
                name: "internal server error",
                message: "internal server error",
                status: 500,
                code: "SERVER_ERROR"
            })
        )
    }
}