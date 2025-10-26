"use client";

import { useState } from "react";
import { UserRole } from "@prisma/client";
import Link from "next/link";

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crea tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Selecciona el tipo de cuenta que deseas crear
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {/* Botón Ciudadano */}
          <button
            onClick={() => setSelectedRole(UserRole.CITIZEN)}
            className={`w-full flex flex-col items-center p-6 border-2 rounded-lg transition-all ${
              selectedRole === UserRole.CITIZEN
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-300"
            }`}
          >
            <div className="text-4xl mb-2">👤</div>
            <h3 className="text-lg font-semibold">Ciudadano</h3>
            <p className="text-sm text-gray-600 text-center mt-1">
              Busco empleo o formación profesional
            </p>
          </button>

          {/* Botón Empresa */}
          <button
            onClick={() => setSelectedRole(UserRole.COMPANY)}
            className={`w-full flex flex-col items-center p-6 border-2 rounded-lg transition-all ${
              selectedRole === UserRole.COMPANY
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-300"
            }`}
          >
            <div className="text-4xl mb-2">🏢</div>
            <h3 className="text-lg font-semibold">Empresa</h3>
            <p className="text-sm text-gray-600 text-center mt-1">
              Ofrezco oportunidades laborales
            </p>
          </button>

          {/* Botón Institución */}
          <button
            onClick={() => setSelectedRole(UserRole.INSTITUTION)}
            className={`w-full flex flex-col items-center p-6 border-2 rounded-lg transition-all ${
              selectedRole === UserRole.INSTITUTION
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-300"
            }`}
          >
            <div className="text-4xl mb-2">🎓</div>
            <h3 className="text-lg font-semibold">Institución Educativa</h3>
            <p className="text-sm text-gray-600 text-center mt-1">
              Ofrezco programas de formación
            </p>
          </button>
        </div>

        {selectedRole && (
          <div className="mt-6">
            <Link
              href={`/register/${selectedRole.toLowerCase()}`}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continuar
            </Link>
          </div>
        )}

        <div className="text-center">
          <Link href="/login" className="text-sm text-blue-600 hover:text-blue-500">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
