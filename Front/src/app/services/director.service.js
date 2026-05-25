//import httpClient from "../http-common";

const getPatients = () => {
    return httpClient.get('/paciente/patients');
}

const getPatientById = id => {
    return httpClient.get(`/paciente/detail/${id}`);
}

const getPatientsQuantities = () => {
    return httpClient.get(`/paciente/patients/quantities`);
}

const getAllPatientsQuantity = () => {
    return httpClient.get(`/paciente/get/all/patients/quantity`);
}

const getActiveAlertsQuantity = () => {
    return httpClient.get(`/alerta/get/active/alerts/quantity`);
}

const getFollowUpQuantity = () => {
    return httpClient.get(`/control/get/followup/quantity`);
}

const getControlRate = () => {
    return httpClient.get(`/control/get/controlrate`);
}

const getHistoric = () => {
    return httpClient.get(`/historic/get/historic`);
}

const getRecentAlerts = () => {
    return httpClient.get(`/alerta/get/recent/alerts`);
}



export default { getPatients, getPatientById, getPatientsQuantities,
     getAllPatientsQuantity, getActiveAlertsQuantity, getFollowUpQuantity, 
     getControlRate, getHistoric, getRecentAlerts };