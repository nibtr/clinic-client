import { Form, Input, Button, Modal, DatePicker, TimePicker } from 'antd';
import { useState } from 'react';
import './Appoinment.less';
import { PhoneOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';

function Appoinment() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    const onFinish = (values: Object) => {
        console.log('Form values:', values);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsModalOpen(false);
        }, 2000);
    };
    return (
        <div className='new-appointment-wrapper'>
            <Button className='btn-new-appointment' icon={<SendOutlined />} type="primary" onClick={showModal}>
            </Button>
            <Modal
                open={isModalOpen}
                onOk={onFinish}
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
                                name={['user', 'name']}
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
                                />
                            </Form.Item>

                            <Form.Item
                                className='form-items'
                                name={['user', 'phone']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<PhoneOutlined />}
                                    placeholder="phone" />
                            </Form.Item>

                            <Form.Item
                                className='form-items'
                                name={['user', 'date_of_appointment']}
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
                                    placeholder="date of appointment" />
                            </Form.Item>

                            <Form.Item
                                className='form-items'
                                name={['user', 'time_of_appointment']}
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
                                />

                            </Form.Item>
                        </div>

                        <div className='form-appointment-right'>
                            <Form.Item className='form-note' name={['user', 'note']} >
                                <Input.TextArea placeholder='note' allowClear showCount />
                            </Form.Item>
                        </div>
                    </div>
                    <div className='form-appointment-bottom'>
                        <Form.Item>
                            <Button htmlType="submit" type="primary" loading={loading}>
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