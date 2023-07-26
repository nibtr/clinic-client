import { ADMIN_ADD_STAFF } from '@/constants/internalLink';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';
import { Button } from 'antd';
import './Staff.less';

function Staff() {
  return (
    <main className="admin-staff-page-wrapper">
      <header className="header">
        <Link to={ADMIN_ADD_STAFF}>
          <Button icon={<PlusOutlined />} type="primary" className="new-staff-btn">
            New staff
          </Button>
        </Link>
      </header>
    </main>
  );
}

export default Staff;
