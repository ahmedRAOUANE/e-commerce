import { authUserOutputDto, loginDto, registerDto } from "@/dto/auth";
import z from "zod";

export type LoginInput = z.infer<typeof loginDto>;
export type RegisterInput = z.infer<typeof registerDto>;
export type AuthUserOutput = z.infer<typeof authUserOutputDto>;