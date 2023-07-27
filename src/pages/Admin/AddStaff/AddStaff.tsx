import Operator from '@/assets/svg/Operator';
import PersonalInputForm from '@/components/PersonalInputForm';
import { ADMIN_STAFF_LINK } from '@/constants/internalLink';
import { Link } from '@umijs/max';
import { Breadcrumb, Col, Row } from 'antd';
import './AddStaff.less';

function AddStaff() {
  return (
    <main className="admin-add-staff-wrapper">
      <Breadcrumb
        items={[
          {
            title: <Link to={ADMIN_STAFF_LINK}>Staff</Link>,
          },
          {
            title: 'New staff',
          },
        ]}
      />
      <Row justify="space-around">
        <Col span={8} className="wrap-form">
          <PersonalInputForm />
        </Col>
        <Col span={8}>
          <Operator width="100%" />
        </Col>
      </Row>
    </main>
  );
}

export default AddStaff;
