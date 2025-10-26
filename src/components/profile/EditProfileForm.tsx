"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfileForm({ profile }: { profile: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bio: profile.bio || "",
    address: profile.address || "",
    phone: profile.phone || "",
    jobStatus: profile.jobStatus || "NOT_SEEKING",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/profiles/${profile.userId}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Perfil actualizado exitosamente");
        router.push("/profile");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Error al actualizar perfil");
      }
    } catch (error) {
      alert("Error al actualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
      {/* Bio */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Biografía Profesional
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={5}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          placeholder="Cuéntanos sobre tu experiencia, habilidades y objetivos profesionales..."
        />
        <p className="text-sm text-gray-600 mt-2">
          Describe brevemente tu perfil profesional (máximo 500 caracteres)
        </p>
      </div>

      {/* Dirección */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Dirección
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          placeholder="Ej: Calle 15 #10-30, Santa Marta, Magdalena"
        />
      </div>

      {/* Teléfono */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Teléfono de Contacto
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          placeholder="Ej: 3001234567"
        />
      </div>

      {/* Estado Laboral */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Estado Laboral
        </label>
        <select
          value={formData.jobStatus}
          onChange={(e) => setFormData({ ...formData, jobStatus: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
        >
          <option value="EMPLOYED">Empleado actualmente</option>
          <option value="SEEKING">Buscando empleo activamente</option>
          <option value="OPEN_TO_OFFERS">Abierto a ofertas</option>
          <option value="NOT_SEEKING">No buscando empleo</option>
        </select>
        <p className="text-sm text-gray-600 mt-2">
          Indica tu situación laboral actual
        </p>
      </div>

      {/* Botones */}
      <div className="flex gap-4 pt-6 border-t">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold transition-colors shadow-md"
        >
          {loading ? "Guardando..." : "💾 Guardar Cambios"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/profile")}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
