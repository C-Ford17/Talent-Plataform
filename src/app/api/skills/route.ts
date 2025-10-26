import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

import { corsResponse, corsOptionsResponse } from '@/lib/cors';

export async function OPTIONS() {
  return corsOptionsResponse();
}
/**
 * @swagger
 * /api/skills:
 *   get:
 *     summary: Obtener todas las habilidades disponibles
 *     tags: [Skills]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [TECHNICAL, SOFT_SKILLS, LANGUAGE, TOOLS, INDUSTRY]
 *         description: Filtrar por categoría
 *     responses:
 *       200:
 *         description: Lista de habilidades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 skills:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Skill'
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");

    const skills = await db.skill.findMany({
      where: category ? { category: category as any } : {},
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });

    return corsResponse({
      success: true,
      skills,
      count: skills.length
    });
  } catch (error) {
    return corsResponse(
      { success: false, error: 'Error al obtener habilidades' },
      500
    );
  }
}
