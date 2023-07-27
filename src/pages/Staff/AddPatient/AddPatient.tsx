import PatientSVG from '@/assets/svg/Patient';
import PersonalInputForm from '@/components/PersonalInputForm';
import { STAFF_PATIENT_LINK } from '@/constants/internalLink';
import { Link } from '@umijs/max';
import { Breadcrumb, Col, Row } from 'antd';
import './AddPatient.less';

function AddPatient() {
  return (
    <main className="staff-add-patient-wrapper">
      <Breadcrumb
        items={[
          {
            title: <Link to={STAFF_PATIENT_LINK}>Patient</Link>,
          },
          {
            title: 'New patient',
          },
        ]}
      />
      <Row justify="space-around">
        <Col span={8} className="wrap-form">
          <PersonalInputForm />
        </Col>
        <Col span={8}>
          <PatientSVG width="100%" />
        </Col>
      </Row>
    </main>
  );
}

export default AddPatient;
