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
