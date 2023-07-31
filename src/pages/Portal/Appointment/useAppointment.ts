import { useState } from 'react';
import { Form, Input, Button, Modal, DatePicker, TimePicker, Select, InputNumber } from 'antd';

import { Moment } from 'moment';

interface FormValues {
    name: string;
    prefix: string;
    phone: string;
    date_of_appointment: Moment | null;
    time_of_appointment: Moment | null;
    note: string;
}
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


    // Submit form
    const onFinish = (values: FormValues) => {
        const phoneData: string = values['prefix']?.toString() || '+84' + values['phone'];
        const timeAppointment: string = values.date_of_appointment?.format('YYYY-MM-DD') + ' ' + values.time_of_appointment?.format('HH:mm:ss:SSS');
        let data = {
            name: values['name'],
            phone: phoneData,
            note: values['note'],
            appointment_time: timeAppointment,
            request_time: getCurrentTime(),
        }
        console.log('Form values:', data);
        handleCancel();
    };

    return ({
        onFinish,
        form,
        isModalOpen,
        handleCancel,
        showModal,
    })
}

export default useAppointment;