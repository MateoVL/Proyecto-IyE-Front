import {
  Activity,
  Users,
  Heart,
  TrendingUp,
  BarChart3,
  Calendar,
  UserCog,
  Stethoscope,
  FileCheck,
  Scale,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface HomeViewProps {
  onSelectRole: (role: "director" | "nurse") => void;
}
 
export function HomeView({ onSelectRole }: HomeViewProps) {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelection = (role: "director" | "nurse") => {
      setShowRoleModal(false);

    if (role === "director") {
      navigate("/director");
    } else {
      navigate("/nurse");
    }
  };

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
              onClick={() => setShowRoleModal(true)}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl font-medium"
            >
              Comenzar
            </button>

            <button
              onClick={() => navigate("/consent")}
              className="flex items-center gap-2 px-8 py-3 bg-white text-blue-600 border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-colors font-medium shadow-sm"
            >
              <FileCheck className="w-5 h-5 text-blue-600" />
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

        {/* Role Selection Modal */}
        {showRoleModal && (
          <div
            className="fixed inset-0 backdrop-blur-sm bg-white bg-opacity-10 flex items-center justify-center z-50 p-4"
            onClick={() => setShowRoleModal(false)}
          >
            <div
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Selecciona tu Rol
                </h2>

                <p className="text-gray-600">
                  ¿Cómo deseas acceder al sistema?
                </p>
              </div>

              {/* Role Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Director Card */}
                <div
                  onClick={() => handleRoleSelection("director")}
                  className="group cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8 hover:border-blue-500 hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                      <UserCog className="w-12 h-12 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Director Médico
                    </h3>

                    <p className="text-gray-600 mb-4">
                      Accede a dashboards ejecutivos, reportes y estadísticas
                      generales
                    </p>

                    <div className="mt-auto">
                      <span className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg group-hover:bg-blue-600 transition-colors">
                        Acceder como Director →
                      </span>
                    </div>
                  </div>
                </div>

                {/* Nurse Card */}
                <div
                  onClick={() => handleRoleSelection("nurse")}
                  className="group cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8 hover:border-green-500 hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                      <Stethoscope className="w-12 h-12 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Enfermero/a
                    </h3>

                    <p className="text-gray-600 mb-4">
                      Monitorea pacientes, gestiona alertas y agenda citas
                      médicas
                    </p>

                    <div className="mt-auto">
                      <span className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg group-hover:bg-green-600 transition-colors">
                        Acceder como Enfermero/a →
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => {
                    setShowRoleModal(false);
                    navigate("/consent");
                  }}
                  className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                >
                  <FileCheck className="w-4 h-4 text-indigo-600" />
                  <span>Ver Marco Legal de Consentimiento (Leyes 20.584 y 19.628) →</span>
                </button>

                <button
                  onClick={() => setShowRoleModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}