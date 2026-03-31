import { NextResponse } from "next/server";
import { res } from "./api-response";
import { AppError } from "@/errors/base.error";

export async function handleService<S>(
    serviceCall: Promise<S>,
    statusCode: number
) {
    try {
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