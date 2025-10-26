"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";
import {
  citizenRegisterSchema,
  companyRegisterSchema,
  institutionRegisterSchema,
  type CitizenRegisterInput,
  type CompanyRegisterInput,
  type InstitutionRegisterInput,
} from "../schemas/register.schema";

// Registrar ciudadano
export async function registerCitizen(data: CitizenRegisterInput) {
  try {
    // Validar datos
    const validatedData = citizenRegisterSchema.parse(data);

    // Verificar si el email ya existe
    const existingUser = await db.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return { success: false, error: "Este email ya está registrado" };
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Crear usuario y perfil de ciudadano en una transacción
    const user = await db.user.create({
        data: {
            email: validatedData.email,
            password: hashedPassword,
            role: UserRole.CITIZEN,
            name: `${validatedData.firstName} ${validatedData.lastName}`,
            citizenProfile: {
            create: {
                firstName: validatedData.firstName,
                lastName: validatedData.lastName,
                dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : null,
                gender: validatedData.gender,
                phone: validatedData.phone,
                city: validatedData.city,
                department: validatedData.department, // Cambio de province
                zoneType: validatedData.zoneType,
            },
            },
        },
});

    return { success: true, userId: user.id };
  } catch (error) {
    console.error("Error registrando ciudadano:", error);
    return { success: false, error: "Error al registrar usuario" };
  }
}

// Registrar empresa
export async function registerCompany(data: CompanyRegisterInput) {
  try {
    const validatedData = companyRegisterSchema.parse(data);

    const existingUser = await db.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return { success: false, error: "Este email ya está registrado" };
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await db.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        role: UserRole.COMPANY,
        name: validatedData.companyName,
        companyProfile: {
          create: {
            companyName: validatedData.companyName,
            industry: validatedData.industry,
            size: validatedData.size,
            phone: validatedData.phone,
            city: validatedData.city,
            department: validatedData.department,
            website: validatedData.website,
            description: validatedData.description,
          },
        },
      },
    });

    return { success: true, userId: user.id };
  } catch (error) {
    console.error("Error registrando empresa:", error);
    return { success: false, error: "Error al registrar empresa" };
  }
}

// Registrar institución
export async function registerInstitution(data: InstitutionRegisterInput) {
  try {
    const validatedData = institutionRegisterSchema.parse(data);

    const existingUser = await db.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return { success: false, error: "Este email ya está registrado" };
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await db.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        role: UserRole.INSTITUTION,
        name: validatedData.institutionName,
        institutionProfile: {
          create: {
            institutionName: validatedData.institutionName,
            institutionType: validatedData.institutionType,
            phone: validatedData.phone,
            city: validatedData.city,
            department: validatedData.department,
            website: validatedData.website,
            description: validatedData.description,
          },
        },
      },
    });

    return { success: true, userId: user.id };
  } catch (error) {
    console.error("Error registrando institución:", error);
    return { success: false, error: "Error al registrar institución" };
  }
}
