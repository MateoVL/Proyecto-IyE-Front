import { Search, Users, UserPlus, Filter, Calendar, Clock, MapPin, FileText, Activity, MessageCircle, Send, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PatientRecord } from './PatientRecord';
import nurseService from '../../services/nurseService';
interface Patient {
  id: number;
  name: string;
  age: number;
  conditions: string[];
  status: string;
  lastVisit: string;
  nextVisit: string;
  room: string;
  phone: string;
  email?: string;
  address: string;
  bloodType: string;
  emergencyName: string;
  emergencyPhone: string;
  alergies?: string[];
  actualMeds?: string[];
  alertPattern?: string;
  lastMeasurement?: string;
}

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

/*
const mockPatients: Patient[] = [
  {
    id: 1,
    name: 'María García López',
    age: 68,
    conditions: ['Diabetes Tipo 2', 'Hipertensión'],
    email: 'maria.garcia@email.com',
    phone: '555-0101',
    address: 'Av. Principal 123, Santiago',
    bloodType: 'O+',
    allergies: 'Penicilina',
    medications: 'Metformina 850mg (2 veces al día), Enalapril 10mg',
    lastVisit: '2026-05-15',
    nextVisit: '2026-05-22',
    status: 'controlled',
    emergencyContact: 'Pedro García',
    emergencyPhone: '555-0102',
    alertPattern: 'Valores estables en rango objetivo',
    lastMeasurement: '120 mg/dl'
  },
  {
    id: 2,
    name: 'Juan Pérez Martín',
    age: 72,
    conditions: ['Hipertensión'],
    email: 'juan.perez@email.com',
    phone: '555-0103',
    address: 'Calle Los Pinos 456, Providencia',
    bloodType: 'A+',
    allergies: 'Ninguna conocida',
    medications: 'Losartán 50mg, Aspirina 100mg',
    lastVisit: '2026-05-10',
    nextVisit: '2026-05-20',
    status: 'warning',
    emergencyContact: 'Carmen Pérez',
    emergencyPhone: '555-0104',
    alertPattern: 'Presión arterial elevada (3 días consecutivos)',
    lastMeasurement: '165/95 mmHg'
  },
  {
    id: 3,
    name: 'Ana Rodríguez',
    age: 65,
    conditions: ['EPOC'],
    email: 'ana.rodriguez@email.com',
    phone: '555-0105',
    address: 'Pasaje Las Flores 789, Las Condes',
    bloodType: 'B-',
    allergies: 'Sulfamidas',
    medications: 'Salbutamol inhalador, Prednisona 5mg',
    lastVisit: '2026-05-18',
    nextVisit: '2026-05-21',
    status: 'critical',
    emergencyContact: 'Roberto Rodríguez',
    emergencyPhone: '555-0106',
    alertPattern: 'Saturación O2 < 90% últimas 48h',
    lastMeasurement: '88% O2'
  },
  {
    id: 4,
    name: 'Carlos Sánchez',
    age: 75,
    conditions: ['Insuficiencia Cardíaca', 'Hipertensión'],
    email: 'carlos.sanchez@email.com',
    phone: '555-0107',
    address: 'Av. Libertador 321, Ñuñoa',
    bloodType: 'AB+',
    allergies: 'Ninguna conocida',
    medications: 'Furosemida 40mg, Carvedilol 25mg, Enalapril 20mg',
    lastVisit: '2026-05-16',
    nextVisit: '2026-05-23',
    status: 'controlled',
    emergencyContact: 'Isabel Sánchez',
    emergencyPhone: '555-0108',
    alertPattern: 'Control estable, peso dentro del rango',
    lastMeasurement: '75 kg'
  },
  {
    id: 5,
    name: 'Laura Fernández',
    age: 58,
    conditions: ['Diabetes Tipo 1'],
    email: 'laura.fernandez@email.com',
    phone: '555-0109',
    address: 'Calle Nueva 654, Vitacura',
    bloodType: 'O-',
    allergies: 'Látex',
    medications: 'Insulina glargina, Insulina rápida, Metformina',
    lastVisit: '2026-05-17',
    nextVisit: '2026-05-24',
    status: 'controlled',
    emergencyContact: 'Diego Fernández',
    emergencyPhone: '555-0110',
    alertPattern: 'Buen control metabólico',
    lastMeasurement: '110 mg/dl'
  },
  {
    id: 6,
    name: 'Pedro Gómez',
    age: 70,
    conditions: ['Hipertensión', 'Diabetes Tipo 2'],
    email: 'pedro.gomez@email.com',
    phone: '555-0111',
    address: 'Av. Grecia 987, La Reina',
    bloodType: 'A-',
    allergies: 'Yodo',
    medications: 'Amlodipino 10mg, Hidroclorotiazida 25mg',
    lastVisit: '2026-05-14',
    nextVisit: '2026-05-21',
    status: 'warning',
    emergencyContact: 'María Gómez',
    emergencyPhone: '555-0112',
    alertPattern: 'Valores ligeramente elevados',
    lastMeasurement: '140/85 mmHg'
  },
  {
    id: 7,
    name: 'Isabel Torres',
    age: 63,
    conditions: ['Diabetes Tipo 2'],
    email: 'isabel.torres@email.com',
    phone: '555-0113',
    address: 'Paseo Central 147, Maipú',
    bloodType: 'B+',
    allergies: 'Ninguna conocida',
    medications: 'Metformina 1000mg, Glibenclamida 5mg',
    lastVisit: '2026-05-12',
    nextVisit: '2026-05-25',
    status: 'controlled',
    emergencyContact: 'José Torres',
    emergencyPhone: '555-0114',
    alertPattern: 'Valores dentro del rango',
    lastMeasurement: '110 mg/dl'
  },
  {
    id: 8,
    name: 'Francisco Ruiz',
    age: 69,
    conditions: ['Arritmia', 'Hipertensión'],
    email: 'francisco.ruiz@email.com',
    phone: '555-0115',
    address: 'Calle Andes 258, Peñalolén',
    bloodType: 'O+',
    allergies: 'AINEs',
    medications: 'Amiodarona 200mg, Warfarina 5mg',
    lastVisit: '2026-05-13',
    nextVisit: '2026-05-19',
    status: 'warning',
    emergencyContact: 'Teresa Ruiz',
    emergencyPhone: '555-0116',
    alertPattern: 'Frecuencia cardíaca irregular últimas 6h',
    lastMeasurement: '105 bpm irregular'
  }
];

const upcomingAppointments: Appointment[] = [
  {
    id: 1,
    patient: 'Ana Rodríguez',
    date: '2026-05-21',
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
  }
];
*/

export function NurseDashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isRecordOpen, setIsRecordOpen] = useState(false);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [whatsAppPatient, setWhatsAppPatient] = useState<Patient | null>(null);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');

  const init = async () => {
    try {
      const patientData = await nurseService.getPatients();
      setPatients(patientData.data);
      const appointmentData = await nurseService.getFutureAppointments();
      setUpcomingAppointments(appointmentData.data);
    } catch (error) {
      console.log("Error cargando dashboard", error);
    }
  };
  useEffect(() => {
    init();
  }, []);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.conditions.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsRecordOpen(true);
  };
  const handleWhatsAppClick = (patient: Patient, e: React.MouseEvent) => {
    e.stopPropagation();
    setWhatsAppPatient(patient);
    setWhatsAppMessage('');
    setIsWhatsAppModalOpen(true);
  };

  const handleSendWhatsApp = () => {
    if (whatsAppMessage.trim() && whatsAppPatient) {
      console.log(`Enviando mensaje a ${whatsAppPatient.name} (${whatsAppPatient.phone}): ${whatsAppMessage}`);
      setIsWhatsAppModalOpen(false);
      setWhatsAppMessage('');
      setWhatsAppPatient(null);
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'controlled': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'controlled': return 'Controlado';
      case 'warning': return 'En Observación';
      case 'critical': return 'Crítico';
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

  const formatDate = (dateString: string) => {
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
    controlled: patients.filter(p => p.status === 'controlled').length,
    warning: patients.filter(p => p.status === 'warning').length,
    critical: patients.filter(p => p.status === 'critical').length
  };

  return (
    <div className="max-w-[1800px] mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Enfermería</h1>
        <p className="text-gray-600">Monitoreo y seguimiento de pacientes crónicos</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div
          onClick={() => setFilterStatus('all')}
          className={`bg-white rounded-lg shadow-sm p-6 border-2 cursor-pointer transition-all hover:shadow-lg ${
            filterStatus === 'all' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
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
          onClick={() => setFilterStatus('controlled')}
          className={`bg-green-50 rounded-lg shadow-sm p-6 border-2 cursor-pointer transition-all hover:shadow-lg ${
            filterStatus === 'controlled' ? 'border-green-500 ring-2 ring-green-200' : 'border-green-200'
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
          onClick={() => setFilterStatus('warning')}
          className={`bg-yellow-50 rounded-lg shadow-sm p-6 border-2 cursor-pointer transition-all hover:shadow-lg ${
            filterStatus === 'warning' ? 'border-yellow-500 ring-2 ring-yellow-200' : 'border-yellow-200'
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
          onClick={() => setFilterStatus('critical')}
          className={`bg-red-50 rounded-lg shadow-sm p-6 border-2 cursor-pointer transition-all hover:shadow-lg ${
            filterStatus === 'critical' ? 'border-red-500 ring-2 ring-red-200' : 'border-red-200'
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
              <option value="controlled">Controlados</option>
              <option value="warning">En Observación</option>
              <option value="critical">Críticos</option>
            </select>
          </div>

          {/* Add Patient Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <UserPlus className="w-5 h-5" />
            <span>Nuevo Paciente</span>
          </button>
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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Condición</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Estado</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Patrón/Alerta</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Próxima Visita</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">WhatsApp</th>
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
                      <td className="px-6 py-4 text-gray-700">
                        {Array.isArray(patient.conditions)
                          ? patient.conditions.join(', ')
                          : 'Sin condiciones'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                          {getStatusLabel(patient.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-gray-600 mb-1">{patient.alertPattern}</p>
                          {patient.lastMeasurement && (
                            <div className="flex items-center gap-1 text-gray-500">
                              <Activity className="w-3 h-3" />
                              <span className="text-xs">{patient.lastMeasurement}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {new Date(patient.nextVisit).toLocaleDateString('es-ES')}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={(e) => handleWhatsAppClick(patient, e)}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          title="Enviar mensaje por WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">Enviar</span>
                        </button>
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
        patient={selectedPatient}
      />
      {/* WhatsApp Message Modal */}
      <Dialog open={isWhatsAppModalOpen} onOpenChange={setIsWhatsAppModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xl">Enviar Mensaje por WhatsApp</p>
                {whatsAppPatient && (
                  <p className="text-sm text-gray-600 font-normal mt-1">
                    A: {whatsAppPatient.name} ({whatsAppPatient.phone})
                  </p>
                )}
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-6">
            <div>
              <label htmlFor="whatsapp-message" className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje
              </label>
              <textarea
                id="whatsapp-message"
                rows={6}
                value={whatsAppMessage}
                onChange={(e) => setWhatsAppMessage(e.target.value)}
                placeholder="Escriba su mensaje aquí..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                El mensaje se enviará a través de WhatsApp al número registrado del paciente.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendWhatsApp}
                disabled={!whatsAppMessage.trim()}
                className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Mensaje</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
