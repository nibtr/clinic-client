import CustomLayout from '@/components/CustomLayout';
import {
  ADMIN_APPOINTMENT_REQUEST_LINK,
  ADMIN_DENTIST_LINK,
  ADMIN_ROOM_LINK,
  ADMIN_STAFF_LINK,
} from '@/constants/internalLink';
import { Access, Link, Outlet, useAccess } from '@umijs/max';
import { FaCalendarPlus, FaUserNurse } from 'react-icons/fa';
import { FaUserGear } from 'react-icons/fa6';
import { MdMeetingRoom } from 'react-icons/md';
import NoFoundPage from '../404';

const menuItems: TMenuItem[] = [
  {
    key: ADMIN_STAFF_LINK,
    icon: <FaUserGear />,
    label: <Link to={ADMIN_STAFF_LINK}>Staff</Link>,
  },
  {
    key: ADMIN_DENTIST_LINK,
    icon: <FaUserNurse />,
    label: <Link to={ADMIN_DENTIST_LINK}>Dentist</Link>,
  },
  {
    key: ADMIN_APPOINTMENT_REQUEST_LINK,
    icon: <FaCalendarPlus />,
    label: <Link to={ADMIN_APPOINTMENT_REQUEST_LINK}>Appoint. Request</Link>,
  },
  {
    key: ADMIN_ROOM_LINK,
    icon: <MdMeetingRoom />,
    label: <Link to={ADMIN_ROOM_LINK}>Room</Link>,
  },
];

function Admin() {
  const access = useAccess();
  return (
    <Access accessible={access.adminRoute()} fallback={<NoFoundPage />}>
      <CustomLayout menuItems={menuItems}>
        <Outlet />
      </CustomLayout>
    </Access>
  );
}

export default Admin;
