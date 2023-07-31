import { request } from '@umijs/max';
import {
  GET_APPOINTMENT_REQUESTS,
  GET_DENTISTS,
  GET_DENTIST_FOR_PATIENT,
  GET_PATIENTS,
  GET_ROOMS,
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
