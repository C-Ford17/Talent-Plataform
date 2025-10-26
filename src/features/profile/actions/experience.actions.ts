"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Obtener experiencia del usuario
export async function getUserExperience() {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== UserRole.CITIZEN) {
      return { success: false, error: "No autorizado" };
    }

    const citizenProfile = await db.citizenProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        experience: {
          orderBy: {
            startDate: "desc",
          },
        },
      },
    });

    if (!citizenProfile) {
      return { success: false, error: "Perfil no encontrado" };
    }

    return { success: true, experience: citizenProfile.experience };
  } catch (error) {
    console.error("Error obteniendo experiencia:", error);
    return { success: false, error: "Error al cargar experiencia" };
  }
}

// Agregar experiencia
export async function addExperience(data: {
  company: string;
  position: string;
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

    await db.experience.create({
      data: {
        citizenId: citizenProfile.id,
        company: data.company,
        position: data.position,
        startDate: data.startDate,
        endDate: data.current ? null : data.endDate,
        current: data.current,
        description: data.description,
      },
    });

    revalidatePath("/profile/experience");
    return { success: true };
  } catch (error) {
    console.error("Error agregando experiencia:", error);
    return { success: false, error: "Error al agregar experiencia" };
  }
}

// Actualizar experiencia
export async function updateExperience(
  id: string,
  data: {
    company: string;
    position: string;
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

    await db.experience.update({
      where: { id },
      data: {
        company: data.company,
        position: data.position,
        startDate: data.startDate,
        endDate: data.current ? null : data.endDate,
        current: data.current,
        description: data.description,
      },
    });

    revalidatePath("/profile/experience");
    return { success: true };
  } catch (error) {
    console.error("Error actualizando experiencia:", error);
    return { success: false, error: "Error al actualizar experiencia" };
  }
}

// Eliminar experiencia
export async function removeExperience(id: string) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== UserRole.CITIZEN) {
      return { success: false, error: "No autorizado" };
    }

    await db.experience.delete({
      where: { id },
    });

    revalidatePath("/profile/experience");
    return { success: true };
  } catch (error) {
    console.error("Error eliminando experiencia:", error);
    return { success: false, error: "Error al eliminar experiencia" };
  }
}
