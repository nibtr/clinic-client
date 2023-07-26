import PersonalInputForm from '@/components/PersonalInputForm';
import { ADMIN_STAFF_LINK } from '@/constants/internalLink';
import { Link } from '@umijs/max';
import { Breadcrumb } from 'antd';

function AddStaff() {
  return (
    <main>
      <Breadcrumb
        items={[
          {
            title: <Link to={ADMIN_STAFF_LINK}>Staff</Link>,
          },
          {
            title: 'New staff',
          },
        ]}
      />
      <PersonalInputForm />
    </main>
  );
}

export default AddStaff;
