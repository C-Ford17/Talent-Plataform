"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EducationLevel } from "@prisma/client";
import { getUserEducation, addEducation, removeEducation } from "@/features/profile/actions/education.actions";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Education {
  id: string;
  level: EducationLevel;
  institution: string;
  fieldOfStudy: string;
  degree: string | null;
  startDate: Date;
  endDate: Date | null;
  current: boolean;
  description: string | null;
}

export default function EducationPage() {
  const router = useRouter();
  const [education, setEducation] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    level: "UNIVERSITY" as EducationLevel,
    institution: "",
    fieldOfStudy: "",
    degree: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });
  const [error, setError] = useState("");

  const loadEducation = async () => {
    setIsLoading(true);
    const result = await getUserEducation();
    if (result.success && result.education) {
      setEducation(result.education as Education[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadEducation();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.institution || !formData.fieldOfStudy || !formData.startDate) {
      setError("Completa los campos requeridos");
      return;
    }

    const result = await addEducation({
      level: formData.level,
      institution: formData.institution,
      fieldOfStudy: formData.fieldOfStudy,
      degree: formData.degree || undefined,
      startDate: new Date(formData.startDate),
      endDate: formData.endDate ? new Date(formData.endDate) : undefined,
      current: formData.current,
      description: formData.description || undefined,
    });

    if (result.success) {
      setIsModalOpen(false);
      setFormData({
        level: EducationLevel.UNIVERSITY,
        institution: "",
        fieldOfStudy: "",
        degree: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      });
      loadEducation();
    } else {
      setError(result.error || "Error al agregar");
    }
  };

  const handleRemove = async (id: string) => {
    if (!confirm("¿Eliminar esta educación?")) return;
    const result = await removeEducation(id);
    if (result.success) loadEducation();
  };

  const getLevelLabel = (level: EducationLevel) => {
    const labels = {
      PRIMARY: "Primaria",
      SECONDARY: "Secundaria",
      TECHNICAL: "Técnico",
      UNIVERSITY: "Universidad",
      POSTGRADUATE: "Posgrado",
      DOCTORATE: "Doctorado",
    };
    return labels[level];
  };

  const educationLevels = [
    { value: EducationLevel.PRIMARY, label: "Primaria" },
    { value: EducationLevel.SECONDARY, label: "Secundaria" },
    { value: EducationLevel.TECHNICAL, label: "Técnico" },
    { value: EducationLevel.UNIVERSITY, label: "Universidad" },
    { value: EducationLevel.POSTGRADUATE, label: "Posgrado" },
    { value: EducationLevel.DOCTORATE, label: "Doctorado" },
  ];

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 py-12 px-4"><p className="text-center text-gray-900">Cargando...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mi Educación</h1>
              <p className="text-gray-600 mt-1">Gestiona tu formación académica</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              + Agregar Educación
            </button>
          </div>

          {education.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">No tienes educación registrada</p>
            </div>
          ) : (
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                          {getLevelLabel(edu.level)}
                        </span>
                        {edu.current && (
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                            En curso
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{edu.institution}</h3>
                      <p className="text-gray-700">{edu.fieldOfStudy}</p>
                      {edu.degree && <p className="text-gray-600 text-sm">{edu.degree}</p>}
                      <p className="text-gray-500 text-sm mt-2">
                        {new Date(edu.startDate).getFullYear()} -{" "}
                        {edu.current ? "Presente" : edu.endDate ? new Date(edu.endDate).getFullYear() : ""}
                      </p>
                      {edu.description && <p className="text-gray-600 text-sm mt-2">{edu.description}</p>}
                    </div>
                    <button onClick={() => handleRemove(edu.id)} className="text-red-600 hover:text-red-800 text-sm ml-4">
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 pt-6 border-t">
            <button onClick={() => router.push("/profile")} className="text-blue-600 hover:text-blue-800">
              ← Volver al perfil
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Agregar Educación</h3>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Select
                label="Nivel Educativo *"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value as EducationLevel })}
                options={educationLevels}
              />

              <Input
                label="Institución *"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="Ej: Universidad Nacional"
              />

              <Input
                label="Campo de Estudio *"
                value={formData.fieldOfStudy}
                onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                placeholder="Ej: Ingeniería de Sistemas"
              />

              <Input
                label="Título/Grado"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                placeholder="Ej: Ingeniero, Licenciado"
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
                <label className="text-sm text-gray-900">Actualmente estudiando aquí</label>
              </div>

              <Textarea
                label="Descripción"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Actividades, logros, proyectos destacados..."
              />

              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
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
