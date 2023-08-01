import AddButton from '@/components/AddButton';
import { STAFF_ADD_EXAMINATION } from '@/constants/internalLink';
import { Link } from '@umijs/max';

function Examination() {
  return (
    <main>
      <Link to={STAFF_ADD_EXAMINATION}>
        <AddButton>New Examination</AddButton>
      </Link>
    </main>
  );
}

export default Examination;
