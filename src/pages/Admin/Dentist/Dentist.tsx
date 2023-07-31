import AddButton from '@/components/AddButton';
import { ADMIN_ADD_DENTIST } from '@/constants/internalLink';
import { Link } from '@umijs/max';
import './Dentist.less';

function Dentist() {
  return (
    <main className="admin-dentist-page-wrapper">
      <header className="header">
        <Link to={ADMIN_ADD_DENTIST}>
          <AddButton>New Dentist</AddButton>
        </Link>
      </header>
    </main>
  );
}

export default Dentist;
