"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const handleSetup = async () => {
    // laod config
    const isSetup = await prisma.appConfig.findFirst({
        select: {isSetup: true}
    });

    if (!isSetup) {
        redirect("/setup"); 
    }

    if (isSetup) {
        redirect("/login")
    }
}