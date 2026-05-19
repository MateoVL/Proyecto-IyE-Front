import { Calendar, Clock, AlertTriangle, Activity, Phone, MapPin, FileText } from 'lucide-react';
import { useState } from 'react';
import { NotificationBell } from './NotificationBell';
import { ScheduleAppointment } from './ScheduleAppointment';

// Mock data for nurse dashboard
const patientsWithAlerts = [
  {
    id: 1,
    name: 'Ana Rodríguez',
    age: 65,
    condition: 'EPOC',
    alertLevel: 'critical',
    pattern: 'Saturación O2 < 90% últimas 48h',
    lastMeasurement: '88% O2',
    room: '203',
    phone: '555-0101'
  },
  {
    id: 2,
    name: 'Juan Pérez Martín',
    age: 72,
    condition: 'Hipertensión',
    alertLevel: 'high',
    pattern: 'Presión arterial elevada (3 días consecutivos)',
    lastMeasurement: '165/95 mmHg',
    room: '105',
    phone: '555-0102'
  },
  {
    id: 3,
    name: 'María García López',
    age: 68,
    condition: 'Diabetes Tipo 2',
    alertLevel: 'high',
    pattern: 'Glucosa > 250 mg/dl (tendencia ascendente)',
    lastMeasurement: '280 mg/dl',
    room: '310',
    phone: '555-0103'
  },
  {
    id: 4,
    name: 'Carlos Sánchez',
    age: 75,
    condition: 'Insuficiencia Cardíaca',
    alertLevel: 'medium',
    pattern: 'Aumento de peso +3kg en 2 días',
    lastMeasurement: '78 kg',
    room: '208',
    phone: '555-0104'
  },
  {
    id: 5,
    name: 'Laura Fernández',
    age: 58,
    condition: 'Diabetes Tipo 1',
    alertLevel: 'medium',
    pattern: 'Sin registro de glucosa en 24h',
    lastMeasurement: 'N/A',
    room: '402',
    phone: '555-0105'
  },
  {
    id: 6,
    name: 'Pedro Gómez',
    age: 70,
    condition: 'Hipertensión',
    alertLevel: 'low',
    pattern: 'Control estable',
    lastMeasurement: '130/80 mmHg',
    room: '156',
    phone: '555-0106'
  },
  {
    id: 7,
    name: 'Isabel Torres',
    age: 63,
    condition: 'Diabetes Tipo 2',
    alertLevel: 'low',
    pattern: 'Valores dentro del rango',
    lastMeasurement: '110 mg/dl',
    room: '301',
    phone: '555-0107'
  },
  {
    id: 8,
    name: 'Francisco Ruiz',
    age: 69,
    condition: 'Arritmia',
    alertLevel: 'high',
    pattern: 'Frecuencia cardíaca irregular últimas 6h',
    lastMeasurement: '105 bpm irregular',
    room: '215',
    phone: '555-0108'
  },
];

const upcomingAppointments = [
  {
    id: 1,
    patient: 'Ana Rodríguez',
    date: '2026-05-19',
    time: '10:30',
    type: 'Control Respiratorio',
    doctor: 'Dr. Martínez',
    room: '203',
    priority: 'high'
  },
  {
    id: 2,
    patient: 'Francisco Ruiz',
    date: '2026-05-19',
    time: '14:00',
    type: 'Electrocardiograma',
    doctor: 'Dra. López',
    room: '215',
    priority: 'high'
  },
  {
    id: 3,
    patient: 'Juan Pérez Martín',
    date: '2026-05-20',
    time: '09:00',
    type: 'Control de Presión',
    doctor: 'Dr. García',
    room: '105',
    priority: 'medium'
  },
  {
    id: 4,
    patient: 'Pedro Gómez',
    date: '2026-05-21',
    time: '11:00',
    type: 'Seguimiento General',
    doctor: 'Dr. Martínez',
    room: '156',
    priority: 'low'
  },
  {
    id: 5,
    patient: 'María García López',
    date: '2026-05-22',
    time: '08:30',
    type: 'Control de Glucosa',
    doctor: 'Dra. Hernández',
    room: '310',
    priority: 'medium'
  },
  {
    id: 6,
    patient: 'Carlos Sánchez',
    date: '2026-05-23',
    time: '10:00',
    type: 'Control Cardíaco',
    doctor: 'Dr. Martínez',
    room: '208',
    priority: 'medium'
  },
  {
    id: 7,
    patient: 'Laura Fernández',
    date: '2026-05-24',
    time: '15:30',
    type: 'Ajuste de Insulina',
    doctor: 'Dra. Hernández',
    room: '402',
    priority: 'low'
  },
  {
    id: 8,
    patient: 'Isabel Torres',
    date: '2026-05-25',
    time: '09:30',
    type: 'Control de Glucosa',
    doctor: 'Dra. Hernández',
    room: '301',
    priority: 'low'
  },
];

export function NurseDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({ name: '', condition: '' });

  const handleNotificationClick = (patientName: string, condition: string) => {
    setSelectedPatient({ name: patientName, condition });
    setIsModalOpen(true);
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-50 border-l-4 border-red-500';
      case 'high':
        return 'bg-orange-50 border-l-4 border-orange-500';
      case 'medium':
        return 'bg-yellow-50 border-l-4 border-yellow-500';
      case 'low':
        return 'bg-green-50 border-l-4 border-green-500';
      default:
        return 'bg-gray-50 border-l-4 border-gray-500';
    }
  };

  const getAlertBadgeColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getAlertLabel = (level: string) => {
    switch (level) {
      case 'critical':
        return 'Crítico';
      case 'high':
        return 'Alto';
      case 'medium':
        return 'Medio';
      case 'low':
        return 'Estable';
      default:
        return 'Normal';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date('2026-05-19');
    const tomorrow = new Date('2026-05-20');

    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Mañana';
    } else {
      return date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
    }
  };

  // Sort patients by alert level
  const sortedPatients = [...patientsWithAlerts].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.alertLevel as keyof typeof order] - order[b.alertLevel as keyof typeof order];
  });

  // Calculate stats
  const criticalCount = patientsWithAlerts.filter(p => p.alertLevel === 'critical').length;
  const highCount = patientsWithAlerts.filter(p => p.alertLevel === 'high').length;
  const mediumCount = patientsWithAlerts.filter(p => p.alertLevel === 'medium').length;
  const stableCount = patientsWithAlerts.filter(p => p.alertLevel === 'low').length;

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl mb-2">Dashboard de Enfermería</h1>
          <p className="text-gray-600">Monitoreo y Seguimiento de Pacientes</p>
        </div>
        <NotificationBell onNotificationClick={handleNotificationClick} />
      </div>


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-red-500 text-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm mb-1">Críticos</p>
              <p className="text-3xl">{criticalCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-200" />
          </div>
        </div>
        <div className="bg-orange-500 text-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm mb-1">Alerta Alta</p>
              <p className="text-3xl">{highCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-200" />
          </div>
        </div>
        <div className="bg-yellow-500 text-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm mb-1">Alerta Media</p>
              <p className="text-3xl">{mediumCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-200" />
          </div>
        </div>
        <div className="bg-green-500 text-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Estables</p>
              <p className="text-3xl">{stableCount}</p>
            </div>
            <Activity className="w-8 h-8 text-green-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patients List with Color-coded Alerts */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl">Pacientes por Nivel de Alerta</h2>
              <p className="text-sm text-gray-600 mt-1">Ordenados por prioridad de atención</p>
            </div>
            <div className="max-h-[700px] overflow-y-auto">
              {sortedPatients.map((patient) => (
                <div
                  key={patient.id}
                  className={`p-4 border-b border-gray-100 ${getAlertColor(patient.alertLevel)} hover:opacity-90 transition-opacity`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-lg">{patient.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAlertBadgeColor(patient.alertLevel)}`}>
                          {getAlertLabel(patient.alertLevel)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{patient.age} años - {patient.condition}</p>
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-50 rounded-lg p-3 mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Patrón Detectado:</p>
                    <p className="text-sm text-gray-600">{patient.pattern}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-700">
                      <Activity className="w-4 h-4" />
                      <span className="font-medium">{patient.lastMeasurement}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Habitación {patient.room}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{patient.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl">Citas Próximas</h2>
              </div>
              <p className="text-sm text-gray-600 mt-1">Ordenadas por fecha</p>
            </div>
            <div className="max-h-[700px] overflow-y-auto">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium">{appointment.patient}</h3>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {formatDate(appointment.date)}
                    </span>
                    <Clock className="w-4 h-4 text-gray-500 ml-2" />
                    <span className="text-sm text-gray-600">{appointment.time}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <FileText className="w-4 h-4" />
                    <span>{appointment.doctor}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Hab. {appointment.room}</span>
                    </div>
                    <span className={`text-xs font-medium ${getPriorityColor(appointment.priority)}`}>
                      {appointment.priority === 'high' ? 'Prioritaria' : appointment.priority === 'medium' ? 'Normal' : 'Rutina'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
