import { ADMIN_ADD_DENTIST } from '@/constants/internalLink';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';
import { Button } from 'antd';
import './Dentist.less';

function Dentist() {
  return (
    <main className="admin-dentist-page-wrapper">
      <header className="header">
        <Link to={ADMIN_ADD_DENTIST}>
          <Button icon={<PlusOutlined />} type="primary" className="new-dentist-btn">
            New dentist
          </Button>
        </Link>
      </header>
    </main>
  );
}

export default Dentist;
