"use client";

import { useState } from "react";
import { SkillLevel } from "@prisma/client";
import { addSkillToProfile } from "../actions/skills.actions";

interface AddSkillModalProps {
  availableSkills: Array<{
    id: string;
    name: string;
    category: string;
  }>;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddSkillModal({ availableSkills, onClose, onSuccess }: AddSkillModalProps) {
  const [selectedSkillId, setSelectedSkillId] = useState("");
  const [level, setLevel] = useState<SkillLevel>(SkillLevel.BEGINNER);
  const [yearsOfExp, setYearsOfExp] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSkillId) {
      setError("Selecciona una habilidad");
      return;
    }

    setIsLoading(true);
    setError("");

    const result = await addSkillToProfile({
      skillId: selectedSkillId,
      level,
      yearsOfExp,
    });

    setIsLoading(false);

    if (result.success) {
      onSuccess();
      onClose();
    } else {
      setError(result.error || "Error al agregar habilidad");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4">Agregar Habilidad</h3>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Habilidad *
            </label>
            <select
              value={selectedSkillId}
              onChange={(e) => setSelectedSkillId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              disabled={isLoading}
            >
              <option value="">Seleccionar...</option>
              {availableSkills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name} ({skill.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nivel de Dominio *
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as SkillLevel)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              disabled={isLoading}
            >
              <option value={SkillLevel.BEGINNER}>Principiante</option>
              <option value={SkillLevel.INTERMEDIATE}>Intermedio</option>
              <option value={SkillLevel.ADVANCED}>Avanzado</option>
              <option value={SkillLevel.EXPERT}>Experto</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Años de Experiencia
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={yearsOfExp}
              onChange={(e) => setYearsOfExp(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isLoading ? "Agregando..." : "Agregar"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
