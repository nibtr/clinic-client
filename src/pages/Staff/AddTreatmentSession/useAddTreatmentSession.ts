import { formKey } from '@/components/SessionForm/SessionForm';
import { useGetCategories, useGetTeeth, usePostTreatmentSession } from '@/services/staff/services';
import { FormInstance } from 'antd';
import { useState } from 'react';

type TTeethData = {
  toothID: number;
  order: number;
};

const getTeeth = () => {
  const { data } = useGetTeeth();

  return {
    teeth: data?.data || [],
  };
};

const getCategories = () => {
  const { data } = useGetCategories();

  return {
    categories: data?.data || [],
  };
};

const refactorTeethData = (toothList: number[], form: FormInstance<any>) => {
  const formValue = form.getFieldsValue();
  const teethData: TTeethData[] = [];
  toothList.forEach((toothID) => {
    teethData.push({
      toothID: formValue[`toothID${toothID}`],
      order: Number(formValue[`order${toothID}`]),
    });
  });

  return teethData;
};

const useAddTreatmentSession = (form: FormInstance<any>) => {
  const [valueForm, setValueForm] = useState({
    [formKey.time]: '',
    [formKey.patientID]: -1,
    [formKey.dentistID]: -1,
    [formKey.assistantID]: -1,
    [formKey.roomID]: -1,
  });
  const [toothID, setToothID] = useState<number>(1);
  const [toothList, setToothList] = useState<number[]>([0]);
  const [procedureList, setProcedureList] = useState<TProcedure[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const mutationTreatmentSession = usePostTreatmentSession();

  const onChangeForm = (key: string, value: string | number) => {
    setValueForm({
      ...valueForm,
      [key]: value,
    });
  };

  const addTooth = () => {
    setToothList([...toothList, toothID]);
    setToothID(toothID + 1);
  };

  const removeTooth = (index: number) => {
    setToothList(toothList.filter((_, i) => i !== index));
  };

  const { teeth } = getTeeth();
  const { categories } = getCategories();

  const handleChangeCategory = (id: number) => {
    const category = categories.find((item) => item.id === id);
    if (category) {
      setProcedureList(category.Procedure);
    }
  };

  const onSubmitForm = () => {
    const submitData: TTreatmentSessionPost = {
      dentistID: Number(valueForm.dentistID),
      patientID: Number(valueForm.patientID),
      assistantID: Number(valueForm.assistantID),
      roomID: Number(valueForm.roomID),
      time: valueForm.time as string,
      teeth: refactorTeethData(toothList, form),
      note: form.getFieldValue('note'),
      healthNote: form.getFieldValue('healthNote'),
      description: form.getFieldValue('description'),
      categoryID: form.getFieldValue('categoryID'),
    };
    mutationTreatmentSession.mutate(submitData);
    console.log(submitData);
    form.resetFields();
  };

  return {
    valueForm,
    teeth,
    toothList,
    categories,
    procedureList,
    showModal,
    setShowModal,
    handleChangeCategory,
    addTooth,
    removeTooth,
    onSubmitForm,
    onChangeForm,
  };
};

export default useAddTreatmentSession;
