import { STAFF_ADD_PATIENT } from '@/constants/internalLink';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';
import { Button } from 'antd';
import './Patient.less';

function Patient() {
  return (
    <main className="staff-patient-wrapper">
      <header className="header">
        <Link to={STAFF_ADD_PATIENT}>
          <Button icon={<PlusOutlined />} type="primary" className="new-patient-btn">
            New patient
          </Button>
        </Link>
      </header>
    </main>
  );
}

export default Patient;
