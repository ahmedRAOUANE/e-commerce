import z from "zod";
import { nonEmptyString } from "../product/schemas";
import { UserRoleSchema } from "@/prisma/generated/schemas";

export const loginDto = z.object({
    email: z.email("Invalid email address"),
    password: nonEmptyString.min(6, "Password must be at least 6 characters"),
});

export const registerDto = z.object({
    email: z.email("Invalid email address"),
    name: nonEmptyString.min(2, "Name must be at least 2 characters"),
    password: nonEmptyString.min(8, "Password must be at least 8 characters"),
});

export const authUserOutputDto = z.object({
    id: z.number(),
    email: z.email(),
    name: nonEmptyString.nullable(),
    role: UserRoleSchema,
});