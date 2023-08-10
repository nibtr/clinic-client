import { request } from '@umijs/max';
import {
  GET_APPOINTMENT_REQUESTS,
  GET_DENTISTS,
  GET_DENTIST_FOR_PATIENT,
  GET_EXAMINATION,
  GET_EXAMINATION_DETAIL,
  GET_PATIENTS,
  GET_ROOMS,
  GET_TREATMENT_SESSIONS,
  POST_EXAMINATION,
} from './paths';

export const getAppointmentRequests = async (limit: number, page: number, today: boolean) => {
  return request(GET_APPOINTMENT_REQUESTS, {
    method: 'GET',
    params: {
      page,
      limit,
      today,
    },
  });
};

export const getPatients = async (limit: number, page: number, name: string) => {
  return request(GET_PATIENTS, {
    method: 'GET',
    params: {
      page,
      limit,
      name,
    },
  });
};

export const getDentists = async (
  limit: number,
  page: number,
  name: string,
  workingDay?: string,
) => {
  return request(GET_DENTISTS, {
    method: 'GET',
    params: {
      limit,
      page,
      name,
      workingDay,
    },
  });
};

export const getRooms = async () => {
  return request(GET_ROOMS, {
    method: 'GET',
  });
};

export const postExamination = async (data: TExaminationPost) => {
  return request(POST_EXAMINATION, {
    method: 'POST',
    data,
  });
};

export const getDentistForPatient = async (patientID: number) => {
  return request(GET_DENTIST_FOR_PATIENT, {
    method: 'GET',
    params: {
      patientID,
    },
  });
};

export const getExaminations = async (limit: number, page: number, today?: boolean) => {
  return request(GET_EXAMINATION, {
    method: 'GET',
    params: {
      limit,
      page,
      today,
    },
  });
};

export const getExaminationDetail = async (id: number) => {
  return request(GET_EXAMINATION_DETAIL + '/' + id, {
    method: 'GET',
  });
};

export const getReExaminationOfExamination = async (id: number) => {
  return request(GET_EXAMINATION + '/' + id + '/re-examinations', {
    method: 'GET',
  });
};

export const getTreatmentSessions = async (limit: number, page: number, today?: boolean) => {
  return request(GET_TREATMENT_SESSIONS, {
    method: 'GET',
    params: {
      limit,
      page,
      today,
    },
  });
};
