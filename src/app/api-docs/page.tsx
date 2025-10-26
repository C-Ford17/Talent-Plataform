"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });
import 'swagger-ui-react/swagger-ui.css';

export default function ApiDocsPage() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch('/api/swagger')
      .then((res) => res.json())
      .then((data) => setSpec(data));
  }, []);

  if (!spec) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Cargando documentación...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de la página */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">API Documentation</h1>
          <p className="text-gray-600 mt-2">
            Documentación completa de la API REST de Talento Local
          </p>
          <div className="mt-4 flex gap-4">
            <div className="px-4 py-2 bg-blue-50 rounded-lg">
              <span className="text-sm font-semibold text-blue-900">Base URL:</span>
              <code className="text-sm text-blue-600 ml-2">http://localhost:3000</code>
            </div>
          </div>
        </div>
      </div>
      
      {/* Swagger UI */}
      <div className="max-w-7xl mx-auto">
        <SwaggerUI spec={spec} />
      </div>
    </div>
  );
}
