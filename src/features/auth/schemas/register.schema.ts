import { z } from "zod";
import { UserRole, Gender, ZoneType } from "@prisma/client";


// Schema base SIN refine (lo movemos a cada schema específico)
const baseUserSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
  confirmPassword: z.string(),
  role: z.nativeEnum(UserRole),
});

// Schema para ciudadanos
export const citizenRegisterSchema = z
  .object({
    ...baseUserSchema.shape,
    role: z.literal(UserRole.CITIZEN),
    firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    dateOfBirth: z.string().optional(), // Fecha de nacimiento
    gender: z.nativeEnum(Gender).optional(), // Género
    phone: z.string().optional(),
    city: z.string().min(2, "La ciudad es requerida"),
    department: z.string().min(2, "El departamento es requerido"), // Era "province"
    zoneType: z.nativeEnum(ZoneType).optional(), // Urbano/Rural
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });


// Schema para empresas
export const companyRegisterSchema = z
  .object({
    ...baseUserSchema.shape,
    role: z.literal(UserRole.COMPANY),
    companyName: z.string().min(2, "El nombre de la empresa es requerido"),
    industry: z.string().min(2, "La industria es requerida"),
    size: z.enum(["1-10", "11-50", "51-200", "201-500", "500+"], {
      message: "Selecciona el tamaño de la empresa",
    }),
    phone: z.string().optional(),
    city: z.string().min(2, "La ciudad es requerida"),
    department: z.string().min(2, "El departamento es requerido"), // Era "province"
    website: z.string().url("URL inválida").optional().or(z.literal("")),
    description: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// Schema para instituciones educativas
export const institutionRegisterSchema = z
  .object({
    ...baseUserSchema.shape,
    role: z.literal(UserRole.INSTITUTION),
    institutionName: z.string().min(2, "El nombre de la institución es requerido"),
    institutionType: z.enum(
      ["Universidad", "Instituto técnico", "Centro de capacitación", "Otro"],
      {
        message: "Selecciona el tipo de institución",
      }
    ),
    phone: z.string().optional(),
    city: z.string().min(2, "La ciudad es requerida"),
    department: z.string().min(2, "El departamento es requerido"), // Era "province"
    website: z.string().url("URL inválida").optional().or(z.literal("")),
    description: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// Schema para login
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

// Tipos TypeScript inferidos
export type CitizenRegisterInput = z.infer<typeof citizenRegisterSchema>;
export type CompanyRegisterInput = z.infer<typeof companyRegisterSchema>;
export type InstitutionRegisterInput = z.infer<typeof institutionRegisterSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
