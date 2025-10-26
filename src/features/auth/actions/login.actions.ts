"use server";

import { signIn } from "@/lib/auth";
import { loginSchema, type LoginInput } from "../schemas/register.schema";
import { AuthError } from "next-auth";

export async function loginUser(data: LoginInput) {
  try {
    const validatedData = loginSchema.parse(data);

    const result = await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, error: "Credenciales inválidas" };
        default:
          return { success: false, error: "Error al iniciar sesión" };
      }
    }
    return { success: false, error: "Error inesperado" };
  }
}
