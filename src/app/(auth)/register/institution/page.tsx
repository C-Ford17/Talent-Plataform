"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { institutionRegisterSchema, type InstitutionRegisterInput } from "@/features/auth/schemas/register.schema";
import { registerInstitution } from "@/features/auth/actions/register.actions";
import { UserRole } from "@prisma/client";

export default function InstitutionRegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InstitutionRegisterInput>({
    resolver: zodResolver(institutionRegisterSchema),
    defaultValues: {
      role: UserRole.INSTITUTION,
    },
  });

  const onSubmit = async (data: InstitutionRegisterInput) => {
    setIsLoading(true);
    setServerError("");

    try {
      const result = await registerInstitution(data);

      if (result.success) {
        router.push("/login?registered=true");
      } else {
        setServerError(result.error || "Error al registrar");
      }
    } catch (error) {
      setServerError("Error inesperado. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const institutionTypes = [
    { value: "Universidad", label: "Universidad" },
    { value: "Instituto técnico", label: "Instituto técnico" },
    { value: "Centro de capacitación", label: "Centro de capacitación" },
    { value: "Otro", label: "Otro" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registro de Institución Educativa
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Crea tu perfil para ofrecer programas de formación
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow">
          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {serverError}
            </div>
          )}

          <Input
            label="Nombre de la Institución *"
            type="text"
            {...register("institutionName")}
            error={errors.institutionName?.message}
            disabled={isLoading}
          />

          <Select
            label="Tipo de Institución *"
            {...register("institutionType")}
            error={errors.institutionType?.message}
            disabled={isLoading}
            options={institutionTypes}
          />

          <Input
            label="Email Institucional *"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            disabled={isLoading}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Teléfono"
              type="tel"
              {...register("phone")}
              error={errors.phone?.message}
              disabled={isLoading}
              placeholder="Opcional"
            />

            <Input
              label="Sitio Web"
              type="url"
              {...register("website")}
              error={errors.website?.message}
              disabled={isLoading}
              placeholder="https://ejemplo.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Ciudad *"
              type="text"
              {...register("city")}
              error={errors.city?.message}
              disabled={isLoading}
            />

            <Input
            label="Departamento *"
            type="text"
            {...register("department")}
            error={errors.department?.message}
            disabled={isLoading}
            />
          </div>

          <Textarea
            label="Descripción de la Institución"
            {...register("description")}
            error={errors.description?.message}
            disabled={isLoading}
            placeholder="Cuéntanos sobre tu institución y programas..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Contraseña *"
              type="password"
              {...register("password")}
              error={errors.password?.message}
              disabled={isLoading}
            />

            <Input
              label="Confirmar Contraseña *"
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registrando..." : "Crear Cuenta"}
          </button>

          <div className="text-center">
            <Link href="/login" className="text-sm text-blue-600 hover:text-blue-500">
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
