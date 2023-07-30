import { Form, Input, Button, Modal, DatePicker, TimePicker, Select, InputNumber } from 'antd';
import { useState } from 'react';
import './Appoinment.less';
import { PhoneOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';


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
    const onFinish = (values: Object) => {
        //format date_of_appointment
        console.log('Form values:', values);
        setIsModalOpen(false);
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 68,
                }}
            >
                <Select.Option value="84">+84</Select.Option>
                <Select.Option value="85">+85</Select.Option>
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
                                    prefix={<PhoneOutlined />}
                                    placeholder="phone"
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