import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import EditProfileForm from "@/components/profile/EditProfileForm";
import Link from "next/link";

export default async function EditProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const citizenProfile = await db.citizenProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!citizenProfile) {
    redirect("/profile");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Editar Perfil
          </h1>
          <Link
            href="/profile"
            className="text-gray-600 hover:text-gray-900"
          >
            ← Volver al perfil
          </Link>
        </div>
        <EditProfileForm profile={citizenProfile} />
      </div>
    </div>
  );
}
