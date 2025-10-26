"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { EducationLevel, UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Obtener educación del usuario
export async function getUserEducation() {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== UserRole.CITIZEN) {
      return { success: false, error: "No autorizado" };
    }

    const citizenProfile = await db.citizenProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        education: {
          orderBy: {
            startDate: "desc",
          },
        },
      },
    });

    if (!citizenProfile) {
      return { success: false, error: "Perfil no encontrado" };
    }

    return { success: true, education: citizenProfile.education };
  } catch (error) {
    console.error("Error obteniendo educación:", error);
    return { success: false, error: "Error al cargar educación" };
  }
}

// Agregar educación
export async function addEducation(data: {
  level: EducationLevel;
  institution: string;
  fieldOfStudy: string;
  degree?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description?: string;
}) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== UserRole.CITIZEN) {
      return { success: false, error: "No autorizado" };
    }

    const citizenProfile = await db.citizenProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!citizenProfile) {
      return { success: false, error: "Perfil no encontrado" };
    }

    await db.education.create({
      data: {
        citizenId: citizenProfile.id,
        level: data.level,
        institution: data.institution,
        fieldOfStudy: data.fieldOfStudy,
        degree: data.degree,
        startDate: data.startDate,
        endDate: data.current ? null : data.endDate,
        current: data.current,
        description: data.description,
      },
    });

    revalidatePath("/profile/education");
    return { success: true };
  } catch (error) {
    console.error("Error agregando educación:", error);
    return { success: false, error: "Error al agregar educación" };
  }
}

// Actualizar educación
export async function updateEducation(
  id: string,
  data: {
    level: EducationLevel;
    institution: string;
    fieldOfStudy: string;
    degree?: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description?: string;
  }
) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== UserRole.CITIZEN) {
      return { success: false, error: "No autorizado" };
    }

    await db.education.update({
      where: { id },
      data: {
        level: data.level,
        institution: data.institution,
        fieldOfStudy: data.fieldOfStudy,
        degree: data.degree,
        startDate: data.startDate,
        endDate: data.current ? null : data.endDate,
        current: data.current,
        description: data.description,
      },
    });

    revalidatePath("/profile/education");
    return { success: true };
  } catch (error) {
    console.error("Error actualizando educación:", error);
    return { success: false, error: "Error al actualizar educación" };
  }
}

// Eliminar educación
export async function removeEducation(id: string) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== UserRole.CITIZEN) {
      return { success: false, error: "No autorizado" };
    }

    await db.education.delete({
      where: { id },
    });

    revalidatePath("/profile/education");
    return { success: true };
  } catch (error) {
    console.error("Error eliminando educación:", error);
    return { success: false, error: "Error al eliminar educación" };
  }
}
