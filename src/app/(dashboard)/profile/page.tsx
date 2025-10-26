import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logoutUser } from "@/features/auth/actions/logout.actions";
import { db } from "@/lib/db";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Obtener datos según el rol
  let citizenData = null;
  let companyData = null;
  let institutionData = null;

  if (session.user.role === "CITIZEN") {
    citizenData = await db.citizenProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
        education: true,
        experience: true,
      },
    });
  } else if (session.user.role === "COMPANY") {
    companyData = await db.companyProfile.findUnique({
      where: { userId: session.user.id },
    });
  } else if (session.user.role === "INSTITUTION") {
    institutionData = await db.institutionProfile.findUnique({
      where: { userId: session.user.id },
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl shadow-lg p-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              ¡Bienvenido, {session.user.name || session.user.email?.split('@')[0]}!
            </h1>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white">
                {session.user.role === "CITIZEN" && "👤 Ciudadano"}
                {session.user.role === "COMPANY" && "🏢 Empresa"}
                {session.user.role === "INSTITUTION" && "🎓 Institución"}
              </span>
              <span className="text-blue-100 text-sm">
                {session.user.email}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-b-xl shadow-lg p-6 mb-6">
          {/* CIUDADANO */}
          {session.user.role === "CITIZEN" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Información Personal
              </h2>
              {citizenData ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(citizenData.firstName || citizenData.lastName) && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">Nombre:</span>
                        <p className="text-gray-900 font-medium">
                          {citizenData.firstName} {citizenData.lastName}
                        </p>
                      </div>
                    )}
                    {citizenData.phone && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">Teléfono:</span>
                        <p className="text-gray-900 font-medium">{citizenData.phone}</p>
                      </div>
                    )}
                    {/* Después de ubicación */}
                    {citizenData.gender && (
                    <div>
                        <span className="text-sm font-medium text-gray-500">Género:</span>
                        <p className="text-gray-900 font-medium">
                        {citizenData.gender === 'MALE' ? 'Masculino' : 
                        citizenData.gender === 'FEMALE' ? 'Femenino' : 
                        'Otro'}
                        </p>
                    </div>
                    )}
                    {citizenData.zoneType && (
                    <div>
                        <span className="text-sm font-medium text-gray-500">Zona:</span>
                        <p className="text-gray-900 font-medium">
                        {citizenData.zoneType === 'URBAN' ? 'Urbana' : 'Rural'}
                        </p>
                    </div>
                    )}
                    {citizenData.city && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">Ubicación:</span>
                        <p className="text-gray-900 font-medium">
                          {citizenData.city}, {citizenData.department}
                        </p>
                      </div>
                    )}
                    {citizenData.dateOfBirth && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">Fecha de Nacimiento:</span>
                        <p className="text-gray-900 font-medium">
                          {new Date(citizenData.dateOfBirth).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>

                  {citizenData.bio && (
                    <div className="mt-4">
                      <span className="text-sm font-medium text-gray-500">Acerca de mí:</span>
                      <p className="text-gray-900 mt-1">{citizenData.bio}</p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-blue-600">
                        {citizenData.skills?.length || 0}
                      </p>
                      <p className="text-sm text-gray-600">Habilidades</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">
                        {citizenData.education?.length || 0}
                      </p>
                      <p className="text-sm text-gray-600">Educación</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-purple-600">
                        {citizenData.experience?.length || 0}
                      </p>
                      <p className="text-sm text-gray-600">Experiencias</p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-600">
                  Aún no has completado tu perfil. Usa las opciones abajo para agregar información.
                </p>
              )}
            </div>
          )}

          {/* EMPRESA */}
          {session.user.role === "COMPANY" && companyData && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Información de la Empresa
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Empresa:</span>
                  <p className="text-gray-900 font-medium">{companyData.companyName}</p>
                </div>
                {companyData.industry && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Industria:</span>
                    <p className="text-gray-900 font-medium">{companyData.industry}</p>
                  </div>
                )}
                {companyData.size && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Tamaño:</span>
                    <p className="text-gray-900 font-medium">{companyData.size} empleados</p>
                  </div>
                )}
                {companyData.website && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Sitio Web:</span>
                    <a
                      href={companyData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {companyData.website}
                    </a>
                  </div>
                )}
              </div>
              {companyData.description && (
                <div className="mt-4">
                  <span className="text-sm font-medium text-gray-500">Descripción:</span>
                  <p className="text-gray-900 mt-1">{companyData.description}</p>
                </div>
              )}
            </div>
          )}

          {/* INSTITUCIÓN */}
          {session.user.role === "INSTITUTION" && institutionData && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Información de la Institución
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Institución:</span>
                  <p className="text-gray-900 font-medium">{institutionData.institutionName}</p>
                </div>
                {institutionData.institutionType && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Tipo:</span>
                    <p className="text-gray-900 font-medium">{institutionData.institutionType}</p>
                  </div>
                )}
                {institutionData.website && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Sitio Web:</span>
                    <a
                      href={institutionData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {institutionData.website}
                    </a>
                  </div>
                )}
              </div>
              {institutionData.description && (
                <div className="mt-4">
                  <span className="text-sm font-medium text-gray-500">Descripción:</span>
                  <p className="text-gray-900 mt-1">{institutionData.description}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Gestión de Perfil (Solo Ciudadanos) */}
        {session.user.role === "CITIZEN" && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Gestiona tu Perfil Profesional
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/profile/skills"
                className="group block p-6 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600">
                  Habilidades
                </h3>
                <p className="text-sm text-gray-600">
                  Gestiona tus competencias y nivel de experiencia
                </p>
              </Link>

              <Link
                href="/profile/education"
                className="group block p-6 border-2 border-green-200 rounded-lg hover:border-green-400 hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-3">🎓</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-green-600">
                  Educación
                </h3>
                <p className="text-sm text-gray-600">
                  Agrega tu formación académica y certificaciones
                </p>
              </Link>

              <Link
                href="/profile/experience"
                className="group block p-6 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-3">💼</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-purple-600">
                  Experiencia
                </h3>
                <p className="text-sm text-gray-600">
                  Registra tu trayectoria laboral profesional
                </p>
              </Link>
            </div>
          </div>
        )}

        {/* Logout */}
        <div className="flex justify-end">
          <form action={logoutUser}>
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors shadow-md hover:shadow-lg"
            >
              Cerrar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
