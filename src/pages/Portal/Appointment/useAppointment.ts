import { useState } from 'react';
import { Form } from 'antd';
import { Moment } from 'moment';
import { useMakeAppointment, useGetCategories } from '@/services/customer/services';

type FormValues = {
    name: string;
    prefix: string;
    phone: string;
    date_of_appointment: Moment | null;
    time_of_appointment: Moment | null;
    category: string;
    note: string;
}

type TCategory = {
    id: number;
    code: string;
    name: string;
    description: string | null;
};


const useAppointment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    // Show modal
    const showModal = () => {
        setIsModalOpen(true);
    };

    // Cancel modal
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    // Convert Date.now() to YYYY-MM-DD HH:mm:ss:SSS
    function getCurrentTime() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

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
        const timeAppointment: string = values.date_of_appointment?.format('YYYY-MM-DD HH:mm:ss:SSS') || '';
        let data = {
            name: values['name'],
            phone: '0' + values['phone'],
            appointment_time: timeAppointment,
            request_time: getCurrentTime(),
            category: values['category'],
            note: values['note'],
        }
        // useMakeAppointment(data.name, data.phone, data.appointment_time, data.request_time, data.category, data.note);
        console.log('Form values:', data);
        handleCancel();
    };


    // get categories
    const { data, isLoading } = useGetCategories();
    const categories: TCategory[] = data?.data.list || [];



    return ({
        onFinish,
        form,
        isModalOpen,
        handleCancel,
        showModal,
        integerParser,
        categories,
        isLoading,
    })
}

export default useAppointment;