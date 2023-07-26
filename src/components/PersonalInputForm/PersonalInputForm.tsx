import { Button, Col, DatePicker, Form, Input, Radio, Row } from 'antd';

function PersonalInputForm() {
  return (
    <Row justify="center">
      <Col span={8}>
        <Form>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input username!',
              },
            ]}
          >
            <Input placeholder="username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input password!',
              },
            ]}
          >
            <Input placeholder="password" />
          </Form.Item>
          <Form.Item
            name="nationalID"
            rules={[
              {
                required: true,
                message: 'Please input national ID!',
              },
            ]}
          >
            <Input placeholder="national ID" />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input name!',
              },
            ]}
          >
            <Input placeholder="name" />
          </Form.Item>

          <Row justify="space-around">
            <Col span={8}>
              <Form.Item
                name="dob"
                rules={[
                  {
                    required: true,
                    message: 'Please input date of birth!',
                  },
                ]}
              >
                <DatePicker placeholder="date of birth!" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="gender"
                rules={[
                  {
                    required: true,
                    message: 'Please select your gender!',
                  },
                ]}
              >
                <Radio.Group
                  options={[
                    {
                      label: 'male',
                      value: 'male',
                    },
                    {
                      label: 'female',
                      value: 'female',
                    },
                  ]}
                  optionType="button"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Please input phone number!',
                  },
                ]}
              >
                <Input placeholder="phone number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default PersonalInputForm;
