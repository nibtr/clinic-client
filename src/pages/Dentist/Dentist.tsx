import CustomLayout from '@/components/CustomLayout';
import { DENTIST_APPOINTMENT_LINK } from '@/constants/internalLink';
import { Access, Outlet, useAccess } from '@umijs/max';
import { FaCalendarPlus } from 'react-icons/fa';
import NoFoundPage from '../404';

const menuItems: TMenuItem[] = [
  {
    key: DENTIST_APPOINTMENT_LINK,
    icon: <FaCalendarPlus />,
    label: 'Appointment',
  },
];

function Dentist() {
  const access = useAccess();
  return (
    <Access accessible={access.dentistRoute()} fallback={<NoFoundPage />}>
      <CustomLayout menuItems={menuItems}>
        <Outlet />
      </CustomLayout>
    </Access>
  );
}

export default Dentist;
