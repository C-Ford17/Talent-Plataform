import { db } from "@/lib/db";
import { count } from "console";
import { NextRequest, NextResponse } from "next/server";
import { corsResponse, corsOptionsResponse } from '@/lib/cors';

export async function OPTIONS() {
  return corsOptionsResponse();
}

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [CITIZEN, COMPANY, INSTITUTION]
 *         description: Filtrar por rol
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get("role");

    const users = await db.user.findMany({
      where: role ? { role: role as any } : {},
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return corsResponse({
      success: true,
      users,
      count: users.length
    });
  } catch (error) {
    return corsResponse(
      { success: false, error: 'Error al obtener usuarios' },
      500
    );
  }
}
