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

export interface PatientQuantityDTO {
  type: string;
  quantity: number;
}

// ── Endpoints ─────────────────────────────────────────────────────────────────

/** GET /api/v1/alerta/get/recent/alerts */
export const getRecentAlerts = () =>
  httpCommon.get<RecentAlertDto[]>('/v1/alerta/get/recent/alerts');

/** GET /api/v1/alerta/get/active/alerts/quantity */
export const getActiveAlertsQuantity = () =>
  httpCommon.get<{ quantity: number }>('/v1/alerta/get/active/alerts/quantity');

/** GET /api/v1/paciente/get/all/patients/quantity */
export const getPatientsQuantity = () =>
  httpCommon.get<{ quantity: number }>('/v1/paciente/get/all/patients/quantity');

/** GET /api/v1/paciente/patients/quantities */
export const getPatientsQuantities = () =>
  httpCommon.get<PatientQuantityDTO[]>('/v1/paciente/patients/quantities');
