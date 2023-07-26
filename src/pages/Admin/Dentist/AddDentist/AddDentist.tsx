import PersonalInputForm from '@/components/PersonalInputForm';
import { ADMIN_DENTIST_LINK } from '@/constants/internalLink';
import { Link } from '@umijs/max';
import { Breadcrumb } from 'antd';

function AddDentist() {
  return (
    <main>
      <Breadcrumb
        items={[
          {
            title: <Link to={ADMIN_DENTIST_LINK}>Dentist</Link>,
          },
          {
            title: 'New dentist',
          },
        ]}
      />
      <PersonalInputForm />
    </main>
  );
}

export default AddDentist;
