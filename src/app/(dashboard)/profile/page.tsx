import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { logoutUser } from "@/features/auth/actions/logout.actions";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Bienvenido, {session.user.name || session.user.email}
          </h1>
          
          <div className="space-y-4 text-gray-900">
            <div>
              <span className="font-semibold">Email:</span> {session.user.email}
            </div>
            <div>
              <span className="font-semibold">Rol:</span> {session.user.role}
            </div>
            <div>
              <span className="font-semibold">ID:</span> {session.user.id}
            </div>
          </div>

          {session.user.role === "CITIZEN" && (
            <div className="mt-6 pt-6 border-t">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Gestión de Perfil</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/profile/skills"
                  className="block p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 transition-colors"
                >
                  <h3 className="font-semibold text-lg text-gray-900">🎯 Habilidades</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Gestiona tus competencias y experiencia
                  </p>
                </Link>
                
                <Link
                  href="/profile/education"
                  className="block p-4 border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors"
                >
                  <h3 className="font-semibold text-lg text-gray-900">🎓 Educación</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Agrega tu formación académica
                  </p>
                </Link>
                
                <Link
                  href="/profile/experience"
                  className="block p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 transition-colors"
                >
                  <h3 className="font-semibold text-lg text-gray-900">💼 Experiencia</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Registra tu trayectoria laboral
                  </p>
                </Link>
              </div>
            </div>
          )}

          <div className="mt-6">
            <form action={logoutUser}>
                <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                Cerrar Sesión
                </button>
            </form>
            </div>
        </div>
      </div>
    </div>
  );
}
