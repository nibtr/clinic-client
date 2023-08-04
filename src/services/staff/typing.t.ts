type TDentistForPatient = {
  haveDentist: boolean;
  dentist: TPersonnel;
};

interface IExaminationResponse extends TSession {
  id: number;
  status?: string;
  type: string;
  time: string;
  patientID: number;
  dentistID: number;
  assistantID?: number;
  roomID: number;
  note?: string;
  Patient: {
    id: number;
    drugContraindication: string;
    oralHealthStatus: string;
    allergyStatus: string;
    Personel: TPersonnel;
  };
  Dentist: {
    id: number;
    Personel: TPersonnel;
  };
  Assistant?: {
    id: number;
    Dentist: {
      id: number;
      Personel: TPersonnel;
    };
  };
  Room: TRoom;
}
