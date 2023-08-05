import { LIMIT_PER_PAGE } from '@/constants/dataQuery';
import {
  useGetDentistForPatient,
  useGetDentists,
  useGetPatients,
  useGetRooms,
  usePostExamination,
} from '@/services/staff/services';
import { FormInstance } from 'antd';
import { useEffect, useState } from 'react';

const getListPatient = (page: number, searchName: string) => {
  const { data, isLoading } = useGetPatients(LIMIT_PER_PAGE, page - 1, searchName);
  return {
    patientList: data?.data.list || [],
    totalPatient: data?.data.total || 0,
    isLoadingPatient: isLoading,
  };
};

const getListDentist = (page: number, searchName: string, workingDay?: string) => {
  const { data, isLoading } = useGetDentists(LIMIT_PER_PAGE, page - 1, searchName, workingDay);
  return {
    dentistList: data?.data.list || [],
    totalDentist: data?.data.total || 0,
    isLoadingDentist: isLoading,
  };
};

const getListRoom = () => {
  const { data, isLoading } = useGetRooms();
  return {
    roomList: data?.data || [],
    isLoadingRoom: isLoading,
  };
};

const getDentistForPatient = (patientID: number) => {
  const { data } = useGetDentistForPatient(patientID);
  return {
    haveDentist: data?.data.haveDentist || false,
    dentist: data?.data.dentist || null,
  };
};

const useAddExamination = (form: FormInstance<any>) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDrawerRoom, setShowDrawerRoom] = useState(false);
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [isPatientList, setIsPatientList] = useState(true);

  const [valueForm, setValueForm] = useState({
    time: '',
    patientID: -1,
    dentistID: -1,
    roomID: -1,
  });

  const { patientList, totalPatient, isLoadingPatient } = getListPatient(page, searchName);
  const { dentistList, totalDentist, isLoadingDentist } = getListDentist(
    page,
    searchName,
    valueForm.time.split(' ')[0],
  );
  const { roomList, isLoadingRoom } = getListRoom();
  const mutationPostExamination = usePostExamination();
  const { dentist, haveDentist } = getDentistForPatient(valueForm.patientID);

  useEffect(() => {
    if (haveDentist && isPatientList && dentist !== null) {
      setValueForm((prev) => ({ ...prev, dentistID: dentist.id }));
      form.setFieldValue('dentistID', dentist.name);
    }
  }, [haveDentist]);

  const changePage = (page: number) => {
    setPage(page);
  };

  const handleCurrentPersonnel = (personnel: TPersonnel) => {
    const fieldName = isPatientList ? 'patientID' : 'dentistID';
    setShowDrawer(false);
    setValueForm((prev) => ({ ...prev, [fieldName]: personnel.id }));
    form.setFieldValue(fieldName, personnel.name);
  };

  const onChangeTime = (time: string) => {
    setValueForm((prev) => ({ ...prev, time }));
  };

  const handleRoom = (room: TRoom) => {
    setShowDrawerRoom(false);
    setValueForm((prev) => ({ ...prev, roomID: room.id }));
    form.setFieldValue('roomID', room.name);
  };

  const onSubmitForm = () => {
    form.setFieldValue('time', valueForm.time);
    form.setFieldValue('patientID', valueForm.patientID);
    form.setFieldValue('dentistID', valueForm.dentistID);
    form.setFieldValue('roomID', valueForm.roomID);
    console.log(form.getFieldsValue());
    mutationPostExamination.mutate(form.getFieldsValue());
    form.resetFields();
  };

  return {
    list: isPatientList ? patientList : dentistList,
    total: isPatientList ? totalPatient : totalDentist,
    isLoading: isPatientList ? isLoadingPatient : isLoadingDentist,
    showDrawer,
    page,
    searchName,
    isPatientList,
    showDrawerRoom,
    roomList,
    isLoadingRoom,
    submitLoading: mutationPostExamination.isLoading,
    onSubmitForm,
    handleRoom,
    setShowDrawerRoom,
    handleCurrentPersonnel,
    setSearchName,
    setShowDrawer,
    setIsPatientList,
    changePage,
    onChangeTime,
  };
};

export default useAddExamination;
