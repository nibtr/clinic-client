import Dentist from '@/assets/svg/Dentist';
import PersonalInputForm from '@/components/PersonalInputForm';
import { ADMIN_DENTIST_LINK } from '@/constants/internalLink';
import { Link } from '@umijs/max';
import { Breadcrumb, Col, Row } from 'antd';
import './AddDentist.less';

function AddDentist() {
  return (
    <main className="admin-add-dentist-wrapper">
      <Breadcrumb
        items={[
          {
            title: <Link to={ADMIN_DENTIST_LINK}>Dentist</Link>,
          },
          {
            title: 'New dentist',
          },
        ]}
      />
      <Row justify="space-around">
        <Col span={8} className="wrap-form">
          <PersonalInputForm />
        </Col>
        <Col span={8}>
          <Dentist width="100%" />
        </Col>
      </Row>
    </main>
  );
}

export default AddDentist;
