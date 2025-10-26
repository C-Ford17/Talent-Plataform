import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Talento Local
              </span>
            </div>
            <div className="flex items-center gap-6">
              {/* Link a API Docs */}
              <Link
                href="/api-docs"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                📚 API Docs
              </Link>
              
              {/* ✅ Mostrar botones según estado de autenticación */}
              {session ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {session.user.name || session.user.email}
                  </span>
                  <Link
                    href="/profile"
                    className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Mi Perfil
                  </Link>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-md"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Conecta el{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Talento
            </span>{" "}
            con las{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Oportunidades
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Plataforma integral que conecta ciudadanos, empresas e instituciones educativas
            para impulsar el desarrollo profesional y cerrar la brecha de talento.
          </p>
          <div className="flex gap-4 justify-center">
            {session ? (
              <Link
                href="/profile"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Ir a Mi Perfil
              </Link>
            ) : (
              <>
                <Link
                  href="/register"
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Comenzar Ahora
                </Link>
                <Link
                  href="#features"
                  className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-semibold text-lg transition-all"
                >
                  Conocer Más
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">👤</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Ciudadanos</h3>
              <p className="text-gray-600">
                Crea tu perfil profesional completo con habilidades, educación y experiencia
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">🏢</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Empresas</h3>
              <p className="text-gray-600">
                Encuentra el talento ideal para tus vacantes con búsqueda especializada
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-pink-600 mb-2">🎓</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Instituciones</h3>
              <p className="text-gray-600">
                Ofrece programas de formación alineados con las necesidades del mercado
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Funcionalidades Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Gestión de Habilidades</h3>
              <p className="text-gray-600">
                Sistema estandarizado de competencias con niveles de dominio y años de experiencia
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Análisis de Brechas</h3>
              <p className="text-gray-600">
                Identifica las habilidades más demandadas vs. disponibles en tu región
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Búsqueda Inteligente</h3>
              <p className="text-gray-600">
                Encuentra candidatos por habilidades, ubicación, experiencia y más
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">CV Digital</h3>
              <p className="text-gray-600">
                Perfil profesional completo con educación, experiencia y certificaciones
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Matching Inteligente</h3>
              <p className="text-gray-600">
                Algoritmo que conecta automáticamente talento con oportunidades
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Seguridad Total</h3>
              <p className="text-gray-600">
                Autenticación robusta y protección de datos personales y profesionales
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {session ? "Completa tu perfil profesional" : "¿Listo para potenciar tu carrera?"}
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            {session
              ? "Agrega tus habilidades, educación y experiencia para destacar"
              : "Únete a Talento Local y da el siguiente paso en tu desarrollo profesional"}
          </p>
          <Link
            href={session ? "/profile" : "/register"}
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold text-lg transition-all shadow-xl transform hover:-translate-y-1"
          >
            {session ? "Ir a Mi Perfil" : "Crear Cuenta Gratuita"}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Talento Local</h3>
              <p className="text-sm">
                Plataforma de gestión de talento y oportunidades laborales para el desarrollo local.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/register" className="hover:text-white transition-colors">Registrarse</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Iniciar Sesión</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Proyecto Académico</h3>
              <p className="text-sm">
                Desarrollado como parte del módulo de Registro de Usuarios, Perfiles y Habilidades.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 Talento Local. Proyecto Académico.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
