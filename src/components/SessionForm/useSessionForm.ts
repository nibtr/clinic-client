import { LIMIT_PER_PAGE } from '@/constants/dataQuery';
import {
  useGetAssistants,
  useGetDentistForPatient,
  useGetDentists,
  useGetPatients,
  useGetRooms,
  usePostExamination,
} from '@/services/staff/services';
import { FormInstance } from 'antd';
import { useEffect, useState } from 'react';
import { formKey } from './SessionForm';

const getListPatient = (page: number, searchName: string) => {
  const { data, isLoading } = useGetPatients(LIMIT_PER_PAGE, page - 1, searchName);
  return {
    patientList: data?.data.list || [],
    totalPatient: data?.data.total || 0,
    isLoadingPatient: isLoading,
  };
};

const getListAssistant = (page: number, searchName: string) => {
  const { data, isLoading } = useGetAssistants(LIMIT_PER_PAGE, page - 1, searchName);
  return {
    assistantList: data?.data.list || [],
    totalAssistant: data?.data.total || 0,
    isLoadingAssistant: isLoading,
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

const useSessionForm = (
  form: FormInstance<any>,
  valueForm: {
    [x: string]: string | number;
  },
  onChangeForm: (key: string, value: string | number) => void,
) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDrawerRoom, setShowDrawerRoom] = useState(false);
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [isPersonnelList, setIsPersonnelList] = useState({
    [formKey.patientID]: true,
    [formKey.dentistID]: false,
    [formKey.assistantID]: false,
  });

  const time = valueForm[formKey.time] as string;
  const { patientList, totalPatient, isLoadingPatient } = getListPatient(page, searchName);
  const { assistantList, totalAssistant, isLoadingAssistant } = getListAssistant(page, searchName);
  const { dentistList, totalDentist, isLoadingDentist } = getListDentist(
    page,
    searchName,
    time.split(' ')[0],
  );
  const { roomList, isLoadingRoom } = getListRoom();
  const mutationPostExamination = usePostExamination();
  const { dentist, haveDentist } = getDentistForPatient(valueForm[formKey.patientID] as number);

  useEffect(() => {
    if (haveDentist && isPersonnelList[formKey.patientID] && dentist !== null) {
      onChangeForm(formKey.dentistID, dentist.id);
      form.setFieldValue(formKey.dentistID, dentist.name);
      form.validateFields([formKey.dentistID]);
    }
  }, [haveDentist]);

  const changePage = (page: number) => {
    setPage(page);
  };

  const getFieldName = () => {
    if (isPersonnelList[formKey.patientID]) {
      return formKey.patientID;
    }

    if (isPersonnelList[formKey.dentistID]) {
      return formKey.dentistID;
    }

    return formKey.assistantID;
  };

  const getList = () => {
    if (isPersonnelList[formKey.patientID]) {
      return patientList;
    }

    if (isPersonnelList[formKey.dentistID]) {
      return dentistList;
    }

    return assistantList;
  };

  const getTotal = () => {
    if (isPersonnelList[formKey.patientID]) {
      return totalPatient;
    }

    if (isPersonnelList[formKey.dentistID]) {
      return totalDentist;
    }

    return totalAssistant;
  };

  const getIsLoading = () => {
    if (isPersonnelList[formKey.patientID]) {
      return isLoadingPatient;
    }

    if (isPersonnelList[formKey.dentistID]) {
      return isLoadingDentist;
    }

    return isLoadingAssistant;
  };

  const handleCurrentPersonnel = (personnel: TPersonnel) => {
    const fieldName = getFieldName();
    setShowDrawer(false);
    onChangeForm(fieldName, personnel.id);
    form.setFieldValue(fieldName, personnel.name);
    form.validateFields([fieldName]);
  };

  const onChangeTime = (time: string) => {
    onChangeForm(formKey.time, time);
  };

  const handleRoom = (room: TRoom) => {
    setShowDrawerRoom(false);
    onChangeForm(formKey.roomID, room.id);
    form.setFieldValue(formKey.roomID, room.name);
    form.validateFields([formKey.roomID]);
  };

  return {
    list: getList(),
    total: getTotal(),
    isLoading: getIsLoading(),
    showDrawer,
    page,
    searchName,
    isPersonnelList,
    showDrawerRoom,
    roomList,
    isLoadingRoom,
    submitLoading: mutationPostExamination.isLoading,
    handleRoom,
    setShowDrawerRoom,
    handleCurrentPersonnel,
    setSearchName,
    setShowDrawer,
    setIsPersonnelList,
    changePage,
    onChangeTime,
  };
};

export default useSessionForm;
