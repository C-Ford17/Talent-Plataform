"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserExperience, addExperience, removeExperience } from "@/features/profile/actions/experience.actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  current: boolean;
  description: string | null;
}

export default function ExperiencePage() {
  const router = useRouter();
  const [experience, setExperience] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });
  const [error, setError] = useState("");

  const loadExperience = async () => {
    setIsLoading(true);
    const result = await getUserExperience();
    if (result.success && result.experience) {
      setExperience(result.experience as Experience[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadExperience();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.company || !formData.position || !formData.startDate) {
      setError("Completa los campos requeridos");
      return;
    }

    const result = await addExperience({
      company: formData.company,
      position: formData.position,
      startDate: new Date(formData.startDate),
      endDate: formData.endDate ? new Date(formData.endDate) : undefined,
      current: formData.current,
      description: formData.description || undefined,
    });

    if (result.success) {
      setIsModalOpen(false);
      setFormData({
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      });
      loadExperience();
    } else {
      setError(result.error || "Error al agregar");
    }
  };

  const handleRemove = async (id: string) => {
    if (!confirm("¿Eliminar esta experiencia?")) return;
    const result = await removeExperience(id);
    if (result.success) loadExperience();
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
    });
  };

  const calculateDuration = (start: Date, end: Date | null) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                   (endDate.getMonth() - startDate.getMonth());
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${remainingMonths} ${remainingMonths === 1 ? "mes" : "meses"}`;
    } else if (remainingMonths === 0) {
      return `${years} ${years === 1 ? "año" : "años"}`;
    } else {
      return `${years} ${years === 1 ? "año" : "años"} y ${remainingMonths} ${remainingMonths === 1 ? "mes" : "meses"}`;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <p className="text-center text-gray-900">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mi Experiencia Laboral</h1>
              <p className="text-gray-600 mt-1">Gestiona tu trayectoria profesional</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              + Agregar Experiencia
            </button>
          </div>

          {experience.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">No tienes experiencia registrada</p>
              <p className="text-sm">Comienza agregando tu trayectoria laboral</p>
            </div>
          ) : (
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                        {exp.current && (
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                            Actual
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-700 font-medium">{exp.company}</p>
                      
                      <p className="text-gray-500 text-sm mt-1">
                        {formatDate(exp.startDate)} - {exp.current ? "Presente" : formatDate(exp.endDate!)}
                        <span className="ml-2 text-gray-400">
                          ({calculateDuration(exp.startDate, exp.endDate)})
                        </span>
                      </p>
                      
                      {exp.description && (
                        <p className="text-gray-600 text-sm mt-3 whitespace-pre-line">
                          {exp.description}
                        </p>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleRemove(exp.id)}
                      className="text-red-600 hover:text-red-800 text-sm ml-4"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 pt-6 border-t">
            <button
              onClick={() => router.push("/profile")}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Volver al perfil
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Agregar Experiencia Laboral</h3>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Cargo/Posición *"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder="Ej: Desarrollador Full Stack"
              />

              <Input
                label="Empresa *"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Ej: Tech Solutions S.A."
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Fecha de Inicio *"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />

                {!formData.current && (
                  <Input
                    label="Fecha de Fin"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.current}
                  onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: "" })}
                  className="mr-2"
                />
                <label className="text-sm text-gray-900">Trabajo actualmente aquí</label>
              </div>

              <Textarea
                label="Descripción de Responsabilidades"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe tus responsabilidades, logros y proyectos principales..."
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Agregar
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
