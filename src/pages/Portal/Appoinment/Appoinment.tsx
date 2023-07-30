import { Form, Input, Button, Modal, DatePicker, TimePicker, Select, InputNumber } from 'antd';
import { useState } from 'react';
import './Appoinment.less';
import { SendOutlined, UserOutlined } from '@ant-design/icons';
import { Moment } from 'moment';

interface FormValues {
    name: string;
    prefix: string;
    phone: string;
    date_of_appointment: Moment | null;
    time_of_appointment: Moment | null;
    note: string;
}

function Appoinment() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    const onFinish = (values: FormValues) => {
        let data = {
            name: values['name'],
            phone: values['prefix'] + values['phone'],
            date_of_appointment: values.date_of_appointment?.format('DD/MM/YYYY'),
            time_of_appointment: values.time_of_appointment?.format('HH:mm'),
            note: values['note']
        }
        console.log('Form values:', data);
        handleCancel();
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 68,
                }}
                defaultValue="+84"
            >
                <Select.Option value="+84">+84</Select.Option>
                <Select.Option value="+82">+82</Select.Option>
                <Select.Option value="+86">+86</Select.Option>
                <Select.Option value="+886">+886</Select.Option>
            </Select>
        </Form.Item>
    );

    return (
        <div className='new-appointment-wrapper'>

            <Button className='btn-new-appointment' icon={<SendOutlined />} type="primary" onClick={showModal}>
            </Button>
            <Modal
                closeIcon={true}
                open={isModalOpen}
                footer={null}
            >
                <Form
                    form={form}
                    className="form-appointment-wrapper"
                    onFinish={onFinish}
                >
                    <div className="form-appointment-top">
                        <div className='form-appointment-left'>
                            <Form.Item
                                className='form-items'
                                name='name'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="name"
                                    autoComplete="off"
                                />
                            </Form.Item>

                            <Form.Item
                                className='form-items'
                                name='phone'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone!',
                                    },
                                ]}
                            >
                                <InputNumber
                                    addonBefore={prefixSelector}
                                    className='phone-item'
                                    placeholder="phone"
                                    min={0}
                                />
                            </Form.Item>

                            <Form.Item
                                className='form-items'
                                name='date_of_appointment'
                                rules={[
                                    {
                                        type: 'date',
                                        required: true,
                                        message: 'Please input your date of appointment!',
                                    },
                                ]}
                            >

                                <DatePicker
                                    className='date-item'
                                    placeholder="date of appointment"
                                    // disable date before today
                                    disabledDate={(current) => {
                                        return current && current.valueOf() < Date.now();
                                    }}
                                    hideDisabledOptions={true}
                                    format={'DD/MM/YYYY'}
                                />
                            </Form.Item>

                            <Form.Item
                                className='form-items'
                                name='time_of_appointment'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your time of appointment!',

                                    },
                                ]}
                            >
                                <TimePicker
                                    className='time-item'
                                    placeholder="time of appointment"
                                    format={'HH:mm'}
                                    disabledTime={() => ({
                                        disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 17, 18, 19, 20, 21, 22, 23]
                                    })
                                    }
                                    disabledDate={(current) => {
                                        return current && current.valueOf() < Date.now();
                                    }}
                                    hideDisabledOptions={true}
                                    minuteStep={5}
                                    showNow={false}
                                />

                            </Form.Item>
                        </div>

                        <div className='form-appointment-right'>
                            <Form.Item className='form-note' name='note' >
                                <Input.TextArea placeholder='note' allowClear showCount />
                            </Form.Item>
                        </div>
                    </div>
                    <div className='form-appointment-bottom'>
                        <Form.Item>
                            <Button htmlType="submit" type="primary">
                                Submit
                            </Button>
                            <Button onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </div>
                </Form>

            </Modal>
        </div>
    )
}


export default Appoinment;