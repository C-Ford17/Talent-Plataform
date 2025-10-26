"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { SkillLevel, UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Obtener todas las habilidades disponibles
export async function getAllSkills() {
  try {
    const skills = await db.skill.findMany({
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });
    return { success: true, skills };
  } catch (error) {
    console.error("Error obteniendo habilidades:", error);
    return { success: false, error: "Error al cargar habilidades" };
  }
}

// Obtener habilidades del usuario actual
export async function getUserSkills() {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== UserRole.CITIZEN) {
      return { success: false, error: "No autorizado" };
    }

    const citizenProfile = await db.citizenProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        skills: {
          include: {
            skill: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!citizenProfile) {
      return { success: false, error: "Perfil no encontrado" };
    }

    return { success: true, skills: citizenProfile.skills };
  } catch (error) {
    console.error("Error obteniendo habilidades del usuario:", error);
    return { success: false, error: "Error al cargar tus habilidades" };
  }
}

// Agregar habilidad al perfil
export async function addSkillToProfile(data: {
  skillId: string;
  level: SkillLevel;
  yearsOfExp?: number;
  verified?: boolean;
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

    // Verificar si ya existe
    const existing = await db.citizenSkill.findUnique({
      where: {
        citizenId_skillId: {
          citizenId: citizenProfile.id,
          skillId: data.skillId,
        },
      },
    });

    if (existing) {
      return { success: false, error: "Ya tienes esta habilidad agregada" };
    }

    await db.citizenSkill.create({
      data: {
        citizenId: citizenProfile.id,
        skillId: data.skillId,
        level: data.level,
        yearsOfExp: data.yearsOfExp || 0,
        verified: data.verified || false,
      },
    });

    revalidatePath("/profile/skills");
    return { success: true };
  } catch (error) {
    console.error("Error agregando habilidad:", error);
    return { success: false, error: "Error al agregar habilidad" };
  }
}

// Actualizar habilidad
export async function updateSkill(data: {
  id: string;
  level: SkillLevel;
  yearsOfExp?: number;
  verified?: boolean;
}) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== UserRole.CITIZEN) {
      return { success: false, error: "No autorizado" };
    }

    await db.citizenSkill.update({
      where: { id: data.id },
      data: {
        level: data.level,
        yearsOfExp: data.yearsOfExp,
        verified: data.verified,
      },
    });

    revalidatePath("/profile/skills");
    return { success: true };
  } catch (error) {
    console.error("Error actualizando habilidad:", error);
    return { success: false, error: "Error al actualizar habilidad" };
  }
}

// Eliminar habilidad
export async function removeSkill(skillId: string) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== UserRole.CITIZEN) {
      return { success: false, error: "No autorizado" };
    }

    await db.citizenSkill.delete({
      where: { id: skillId },
    });

    revalidatePath("/profile/skills");
    return { success: true };
  } catch (error) {
    console.error("Error eliminando habilidad:", error);
    return { success: false, error: "Error al eliminar habilidad" };
  }
}
