import { FEMALE_TYPE, MALE_TYPE } from '@/constants/dataQuery';

export const getGender = (type: string) => {
  if (type === MALE_TYPE) return 'Male';
  if (type === FEMALE_TYPE) return 'Female';
  return '';
};

export const splitDateTime = (dateTime: string) => {
  const [date, time] = dateTime.split('T');
  const [timeFormatted] = time.split('.');
  const [hour, minute] = timeFormatted.split(':');
  return date + ' ' + hour + ':' + minute;
};
