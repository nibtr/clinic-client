type TDentistForPatient = {
  haveDentist: boolean;
  dentist: TPersonnel;
};

interface ISessionResponse extends TSession {
  id: number;
  status?: string;
  type: string;
  time: string;
  patientID: number;
  dentistID: number;
  assistantID?: number;
  roomID: number;
  note?: string;
  Patient: TPatient;
  Dentist: TPersonnel;
  Assistant?: TPersonnel;
  Room: TRoom;
}

type TTreatmentSessionPost = {
  dentistID: number;
  patientID: number;
  assistantID?: number;
  roomID: number;
  time: string;
  teeth: {
    toothID: number;
    order: number;
  }[];
  note?: string;
  healthNote?: string;
  description?: string;
  categoryID: number;
};

type TTreatmentSessionDetail = {
  id: number;
  healthNote: string;
  description: string;
  categoryID: number;
  Session: TSession;
  Category: TCategory;
  Prescription: TPrescription[];
  ToothSession: TToothSession[];
  PaymentRecord: TPaymentRecord[];
};
