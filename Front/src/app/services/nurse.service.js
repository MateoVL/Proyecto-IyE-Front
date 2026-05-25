//import httpClient from "../http-common";

const getPatients = () => {
    return httpClient.get('/paciente/patients');
}

const getMedicalRecord = idPatient => {
    return httpClient.get(`/medical/record/${idPatient}`);
}

const putMedicalRecord = idPatient => {
    return httpClient.put(`/medical/record/${idPatient}`);
}

const deleteMedicalRecord = idPatient => {
    return httpClient.delete(`/medical/record/${idPatient}`);
}

export default { getPatients, getMedicalRecord, putMedicalRecord, deleteMedicalRecord };