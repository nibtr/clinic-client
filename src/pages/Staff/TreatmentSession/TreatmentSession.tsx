import AddButton from '@/components/AddButton';
import ListItem from '@/components/ListItem';
import SessionList from '@/components/SessionList';
import { LIMIT_PER_PAGE } from '@/constants/dataQuery';
import { STAFF_ADD_TREATMENT_SESSION } from '@/constants/internalLink';
import { useGetTreatmentSession } from '@/services/staff/services';
import { Link } from '@umijs/max';
import './TreatmentSession.less';

const getData = (page: number, isToday: boolean) => {
  const { data, isLoading } = useGetTreatmentSession(LIMIT_PER_PAGE, page - 1, isToday);
  return {
    list: data?.data.list || [],
    total: data?.data.total || 0,
    isLoading,
  };
};

function TreatmentSession() {
  return (
    <main className="staff-treatment-session-wrapper">
      <header className="header">
        <ListItem
          header
          fields={['Time', 'Patient name', 'Dentist name', 'Assistant name', 'Room']}
        />
        <Link to={STAFF_ADD_TREATMENT_SESSION} className="add-btn">
          <AddButton>New treatment session</AddButton>
        </Link>
      </header>
      <SessionList getData={getData} />
    </main>
  );
}

export default TreatmentSession;
