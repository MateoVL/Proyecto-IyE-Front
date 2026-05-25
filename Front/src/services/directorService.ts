import httpCommon from '../config/http-common';

// ── Tipos que coinciden con los DTOs del backend ───────────────────────────────

export interface RecentAlertDto {
  id: number;
  patient: string;
  condition: string;
  alert: string;
  priority: string;
  time: string;
}

export interface Alert {
  id: number;
  patient: string;
  condition: string;
  alert: string;
  priority: 'critical' | 'high' | 'medium';
  time: string;
};

export interface ChronicPatient {
  id: number;
  name: string;
  age: number;
  condition: string;
  status: string;
  lastVisit: string;
  nextVisit: string;
  room?: string;
  phone?: string;
}

export interface PatientQuantityDTO {
  type: string;
  quantity: number;
}

export interface HistoricEntry {
  mes: string;
  controlados: number;
  descompensados: number;
  alertas: number;
}

// ── Endpoints ─────────────────────────────────────────────────────────────────

/** GET /api/v1/alerta/get/recent/alerts */
export const getRecentAlerts = () =>
  httpCommon.get<Alert[]>('/v1/alerta/get/recent/alerts');

/** GET /api/v1/alerta/get/active/alerts/quantity */
export const getActiveAlertsQuantity = () =>
  httpCommon.get<{ quantity: number }>('/v1/alerta/get/active/alerts/quantity');

/** GET /api/v1/paciente/get/all/patients/quantity */
export const getAllPatientsQuantity = () =>
  httpCommon.get<{ quantity: number }>('/v1/paciente/get/all/patients/quantity');

/** GET /api/v1/paciente/patients/quantities */
export const getPatientsQuantities = () =>
  httpCommon.get<PatientQuantityDTO[]>('/v1/paciente/patients/quantities');

export const getHistoric = () =>
  httpCommon.get<HistoricEntry[]>('/v1/historic/get/historic');

export const getPatients = () =>
  httpCommon.get<ChronicPatient[]>('/v1/paciente/patients');

export const getFollowUpQuantity = () =>
  httpCommon.get<{ quantity: number }>('/v1/control/get/followup/quantity');

export const getControlRate = () =>
  httpCommon.get<{ controlRate: number}>('/v1/control/get/controlrate');

export default {
  getRecentAlerts,
  getActiveAlertsQuantity,
  getAllPatientsQuantity,
  getPatientsQuantities,
  getHistoric,
  getPatients,
  getFollowUpQuantity,
  getControlRate
};