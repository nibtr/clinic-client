import { formKey } from '@/components/SessionForm/SessionForm';
import { usePostExamination } from '@/services/staff/services';
import { FormInstance } from 'antd';
import { useState } from 'react';

const useAddExamination = (form: FormInstance<any>) => {
  const mutationPostExamination = usePostExamination();

  const [valueForm, setValueForm] = useState({
    [formKey.time]: '',
    [formKey.patientID]: -1,
    [formKey.dentistID]: -1,
    [formKey.assistantID]: -1,
    [formKey.roomID]: -1,
  });

  const onChangeForm = (key: string, value: string | number) => {
    setValueForm({
      ...valueForm,
      [key]: value,
    });
  };

  const onSubmitForm = () => {
    form.setFieldValue(formKey.time, valueForm.time);
    form.setFieldValue(formKey.patientID, valueForm.patientID);
    form.setFieldValue(formKey.dentistID, valueForm.dentistID);
    form.setFieldValue(formKey.assistantID, valueForm.assistantID);
    form.setFieldValue(formKey.roomID, valueForm.roomID);
    // console.log(form.getFieldsValue());
    mutationPostExamination.mutate(form.getFieldsValue());
    form.resetFields();
  };

  return {
    valueForm,
    onSubmitForm,
    onChangeForm,
  };
};

export default useAddExamination;
