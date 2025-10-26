"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { citizenRegisterSchema, type CitizenRegisterInput } from "@/features/auth/schemas/register.schema";
import { registerCitizen } from "@/features/auth/actions/register.actions";
import { UserRole } from "@prisma/client";

export default function CitizenRegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CitizenRegisterInput>({
    resolver: zodResolver(citizenRegisterSchema),
    defaultValues: {
      role: UserRole.CITIZEN,
    },
  });

  const onSubmit = async (data: CitizenRegisterInput) => {
    setIsLoading(true);
    setServerError("");

    try {
      const result = await registerCitizen(data);

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registro de Ciudadano
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Crea tu perfil para buscar empleo o formación
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow">
          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {serverError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nombre *"
              type="text"
              {...register("firstName")}
              error={errors.firstName?.message}
              disabled={isLoading}
            />

            <Input
              label="Apellido *"
              type="text"
              {...register("lastName")}
              error={errors.lastName?.message}
              disabled={isLoading}
            />
          </div>

          <Input
            label="Email *"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            disabled={isLoading}
          />

          <Input
            label="Teléfono"
            type="tel"
            {...register("phone")}
            error={errors.phone?.message}
            disabled={isLoading}
            placeholder="Opcional"
          />
          <Input
            label="Fecha de Nacimiento"
            type="date"
            {...register("dateOfBirth")}
            error={errors.dateOfBirth?.message}
            disabled={isLoading}
            placeholder="Opcional"
            />

            <Select
            label="Género"
            {...register("gender")}
            error={errors.gender?.message}
            disabled={isLoading}
            options={[
                { value: "MALE", label: "Masculino" },
                { value: "FEMALE", label: "Femenino" },
                { value: "OTHER", label: "Otro" },
                { value: "PREFER_NOT_SAY", label: "Prefiero no decir" },
            ]}
            />

          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Ciudad *"
              type="text"
              {...register("city")}
              error={errors.city?.message}
              disabled={isLoading}
            />

            // Cambia todos los campos "province" por "department"
            <Input
            label="Departamento *"
            type="text"
            {...register("department")}
            error={errors.department?.message}
            disabled={isLoading}
            />
            <Select
            label="Tipo de Zona"
            {...register("zoneType")}
            error={errors.zoneType?.message}
            disabled={isLoading}
            options={[
                { value: "", label: "Seleccionar..." },
                { value: "URBAN", label: "Urbana" },
                { value: "RURAL", label: "Rural" },
            ]}
            />
          </div>
          

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

          <div className="text-xs text-gray-500">
            * La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula y un número
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
