import { message } from 'antd';
import { QueryClient, useMutation, useQuery } from 'react-query';
import {
  deleteAppointmentRequests,
  getAppointmentRequests,
  getAssistants,
  getCategories,
  getDentistForPatient,
  getDentists,
  getExaminationDetail,
  getExaminations,
  getPatients,
  getReExaminationOfExamination,
  getRooms,
  getTeeth,
  getTreatmentSessionDetail,
  getTreatmentSessions,
  postExamination,
  postTreatmentSession,
} from './callers';

export const getKeyStaff = {
  appointmentRequests: ['APPOINTMENT_REQUESTS'],
  patients: ['PATIENTS'],
  dentists: ['DENTISTS'],
  rooms: ['ROOMS'],
  examination: ['EXAMINATION'],
  dentistForPatient: ['DENTIST_FOR_PATIENT'],
  examinationDetail: ['EXAMINATION_DETAIL'],
  reExOfExamination: ['RE_EX_OF_EXAMINATION'],
  treatmentSessions: ['TREATMENT_SESSIONS'],
  treatmentSession: ['TREATMENT_SESSION'],
  teeth: ['TEETH'],
  categories: ['CATEGORIES'],
  assistants: ['ASSISTANTS'],
};

export const postKeyStaff = {
  examination: getKeyStaff.examination,
  treatmentSession: getKeyStaff.treatmentSessions,
};

export const deleteKeyStaff = {
  appointmentRequests: getKeyStaff.appointmentRequests,
};

export const useGetAppointmentRequests = (limit: number, page: number, today: boolean) => {
  return useQuery<TTemplateResponse<TListResponse<TAppointmentRequest[]>>, Error>({
    queryKey: [...getKeyStaff.appointmentRequests, page, today],
    queryFn: () => getAppointmentRequests(limit, page, today),
  });
};

export const useGetPatients = (limit: number, page: number, name: string) => {
  return useQuery<TTemplateResponse<TListResponse<TPersonnel[]>>, Error>({
    queryKey: [...getKeyStaff.patients, page, name],
    queryFn: () => getPatients(limit, page, name),
  });
};

export const useGetDentists = (limit: number, page: number, name: string, workingDay?: string) => {
  return useQuery<TTemplateResponse<TListResponse<TPersonnel[]>>, Error>({
    queryKey: [...getKeyStaff.dentists, page, name, workingDay],
    queryFn: () => getDentists(limit, page, name, workingDay),
  });
};

export const useGetRooms = () => {
  return useQuery<TTemplateResponse<TRoom[]>, Error>({
    queryKey: getKeyStaff.rooms,
    queryFn: () => getRooms(),
  });
};

export const usePostExamination = () => {
  return useMutation<TTemplateResponse<TSession>, Error, TExaminationPost>({
    mutationFn: (data: TExaminationPost) => postExamination(data),
    mutationKey: postKeyStaff.examination,
    onSuccess: () => {
      message.success('Create examination successfully');
    },

    onError: () => {
      message.error('Create examination failed');
    },
  });
};

export const useGetDentistForPatient = (patientID: number) => {
  return useQuery<TTemplateResponse<TDentistForPatient>, Error>({
    queryKey: [getKeyStaff.dentistForPatient, patientID],
    queryFn: () => getDentistForPatient(patientID),
    retry: false,
  });
};

export const useGetExamination = (limit: number, page: number, today?: boolean) => {
  return useQuery<TTemplateResponse<TListResponse<ISessionResponse[]>>, Error>({
    queryKey: [...getKeyStaff.examination, page, today],
    queryFn: () => getExaminations(limit, page, today),
  });
};

export const useGetExaminationDetail = (examinationID: number) => {
  return useQuery<TTemplateResponse<ISessionResponse>, Error>({
    queryKey: [...getKeyStaff.examinationDetail, examinationID],
    queryFn: () => getExaminationDetail(examinationID),
  });
};

export const useGetReExaminationOfExamination = (id: number) => {
  return useQuery<TTemplateResponse<TReExamination[]>, Error>({
    queryKey: [...getKeyStaff.reExOfExamination, id],
    queryFn: () => getReExaminationOfExamination(id),
  });
};

export const useGetTreatmentSession = (limit: number, page: number, today?: boolean) => {
  return useQuery<TTemplateResponse<TListResponse<ISessionResponse[]>>, Error>({
    queryKey: [...getKeyStaff.treatmentSessions, page, today],
    queryFn: () => getTreatmentSessions(limit, page, today),
  });
};

export const useGetTeeth = () => {
  return useQuery<TTemplateResponse<TTooth[]>, Error>({
    queryKey: getKeyStaff.teeth,
    queryFn: () => getTeeth(),
  });
};

export const useGetCategories = () => {
  return useQuery<TTemplateResponse<TCategory[]>, Error>({
    queryKey: getKeyStaff.categories,
    queryFn: () => getCategories(),
  });
};

export const useGetAssistants = (limit: number, page: number, name: string) => {
  return useQuery<TTemplateResponse<TListResponse<TPersonnel[]>>, Error>({
    queryKey: [...getKeyStaff.assistants, page, name],
    queryFn: () => getAssistants(limit, page, name),
  });
};

export const usePostTreatmentSession = () => {
  return useMutation<TTemplateResponse<TSession>, Error, TTreatmentSessionPost>({
    mutationFn: (data: TTreatmentSessionPost) => postTreatmentSession(data),
    mutationKey: postKeyStaff.treatmentSession,
    onSuccess: () => {
      message.success('Create treatment session successfully');
    },

    onError: () => {
      message.error('Create treatment session failed');
    },
  });
};

export const useGetTreatmentSessionDetail = (id: number) => {
  return useQuery<TTemplateResponse<TTreatmentSessionDetail>, Error>({
    queryKey: [...getKeyStaff.treatmentSession, id],
    queryFn: () => getTreatmentSessionDetail(id),
    retry: false,
  });
};

export const useDeleteAppointmentRequest = (queryClient: QueryClient) => {
  return useMutation<TTemplateResponse<string>, Error, number>({
    mutationFn: (id: number) => deleteAppointmentRequests(id),
    mutationKey: deleteKeyStaff.appointmentRequests,
    onSuccess: () => {
      message.success('Delete appointment request successfully');
      queryClient.invalidateQueries(deleteKeyStaff.appointmentRequests);
    },
    onError: () => {
      message.error('Delete appointment request failed');
    },
  });
};
