import httpCommon from '../config/http-common';

// ── Tipos que coinciden con los DTOs del backend ───────────────────────────────


export interface ChronicPatient {
  id: number;
  name: string;
  age: number;
  conditions: string[];
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

// ── Endpoints ─────────────────────────────────────────────────────────────────


export const getPatients = () =>
  httpCommon.get<ChronicPatient[]>('/v1/paciente/patients');

export const getMedicalRecord = (idPatient: number) =>
  httpCommon.get<ChronicPatient[]>(`/v1/medical/record/${idPatient}`);

export const getFutureAppointments = () =>
  httpCommon.get<Appointment[]>(`/v1/control/future/appointments`);


export default {
  getPatients,
  getMedicalRecord,
  getFutureAppointments
};