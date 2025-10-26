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

// ✨ NUEVO: Crear una habilidad
export async function POST(request: Request) {
  try {
    const { name, category, description } = await request.json();

    // Validar que no exista ya
    const existingSkill = await db.skill.findUnique({
      where: { name },
    });

    if (existingSkill) {
      return corsResponse(
        { success: false, error: 'Esta habilidad ya existe' },
        400
      );
    }

    // Crear la habilidad
    const newSkill = await db.skill.create({
      data: {
        name,
        category: category || 'TECHNICAL',
        description: description || null,
      },
    });

    return corsResponse({
      success: true,
      skill: newSkill,
    }, 201);
  } catch (error) {
    console.error('Error creating skill:', error);
    return corsResponse(
      { success: false, error: 'Error al crear habilidad' },
      500
    );
  }
}
