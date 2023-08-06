declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;
declare const HOST_NAME: string;

type TCurrentUser = {
  username: string;
  role: string;
};

type TMenuItem = Required<MenuProps>['items'][number];

type TTemplateResponse<T> = {
  statusCode: number;
  data: T;
};

type TPersonnel = {
  id: number;
  nationalID: string;
  name: string;
  dob: string | null;
  gender: string | null;
  phone: string;
  type: string;
};

type TAppointmentRequest = {
  id: number;
  appointmentTime: string;
  requestTime: string;
  note: string | null;
  patientName: string;
  patientPhone: string;
  categoryName: string;
};

type TListResponse<T> = {
  list: T;
  total: number;
};

type TLoginResponse = {
  token: string;
  user: TCurrentUser;
};

type TLoginResponse = {
  token: string;
  user: TCurrentUser;
};

type TMakeAppointmentRequest = {
  patientName: string;
  patientPhone: string;
  appointmentTime: string;
  requestTime: string;
  categoryName: string;
  note: string | null;
};

type TCategory = {
  id: number;
  code: string;
  name: string;
  description: string | null;
};
