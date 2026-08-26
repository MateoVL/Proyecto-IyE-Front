import httpCommon from '../config/http-common';

// ── Tipos que coinciden con los DTOs del backend ───────────────────────────────


export interface ChronicPatient {
  id: number;
  name: string;
  age: number;
  condition: string[];
  status: string;
  lastVisit: string;
  nextVisit: string;
  room: string;
  phone: string;
  email: string;
  address: string;
  bloodType: string;
  emergencyName: string;
  emergencyPhone: string;
  alergies: string[];
  actualMeds: string[];
  alertPattern?: string;
  lastMeasurement?: string;
}

export interface Appointment {
  id: number;
  patient: string;
  date: string;
  time: string;
  type: string;
  doctor: string;
  room: string;
  priority: string;
}

export interface RecentAlertDto {
  id: number;
  patientName: string;
  type: string;
  description: string;
  time: string;
  status: string;
}

export interface Patient {
  idPatient: number;
  name: string;
  age: number;
  condition: Condition[];
  status: string;
  lastVisit: string;
  nextVisit: string;
  room: string | null;
  phone: string;
  mail: string;
  address: string;
  bloodType: string;
  emergencyName: string;
  emergencyPhone: string;
  alergies: string[];
  actualMeds: string[];
}

export interface Condition {
  id: number;
  name: string;
  description: string;
  indicators: Indicator[];
  lastUpdate: string;
  notes: string;
}

export interface Indicator {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  lower: number;
  upper: number;
  state: string;
}

export interface Alert {
  id: number;
  paciente: Patient;
  tipo: string;
  descripcion: string;
  fecha: string;
  resuelta: boolean;
}

// ── Endpoints ─────────────────────────────────────────────────────────────────


export const getPatients = () =>
  httpCommon.get<ChronicPatient[]>('/v1/paciente/patients');

export const getMedicalRecord = (idPatient: number) =>
  httpCommon.get<Patient[]>(`/v1/medical/record/${idPatient}`);

export const getFutureAppointments = () =>
  httpCommon.get<Appointment[]>(`/v1/control/future/appointments`);

export const getRecentAlerts = () =>
  httpCommon.get<RecentAlertDto[]>(`/v1/alerta/get/recent/alerts`);

export const getAlerts = () =>
  httpCommon.get<Alert[]>(`/v1/alerta/get/alerts`);

export const sendWhatsAppMessage = (
  numero: string,
  mensaje: string
) => {
  return httpCommon.post("/whatsapp/send", {
    numero,
    mensaje,
  });
};


export default {
  getPatients,
  getMedicalRecord,
  getFutureAppointments,
  getRecentAlerts,
  sendWhatsAppMessage,
  getAlerts
};