import { Link } from '@umijs/max';
import ListItem from '@/components/ListItem';
import AddButton from '@/components/AddButton';
import { STAFF_ADD_DENTIST } from '@/constants/internalLink';
import PersonnelList from '@/components/PersonnelList';

import './Dentist.less';
import useDentist from './useDentist';

function Dentist() {
  const { listDentist, total, isLoading, page, changePage } = useDentist();

  return <main className='staff-dentist-wrapper'>
    <header className="header">
      <ListItem
        header
        fields={['Name', 'DoB', 'Gender', 'Phone', 'National ID']}
      />
      <Link to={STAFF_ADD_DENTIST} className="add-btn">
        <AddButton>New Dentist</AddButton>
      </Link>
    </header>
    <PersonnelList
      listPersonnel={listDentist}
      total={total}
      isLoading={isLoading}
      page={page}
      changePage={changePage}
    />
  </main>;
}

export default Dentist;
