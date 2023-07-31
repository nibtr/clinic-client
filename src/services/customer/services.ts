import { useQuery } from 'react-query';
import { makeAppointment } from './callers';

export const makeAppointmentKey = {
  appointmentRequest: ['MAKE_APPOINTMENT'],
};

export const useMakeAppointment = (name: string, phone: number, appointmentTime: string, requestTime: string, note: string) => {
  return useQuery<TTemplateResponse<TMakeAppointmentRequest>, Error>({
    queryKey: [...makeAppointmentKey.appointmentRequest, name, phone, appointmentTime, requestTime, note],
    queryFn: () => makeAppointment(name, phone, appointmentTime, requestTime, note),
  });
}