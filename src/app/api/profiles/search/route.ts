import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { corsResponse, corsOptionsResponse } from '@/lib/cors';

export async function OPTIONS() {
  return corsOptionsResponse();
}

/**
 * @swagger
 * /api/profiles/search:
 *   get:
 *     summary: Buscar perfiles de ciudadanos por habilidad, ciudad, etc.
 *     tags: [Profiles]
 *     parameters:
 *       - in: query
 *         name: skill
 *         schema:
 *           type: string
 *         description: Buscar por nombre de habilidad
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Buscar por ciudad
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Buscar por departamento
 *     responses:
 *       200:
 *         description: Resultados de búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 profiles:
 *                   type: array
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const skillName = searchParams.get("skill");
    const city = searchParams.get("city");
    const department = searchParams.get("department");

    const profiles = await db.citizenProfile.findMany({
      where: {
        ...(city && { city: { contains: city, mode: "insensitive" } }),
        ...(department && { department: { contains: department, mode: "insensitive" } }),
        ...(skillName && {
          skills: {
            some: {
              skill: {
                name: {
                  contains: skillName,
                  mode: "insensitive",
                },
              },
            },
          },
        }),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        skills: {
          include: {
            skill: true,
          },
        },
      },
      take: 50,
    });

    return corsResponse({
      success: true,
      profiles,
      count: profiles.length
    });
  } catch (error) {
    return corsResponse(
      { success: false, error: 'Error al buscar perfiles' },
      500
    );
  }
}
