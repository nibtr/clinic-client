import { Form, Input, Button, Modal, DatePicker, Select, InputNumber } from 'antd';
import './Appointment.less';
import { SendOutlined, UserOutlined } from '@ant-design/icons';
import useAppointment from './useAppointment';


function Appoinment() {
    const { isModalOpen, showModal, handleCancel, form, onFinish, integerParser, categories } = useAppointment();
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 68,
                }}
                defaultValue="0"
            >
                <Select.Option value="0">+84</Select.Option>
            </Select>
        </Form.Item>
    );

    return (
        <div className='new-appointment-wrapper'>

            <Button className='btn-new-appointment' icon={<SendOutlined className='icon-new-appointment' />} type="primary" onClick={showModal}>
            </Button>
            <Modal
                closable={false}
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
                                name='patient_name'
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
                                name='patient_phone'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your phone number 10 digits!',
                                    },
                                ]}
                            >
                                <InputNumber
                                    addonBefore={prefixSelector}
                                    className='phone-item'
                                    placeholder="phone"
                                    min={0}
                                    max={999999999}
                                    parser={integerParser}
                                />
                            </Form.Item>

                            <Form.Item
                                className='form-items'
                                name='appointment_time'
                                rules={[
                                    {
                                        type: 'date',
                                        required: true,
                                        message: 'Please input your date of appointment!',
                                    },
                                ]}
                            >

                                <DatePicker
                                    showTime={{ minuteStep: 5 }}
                                    className='date-item'
                                    placeholder="date of appointment"
                                    disabledDate={(current) => {
                                        return current && current.valueOf() < Date.now();
                                    }}
                                    disabledTime={() => ({
                                        disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 17, 18, 19, 20, 21, 22, 23]
                                    })
                                    }

                                    showNow={false}
                                    hideDisabledOptions={true}
                                    format="YYYY-MM-DD HH:mm"
                                />
                            </Form.Item>
                            <Form.Item
                                className='form-items'
                                name='category'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your category of appointment!',

                                    },
                                ]}
                            >

                                <Select
                                    defaultValue="Type of category"
                                >
                                    {categories.map((category: TCategory) => {
                                        return (
                                            <Select.Option key={category.id} value={category.name}>
                                                {category.name}
                                            </Select.Option>
                                        );
                                    }
                                    )}

                                </Select>
                            </Form.Item>
                        </div>

                        <div className='form-appointment-right'>
                            <Form.Item className='form-note' name='note' >
                                <Input.TextArea placeholder='note' allowClear showCount maxLength={300} />
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