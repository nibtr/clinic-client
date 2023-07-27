import CustomLayout from '@/components/CustomLayout';
import { STAFF_APPOINTMENT_LINK } from '@/constants/internalLink';
import { Access, Outlet, useAccess } from '@umijs/max';
import { FaCalendarCheck, FaCalendarPlus } from 'react-icons/fa';
import { MdMeetingRoom, MdSick } from 'react-icons/md';

import NoFoundPage from '../404';

const menuItems: TMenuItem[] = [
  {
    key: STAFF_APPOINTMENT_LINK,
    icon: <FaCalendarCheck />,
    label: 'Appointment',
  },
  {
    key: '2',
    icon: <FaCalendarPlus />,
    label: 'Appoint. request',
  },
  {
    key: '3',
    icon: <MdSick />,
    label: 'Patient',
  },
  {
    key: '4',
    icon: <MdMeetingRoom />,
    label: 'Room',
  },
];

function Staff() {
  const access = useAccess();
  return (
    <Access accessible={access.staffRoute()} fallback={<NoFoundPage />}>
      <CustomLayout menuItems={menuItems}>
        <Outlet />
      </CustomLayout>
    </Access>
  );
}

export default Staff;
