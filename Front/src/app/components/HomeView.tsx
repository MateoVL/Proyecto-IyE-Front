import {
  Activity,
  Users,
  Heart,
  TrendingUp,
  BarChart3,
  Calendar,
  FileCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export function HomeView() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Main Hero Section */}
        <div className="text-center mb-16">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-3xl shadow-2xl">
              <Activity className="w-20 h-20 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            CrónicoTrack
          </h1>

          {/* Subtitle */}
          <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Sistema Integral de Seguimiento y Gestión de Pacientes Crónicos
          </p>

          {/* Description */}
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12">
            Monitoreo continuo, alertas inteligentes y gestión eficiente para
            mejorar la calidad de vida de pacientes con condiciones crónicas
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <button
              onClick={() => navigate("/consent")}
              className="flex items-center gap-2 px-8 py-3 bg-white text-slate-900 border-2 border-slate-700 hover:border-slate-900 rounded-lg hover:bg-slate-50 transition-colors font-semibold shadow-sm"
            >
              <FileCheck className="w-5 h-5 text-blue-700" />
              <span>Marco Legal & Consentimiento</span>
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
            <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Gestión de Pacientes
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Administra y monitorea a todos tus pacientes crónicos desde una
              plataforma centralizada con fichas médicas completas.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
            <div className="bg-red-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-red-600" />
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Alertas Inteligentes
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Recibe notificaciones automáticas basadas en patrones detectados y
              valores críticos de tus pacientes.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
            <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Análisis y Reportes
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Visualiza tendencias, estadísticas y genera reportes detallados
              sobre el estado de tus pacientes.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
            <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Seguimiento Continuo
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Monitorea la evolución de tus pacientes con históricos detallados
              y gráficos de progreso.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
            <div className="bg-yellow-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-yellow-600" />
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Agenda de Citas
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Programa y gestiona citas médicas con recordatorios automáticos
              por WhatsApp para tus pacientes.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
            <div className="bg-indigo-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Activity className="w-8 h-8 text-indigo-600" />
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Multi-Rol
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Vistas especializadas para directores médicos y enfermeros con
              dashboards personalizados.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-12 text-white shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">248</p>
              <p className="text-blue-100 text-lg">Pacientes Activos</p>
            </div>

            <div>
              <p className="text-5xl font-bold mb-2">87%</p>
              <p className="text-blue-100 text-lg">Tasa de Control</p>
            </div>

            <div>
              <p className="text-5xl font-bold mb-2">23</p>
              <p className="text-blue-100 text-lg">
                Alertas Atendidas Hoy
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}