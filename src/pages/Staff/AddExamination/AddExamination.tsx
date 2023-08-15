import DentistSVG from '@/assets/svg/Dentist';
import SessionForm from '@/components/SessionForm';
import { STAFF_EXAMINATION_LINK } from '@/constants/internalLink';
import { Link } from '@umijs/max';
import { Breadcrumb, Button, Col, Form, Row } from 'antd';
import './AddExamination.less';
import useAddExamination from './useAddExamination';

function AddExamination() {
  const [form] = Form.useForm();
  const { valueForm, onSubmitForm, onChangeForm } = useAddExamination(form);

  return (
    <main className="staff-add-examination-wrapper">
      <Breadcrumb
        items={[
          {
            title: <Link to={STAFF_EXAMINATION_LINK}>Examination</Link>,
          },
          {
            title: 'New examination',
          },
        ]}
      />
      <Row justify="space-around">
        <Col span={6}>
          <Form form={form} className="form-wrapper" onFinish={onSubmitForm}>
            <SessionForm form={form} valueForm={valueForm} onChangeForm={onChangeForm} />
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Col span={10} className="flex-center">
          <DentistSVG width="100%" />
        </Col>
      </Row>
    </main>
  );
}

export default AddExamination;
