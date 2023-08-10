import AddButton from '@/components/AddButton';
import ListItem from '@/components/ListItem';
import SessionList from '@/components/SessionList';
import { LIMIT_PER_PAGE } from '@/constants/dataQuery';
import { STAFF_ADD_EXAMINATION } from '@/constants/internalLink';
import { useGetExamination } from '@/services/staff/services';
import { Link } from '@umijs/max';
import './Examination.less';

const getData = (page: number, isToday: boolean) => {
  const { data, isLoading } = useGetExamination(LIMIT_PER_PAGE, page - 1, isToday);
  return {
    list: data?.data.list || [],
    total: data?.data.total || 0,
    isLoading,
  };
};

function Examination() {
  return (
    <main className="staff-examination-wrapper">
      <header className="header">
        <ListItem
          header
          fields={['Time', 'Patient name', 'Dentist name', 'Assistant name', 'Room']}
        />
        <Link to={STAFF_ADD_EXAMINATION} className="add-btn">
          <AddButton>New Examination</AddButton>
        </Link>
      </header>
      <SessionList getData={getData} />
    </main>
  );
}

export default Examination;
