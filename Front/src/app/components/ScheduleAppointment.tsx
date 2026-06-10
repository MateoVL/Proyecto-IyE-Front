import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

import { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';


export function ScheduleAppointment() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    doctor: '',
    type: 'Control de Emergencia',
    notes: ''
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const {
    patientName,
    patientCondition
  } = location.state || {
    patientName: 'Paciente no seleccionado',
    patientCondition: 'Sin información'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmAppointment = () => {
    alert('Cita agendada correctamente');

    setShowConfirmation(false);

    setFormData({
      date: '',
      time: '',
      doctor: '',
      type: 'Control de Emergencia',
      notes: ''
    });
    navigate('/');
  };

  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return '';

    const date = new Date(dateString);

    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {!showConfirmation ? (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6 text-white">
            <h1 className="text-3xl font-bold">
              Agendar Cita de Control
            </h1>

            <p className="mt-2 text-blue-100">
              Paciente: {patientName}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Alert */}
              <div className="lg:col-span-2">
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />

                    <span className="font-semibold text-red-800">
                      Paciente en Riesgo
                    </span>
                  </div>

                  <p className="text-red-700">
                    {patientCondition}
                  </p>
                </div>
              </div>

              {/* Fecha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de la Cita
                </label>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        date: e.target.value
                      })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Hora */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora
                </label>

                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        time: e.target.value
                      })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Doctor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doctor Asignado
                </label>

                <select
                  required
                  value={formData.doctor}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      doctor: e.target.value
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar doctor</option>

                  <option value="Dr. Roberto Martínez">
                    Dr. Roberto Martínez
                  </option>

                  <option value="Dra. Carolina López">
                    Dra. Carolina López
                  </option>

                  <option value="Dr. Miguel García">
                    Dr. Miguel García
                  </option>

                  <option value="Dra. Ana Hernández">
                    Dra. Ana Hernández
                  </option>
                </select>
              </div>

              {/* Tipo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Consulta
                </label>

                <select
                  required
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Control de Emergencia">
                    Control de Emergencia
                  </option>

                  <option value="Control Respiratorio">
                    Control Respiratorio
                  </option>

                  <option value="Control Cardíaco">
                    Control Cardíaco
                  </option>

                  <option value="Control de Presión">
                    Control de Presión
                  </option>

                  <option value="Control de Glucosa">
                    Control de Glucosa
                  </option>
                </select>
              </div>

              {/* Notas */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notas Adicionales
                </label>

                <textarea
                  rows={5}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notes: e.target.value
                    })
                  }
                  placeholder="Observaciones sobre el estado del paciente..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium"
            >
                Volver
            </button>
              
              <button
                type="submit"
                className="px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
              >
                Continuar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-6 text-white">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />

              <div>
                <h2 className="text-2xl font-bold">
                  Confirmar Cita
                </h2>

                <p className="text-green-100">
                  Revise la información antes de agendar
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div>
                <span className="text-gray-500 text-sm">
                  Paciente
                </span>

                <p className="font-semibold text-lg">
                  {patientName}
                </p>
              </div>

              <div>
                <span className="text-gray-500 text-sm">
                  Fecha
                </span>

                <p className="font-medium">
                  {formatDateDisplay(formData.date)}
                </p>
              </div>

              <div>
                <span className="text-gray-500 text-sm">
                  Hora
                </span>

                <p className="font-medium">
                  {formData.time}
                </p>
              </div>

              <div>
                <span className="text-gray-500 text-sm">
                  Doctor
                </span>

                <p className="font-medium">
                  {formData.doctor}
                </p>
              </div>

              <div>
                <span className="text-gray-500 text-sm">
                  Tipo de Consulta
                </span>

                <p className="font-medium">
                  {formData.type}
                </p>
              </div>

              {formData.notes && (
                <div>
                  <span className="text-gray-500 text-sm">
                    Notas
                  </span>

                  <p className="font-medium">
                    {formData.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100"
              >
                Volver
              </button>

              <button
                onClick={handleConfirmAppointment}
                className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600"
              >
                Confirmar Cita
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}