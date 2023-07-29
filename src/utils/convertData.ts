import { FEMALE_TYPE, MALE_TYPE } from '@/constants/dataQuery';

export const getGender = (type: string) => {
  if (type === MALE_TYPE) return 'Male';
  if (type === FEMALE_TYPE) return 'Female';
  return '';
};
