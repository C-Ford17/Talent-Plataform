import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/profiles/{userId}:
 *   get:
 *     summary: Obtener perfil completo de un ciudadano
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Perfil completo del ciudadano
 *       404:
 *         description: Perfil no encontrado
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    // Await params en Next.js 15
    const { userId } = await context.params;

    const citizenProfile = await db.citizenProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
        skills: {
          include: {
            skill: true,
          },
        },
        education: {
          orderBy: {
            startDate: "desc",
          },
        },
        experience: {
          orderBy: {
            startDate: "desc",
          },
        },
        certifications: true,
      },
    });

    if (!citizenProfile) {
      return NextResponse.json(
        { success: false, error: "Perfil no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      profile: citizenProfile,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al obtener perfil" },
      { status: 500 }
    );
  }
}
