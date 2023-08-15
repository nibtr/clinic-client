import { useGetCategories, useMakeAppointment } from '@/services/customer/services';
import { Form } from 'antd';
import { Moment } from 'moment';
import { useState } from 'react';
import { DATE_FORMAT } from '../../../constants/format';

type FormValues = {
  patient_name: string;
  prefix: string;
  patient_phone: string;
  appointment_time: Moment | null;
  category: string;
  note: string;
};

const useAppointment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const mutationPostAppointment = useMakeAppointment();

  // Show modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Cancel modal
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // Kiểm tra số nguyên
  const integerParser = (value: any) => {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      return 0;
    }
    return parsedValue;
  };

  // Submit form
  const onFinish = (values: FormValues) => {
    const timeAppointment: string = values.appointment_time?.format(DATE_FORMAT) || '';
    let data = {
      patientName: values['patient_name'],
      patientPhone: '0' + values['patient_phone'],
      appointmentTime: timeAppointment,
      requestTime: new Date().toISOString(),
      categoryName: values['category'],
      note: values['note'],
    };

    mutationPostAppointment.mutate(data);
    console.log('Form values:', data);
    handleCancel();
  };

  // get categories
  const { data, isLoading } = useGetCategories();
  const categories: TCategory[] = data?.data.list || [];

  return {
    onFinish,
    form,
    isModalOpen,
    handleCancel,
    showModal,
    integerParser,
    categories,
    isLoading,
  };
};

export default useAppointment;
