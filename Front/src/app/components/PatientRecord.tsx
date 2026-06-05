import { X, User, Phone, Mail, MapPin, Calendar, Heart, Activity, Edit, Trash2, Save } from 'lucide-react';
import { useState } from 'react';
import { PathologySheet } from './PathologySheet';

interface ChronicPatient {
  id: number;
  name: string;
  age: number;
  condition?: string[];
  email?: string;
  phone: string;
  address: string;
  bloodType: string;
  alergies?: string[];
  actualMeds?: string[];
  lastVisit: string;
  nextVisit: string;
  status: string;
  emergencyName: string;
  emergencyPhone: string;
}

interface PatientRecordProps {
  isOpen: boolean;
  onClose: () => void;
  patient: ChronicPatient | null;
  onUpdate?: (patient: ChronicPatient) => void;
  onDelete?: (patientId: number) => void;
}

export function PatientRecord({ isOpen, onClose, patient, onUpdate, onDelete }: PatientRecordProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState<ChronicPatient | null>(patient);
  const [selectedPathology, setSelectedPathology] = useState<string | null>(null);

  if (!isOpen || !patient) return null;

  const handleEdit = () => {
    setIsEditing(true);
    setEditedPatient(patient);
  };

  const handleSave = () => {
    if (editedPatient && onUpdate) {
      onUpdate(editedPatient);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedPatient(patient);
  };

  const handleDelete = () => {
    if (window.confirm(`¿Está seguro que desea eliminar el registro de ${patient.name}?`)) {
      if (onDelete) {
        onDelete(patient.id);
      }
      onClose();
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

  const currentPatient = isEditing ? editedPatient : patient;
  if (!currentPatient) return null;

  const formatValue = (value?: string | null) => {
    if (value === undefined || value === null) return '---';
    const trimmed = String(value).trim();
    return trimmed.length > 0 ? trimmed : '---';
  };

  const formatList = (values?: string[] | null) => {
    if (!Array.isArray(values)) return '---';
    const filtered = values.filter((item) => item !== null && item !== undefined && String(item).trim() !== '');
    return filtered.length > 0 ? filtered.join(', ') : '---';
  };

  const conditionList = Array.isArray(currentPatient.condition)
    ? currentPatient.condition
    : [];

  const alergiesList = Array.isArray(currentPatient.alergies)
    ? currentPatient.alergies
    : [];

  const actualMedsList = Array.isArray(currentPatient.actualMeds)
    ? currentPatient.actualMeds
    : [];

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-white bg-opacity-10 flex items-center justify-center z-40 p-4 overflow-hidden"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 my-4 max-h-[calc(100vh-100px)] overflow-y-auto border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500 rounded-full">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl text-gray-800">Ficha de Paciente</h2>
              <p className="text-sm text-gray-600 mt-1">{currentPatient.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <button
                  onClick={handleEdit}
                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit className="w-5 h-5 text-blue-600" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
              </>
            )}
            <button
              onClick={onClose}
              type="button"
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Personal Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Personal</h3>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={currentPatient.name}
                        onChange={(e) => setEditedPatient({ ...currentPatient, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{currentPatient.name}</p>
                    )}
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={currentPatient.age}
                        onChange={(e) => setEditedPatient({ ...currentPatient, age: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{currentPatient.age} años</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {isEditing ? (
                        <input
                          type="email"
                          value={currentPatient.email ?? ''}
                          onChange={(e) => setEditedPatient({ ...currentPatient, email: e.target.value })}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{formatValue(currentPatient.email)}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {isEditing ? (
                        <input
                          type="tel"
                          value={currentPatient.phone ?? ''}
                          onChange={(e) => setEditedPatient({ ...currentPatient, phone: e.target.value })}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{formatValue(currentPatient.phone)}</p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={currentPatient.address ?? ''}
                          onChange={(e) => setEditedPatient({ ...currentPatient, address: e.target.value })}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{formatValue(currentPatient.address)}</p>
                      )}
                    </div>
                  </div>

                  {/* Blood Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Sangre</label>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={currentPatient.bloodType ?? ''}
                          onChange={(e) => setEditedPatient({ ...currentPatient, bloodType: e.target.value })}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{formatValue(currentPatient.bloodType)}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contacto de Emergencia</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={currentPatient.emergencyName ?? ''}
                        onChange={(e) => setEditedPatient({ ...currentPatient, emergencyName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{formatValue(currentPatient.emergencyName)}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={currentPatient.emergencyPhone ?? ''}
                        onChange={(e) => setEditedPatient({ ...currentPatient, emergencyPhone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{formatValue(currentPatient.emergencyPhone)}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Medical Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Médica</h3>

                <div className="space-y-4">
                  {/* Conditions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Condiciones Médicas</label>
                    <div className="flex items-start gap-2">
                      <Activity className="w-4 h-4 text-blue-500 mt-1" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={conditionList.join(', ')}
                          onChange={(e) => setEditedPatient({ ...currentPatient, condition: e.target.value.split(',').map(c => c.trim()) })}
                          placeholder="Separar con comas"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {conditionList.length > 0 ? conditionList.map((condition, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedPathology(condition)}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer border border-blue-300"
                            >
                              {condition}
                            </button>
                          )) : (
                            <p className="text-gray-900">---</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estado Actual</label>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentPatient.status)}`}>
                      {getStatusLabel(currentPatient.status)}
                    </span>
                  </div>

                  {/* Allergies */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alergias</label>
                    {isEditing ? (
                      <textarea
                        value={alergiesList.join(', ')}
                        onChange={(e) => setEditedPatient({ ...currentPatient, alergies: e.target.value.split(',').map(a => a.trim()) })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {alergiesList.length > 0 ? alergiesList.join(', ') : '---'}
                      </p>
                    )}
                  </div>

                  {/* Medications */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medicamentos Actuales</label>
                    {isEditing ? (
                      <textarea
                        value={actualMedsList.join(', ')}
                        onChange={(e) => setEditedPatient({ ...currentPatient, actualMeds: e.target.value.split(', ').map(m => m.trim()) })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {actualMedsList.length > 0 ? actualMedsList.join(', ') : '---'}
                      </p>
                    )}
                  </div>

                  {/* Last Visit */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Última Visita</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {isEditing ? (
                        <input
                          type="date"
                          value={currentPatient.lastVisit}
                          onChange={(e) => setEditedPatient({ ...currentPatient, lastVisit: e.target.value })}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{currentPatient.lastVisit ? new Date(currentPatient.lastVisit).toLocaleDateString('es-ES') : '---'}</p>
                      )}
                    </div>
                  </div>

                  {/* Next Visit */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Próxima Visita</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      {isEditing ? (
                        <input
                          type="date"
                          value={currentPatient.nextVisit}
                          onChange={(e) => setEditedPatient({ ...currentPatient, nextVisit: e.target.value })}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{currentPatient.nextVisit ? new Date(currentPatient.nextVisit).toLocaleDateString('es-ES') : '---'}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pathology Sheet */}
      <PathologySheet
        isOpen={selectedPathology !== null}
        onClose={() => setSelectedPathology(null)}
        pathology={selectedPathology || ''}
      />
    </div>
  );
}