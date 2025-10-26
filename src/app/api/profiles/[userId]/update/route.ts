import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await auth();
    const { userId } = await params; // ✅ Await params (Next.js 15)
    
    if (!session || session.user.id !== userId) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { bio, address, phone, jobStatus } = body;

    // Construir el objeto de actualización solo con campos definidos
    const updateData: any = {};
    
    if (bio !== undefined) updateData.bio = bio;
    if (address !== undefined) updateData.address = address;
    if (phone !== undefined) updateData.phone = phone;
    if (jobStatus !== undefined) updateData.jobStatus = jobStatus;

    const updatedProfile = await db.citizenProfile.update({
      where: { userId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      profile: updatedProfile,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { success: false, error: 'Error al actualizar perfil' },
      { status: 500 }
    );
  }
}
