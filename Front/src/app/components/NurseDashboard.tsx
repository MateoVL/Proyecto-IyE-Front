
import { Search, Users, UserPlus, Filter, Calendar, Clock, MapPin, FileText, Activity, Send, FileCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PatientRecord } from './PatientRecord';
import nurseService, { ChronicPatient, Patient as MedicalRecordPatient } from '../../services/nurseService';

interface Appointment {
  id: number;
  patient: string;
  date: string;
  time: string;
  type: string;
  doctor: string;
  room: string;
  priority: string;
}

type Alert = {
  id: number;
  patientId: number;
  patientName: string;
  type: string;
  description: string;
  status: 'critical' | 'high' | 'medium';
  time: string;
};

export function NurseDashboard() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<ChronicPatient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMedicalRecord, setSelectedMedicalRecord] = useState<MedicalRecordPatient | null>(null);
  const [isRecordOpen, setIsRecordOpen] = useState(false);
  const [recordLoading, setRecordLoading] = useState(false);
  const [recordError, setRecordError] = useState<string | null>(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const init = async () => {
    try {
      const patientData = await nurseService.getPatients();
      setPatients(patientData.data);
      console.log(patientData.data);
      const appointmentData = await nurseService.getFutureAppointments();
      console.log("citas", appointmentData.data);
      setUpcomingAppointments(appointmentData.data);
      // alertas
      const alertsResponse = await nurseService.getRecentAlerts();
      setAlerts(alertsResponse.data);
      console.log("Alertas cargadas:", alertsResponse.data);
    } catch (error) {
      console.log("Error cargando dashboard", error);
    }
  };
  useEffect(() => {
    init();
  }, []);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const normalizeStringArray = (value: any): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value
        .map((item) => {
          if (typeof item === 'string') return item.trim();
          if (typeof item === 'number') return String(item);
          if (item && typeof item === 'object') {
            if (item.name && String(item.name).trim().length > 0) return String(item.name).trim();
            if (item.description && String(item.description).trim().length > 0) return String(item.description).trim();
          }
          return null;
        })
        .filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
    }
    if (typeof value === 'string') return [value.trim()];
    return [String(value)];
  };

  const handlePatientClick = async (patient: ChronicPatient) => {
    setRecordError(null);
    setRecordLoading(true);

    try {
      const response = await nurseService.getMedicalRecord(patient.id);
      const rawRecord = Array.isArray(response.data) ? response.data[0] : response.data as MedicalRecordPatient;
      console.log('Registro médico recibido:', rawRecord);
      if (!rawRecord) {
        throw new Error('Registro médico no disponible');
      }

      setSelectedMedicalRecord(rawRecord);
      setIsRecordOpen(true);
    } catch (error) {
      console.error('Error cargando el registro médico:', error);
      setRecordError('No se pudo cargar el registro médico. Intente nuevamente.');
    } finally {
      setRecordLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'controlado': return 'bg-green-100 text-green-800';
      case 'en observación': return 'bg-yellow-100 text-yellow-800';
      case 'crítico': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPatientAlertDescription = (patientId: number) => {
    const alert = alerts.find((a) => a.patientId === patientId);
    return alert?.description ?? '---';
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'controlado': return 'Controlado';
      case 'en observación': return 'En Observación';
      case 'crítico': return 'Crítico';
      default: return 'Normal';
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

  const formatValue = (value: any) => {
    // Si es null o undefined
    if (value === null || value === undefined) {
      return '---';
    }

    // Si es un array, lo une con comas
    if (Array.isArray(value)) {
      const filtered = value.filter(v => v && (typeof v === 'string' ? v.toString().trim() !== '' : true));
      if (filtered.length === 0) return '---';
      return filtered.map(v => typeof v === 'string' ? v.trim() : v).join(', ');
    }

    // Si es un string
    if (typeof value === 'string') {
      return value.trim() === '' ? '---' : value;
    }

    // Para números u otros tipos
    if (typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }

    // Fallback
    return '---';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '---';

    const date = new Date(dateString);
    const today = new Date('2026-05-20');
    const tomorrow = new Date('2026-05-21');

    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Mañana';
    } else {
      return date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
    }
  };

  const stats = {
    total: patients.length,
    controlled: patients.filter(p => p.status === 'controlado').length,
    warning: patients.filter(p => p.status === 'en observación').length,
    critical: patients.filter(p => p.status === 'crítico').length
  };

  return (
    <div className="max-w-[1800px] mx-auto p-6">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl mb-2">Enfermería</h1>
          <p className="text-gray-600">Monitoreo y seguimiento de pacientes crónicos</p>
        </div>
        <button
          onClick={() => navigate('/consent')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-300 text-slate-900 hover:text-indigo-950 rounded-lg hover:bg-indigo-100 transition-colors font-semibold text-sm shadow-sm"
        >
          <FileCheck className="w-4 h-4 text-indigo-800" />
          <span>Marco Legal & Consentimiento</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div
          onClick={() => setFilterStatus('all')}
          className={`bg-white rounded-lg shadow-sm p-6 border-2 cursor-pointer transition-all hover:shadow-lg ${filterStatus === 'all' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
            }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Pacientes</p>
              <p className="text-3xl">{stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div
          onClick={() => setFilterStatus('controlado')}
          className={`bg-green-50 rounded-lg shadow-sm p-6 border-2 cursor-pointer transition-all hover:shadow-lg ${filterStatus === 'controlado' ? 'border-green-500 ring-2 ring-green-200' : 'border-green-200'
            }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 text-sm mb-1">Controlados</p>
              <p className="text-3xl text-green-800">{stats.controlled}</p>
            </div>
            <Users className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div
          onClick={() => setFilterStatus('en observación')}
          className={`bg-yellow-50 rounded-lg shadow-sm p-6 border-2 cursor-pointer transition-all hover:shadow-lg ${filterStatus === 'en observación' ? 'border-yellow-500 ring-2 ring-yellow-200' : 'border-yellow-200'
            }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-700 text-sm mb-1">En Observación</p>
              <p className="text-3xl text-yellow-800">{stats.warning}</p>
            </div>
            <Users className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div
          onClick={() => setFilterStatus('crítico')}
          className={`bg-red-50 rounded-lg shadow-sm p-6 border-2 cursor-pointer transition-all hover:shadow-lg ${filterStatus === 'crítico' ? 'border-red-500 ring-2 ring-red-200' : 'border-red-200'
            }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-700 text-sm mb-1">Críticos</p>
              <p className="text-3xl text-red-800">{stats.critical}</p>
            </div>
            <Users className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o condición..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos los estados</option>
              <option value="controlado">Controlados</option>
              <option value="en observación">En Observación</option>
              <option value="crítico">Críticos</option>
            </select>
          </div>

        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patients Table - 2/3 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nombre</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Edad</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Estado</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Razón de Estado</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Última Visita</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Próxima Visita</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      onClick={() => handlePatientClick(patient)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-blue-600 hover:text-blue-700">{patient.name}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{patient.age} años</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                          {getStatusLabel(patient.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">
                          {getPatientAlertDescription(patient.id)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString('es-ES') : '--'}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {patient.nextVisit ? new Date(patient.nextVisit).toLocaleDateString('es-ES') : '--'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredPatients.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No se encontraron pacientes</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Appointments - 1/3 */}
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

      {/* Patient Record Modal */}
      <PatientRecord
        isOpen={isRecordOpen}
        onClose={() => setIsRecordOpen(false)}
        patient={selectedMedicalRecord}
      />
    </div >
  );
}
