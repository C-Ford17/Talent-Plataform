"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SkillLevel, SkillCategory } from "@prisma/client";
import { getAllSkills, getUserSkills, removeSkill } from "@/features/skills/actions/skills.actions";
import { AddSkillModal } from "@/features/skills/components/AddSkillModal";

interface UserSkill {
  id: string;
  level: SkillLevel;
  yearsOfExp: number | null;
  verified: boolean;
  skill: {
    id: string;
    name: string;
    category: SkillCategory;
    description: string | null;
  };
}

// ✨ Componente para crear habilidades (movido al inicio)
function CreateSkillForm({ onSkillCreated }: { onSkillCreated: () => void }) {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "TECHNICAL",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert('¡Habilidad creada exitosamente!');
        setFormData({ name: "", category: "TECHNICAL", description: "" });
        setShowForm(false);
        onSkillCreated();
      } else {
        alert(data.error || 'Error al crear habilidad');
      }
    } catch (error) {
      alert('Error al crear habilidad');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
        >
          ➕ Crear Nueva Habilidad
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Crear Nueva Habilidad
            </h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Nombre de la Habilidad *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                placeholder="Ej: Python Avanzado"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Categoría *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
              >
                <option value="TECHNICAL">Técnica</option>
                <option value="SOFT_SKILLS">Habilidad Blanda</option>
                <option value="LANGUAGE">Idioma</option>
                <option value="TOOLS">Herramientas</option>
                <option value="INDUSTRY">Industria</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Descripción (opcional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                placeholder="Describe brevemente esta habilidad..."
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-medium"
              >
                {loading ? 'Creando...' : 'Crear Habilidad'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ✨ Componente principal
export default function SkillsPage() {
  const router = useRouter();
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [availableSkills, setAvailableSkills] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    
    const [skillsResult, userSkillsResult] = await Promise.all([
      getAllSkills(),
      getUserSkills(),
    ]);

    if (skillsResult.success && skillsResult.skills) {
      const userSkillIds = userSkillsResult.success && userSkillsResult.skills 
        ? userSkillsResult.skills.map((us: any) => us.skill.id)
        : [];
      
      const available = skillsResult.skills.filter(
        (s) => !userSkillIds.includes(s.id)
      );
      setAvailableSkills(available);
    }

    if (userSkillsResult.success && userSkillsResult.skills) {
      setUserSkills(userSkillsResult.skills as UserSkill[]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRemove = async (skillId: string) => {
    if (!confirm("¿Estás seguro de eliminar esta habilidad?")) return;

    const result = await removeSkill(skillId);
    if (result.success) {
      loadData();
    }
  };

  const getLevelLabel = (level: SkillLevel) => {
    const labels = {
      BEGINNER: "Principiante",
      INTERMEDIATE: "Intermedio",
      ADVANCED: "Avanzado",
      EXPERT: "Experto",
    };
    return labels[level];
  };

  const getLevelColor = (level: SkillLevel) => {
    const colors = {
      BEGINNER: "bg-gray-200 text-gray-800",
      INTERMEDIATE: "bg-blue-200 text-blue-800",
      ADVANCED: "bg-green-200 text-green-800",
      EXPERT: "bg-purple-200 text-purple-800",
    };
    return colors[level];
  };

  const getCategoryLabel = (category: SkillCategory) => {
    const labels = {
      TECHNICAL: "Técnica",
      SOFT_SKILLS: "Soft Skill",
      LANGUAGE: "Idioma",
      TOOLS: "Herramienta",
      INDUSTRY: "Industria",
    };
    return labels[category];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* ✨ Botón de crear nueva habilidad */}
        <CreateSkillForm onSkillCreated={loadData} />

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mis Habilidades</h1>
              <p className="text-gray-600 mt-1">
                Gestiona tus competencias y nivel de experiencia
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
            >
              + Agregar Habilidad
            </button>
          </div>

          {userSkills.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">No tienes habilidades agregadas</p>
              <p className="text-sm">Comienza agregando tus competencias profesionales</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userSkills.map((userSkill) => (
                <div
                  key={userSkill.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {userSkill.skill.name}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          {getCategoryLabel(userSkill.skill.category)}
                        </span>
                        {userSkill.verified && (
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                            ✓ Verificada
                          </span>
                        )}
                      </div>
                      
                      {userSkill.skill.description && (
                        <p className="text-sm text-gray-600 mb-3">
                          {userSkill.skill.description}
                        </p>
                      )}

                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Nivel: </span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(
                              userSkill.level
                            )}`}
                          >
                            {getLevelLabel(userSkill.level)}
                          </span>
                        </div>
                        {userSkill.yearsOfExp !== null && userSkill.yearsOfExp > 0 && (
                          <div>
                            <span className="text-gray-600">Experiencia: </span>
                            <span className="font-medium text-gray-900">
                              {userSkill.yearsOfExp} {userSkill.yearsOfExp === 1 ? "año" : "años"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemove(userSkill.id)}
                      className="text-red-600 hover:text-red-800 text-sm ml-4 font-medium"
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
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Volver al perfil
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddSkillModal
          availableSkills={availableSkills}
          onClose={() => setIsModalOpen(false)}
          onSuccess={loadData}
        />
      )}
    </div>
  );
}
