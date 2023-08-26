import AddButton from '@/components/AddButton';
import ListItem from '@/components/ListItem';
import PersonnelList from '@/components/PersonnelList';
import { STAFF_ADD_PATIENT } from '@/constants/internalLink';
import { Link } from '@umijs/max';
import usePatient from './usePatient';

import './Patient.less';

function Patient() {
  const { listPatient, total, isLoading, page, changePage } = usePatient();

  return (
    <main className="staff-patient-wrapper">
      <header className="header">
        <ListItem header fields={['Name', 'DoB', 'Gender', 'Phone', 'National ID']} />
        <Link to={STAFF_ADD_PATIENT} className="add-btn">
          <AddButton>New Patient</AddButton>
        </Link>
      </header>

      <PersonnelList
        listPersonnel={listPatient}
        total={total}
        isLoading={isLoading}
        page={page}
        changePage={changePage}
      />
    </main>
  );
}

export default Patient;
