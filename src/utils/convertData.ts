import { FEMALE_TYPE, MALE_TYPE, sessionStatus, sessionType } from '@/constants/dataQuery';

export const getGender = (type: string) => {
  if (type === MALE_TYPE) return 'Male';
  if (type === FEMALE_TYPE) return 'Female';
  return '';
};

export const splitDateTime = (dateTime: string | null) => {
  if (!dateTime) return '';

  const [date, time] = dateTime.split('T');
  const [timeFormatted] = time.split('.');
  const [hour, minute] = timeFormatted.split(':');
  return date + ' ' + hour + ':' + minute;
};

export const convertSessionType = (type: string) => {
  switch (type) {
    case sessionType.EXAMINATION:
      return 'Examination';
    case sessionType.REEXAMINATION:
      return 'Re-examination';
    case sessionType.TREATMENT:
      return 'Treatment';
    default:
      return '';
  }
};

export const convertSessionStatus = (status: string) => {
  switch (status) {
    case sessionStatus.SCHEDULED:
      return 'Scheduled';
    case sessionStatus.CANCELLED:
      return 'Cancelled';
    case sessionStatus.RESCHEDULED:
      return 'Rescheduled';
    case sessionStatus.COMPLETED:
      return 'Completed';
    case sessionStatus.EXECUTING:
      return 'Executing';
    default:
      return '';
  }
};

export const convertSessionStatusToColor = (status: string) => {
  switch (status) {
    case sessionStatus.SCHEDULED:
      return 'yellow';
    case sessionStatus.CANCELLED:
      return 'red';
    case sessionStatus.RESCHEDULED:
      return 'yellow';
    case sessionStatus.COMPLETED:
      return 'green';
    case sessionStatus.EXECUTING:
      return 'blue';
    default:
      return '';
  }
};

export const convertMethodPayment = (method: string) => {
  switch (method) {
    case 'C':
      return 'Cash';
    case 'O':
      return 'Online';
    default:
      return '';
  }
};
