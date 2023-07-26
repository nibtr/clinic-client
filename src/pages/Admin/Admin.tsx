import CustomLayout from '@/components/CustomLayout';
import {
  ADMIN_APPOINTMENT_REQUEST_LINK,
  ADMIN_DENTIST_LINK,
  ADMIN_ROOM_LINK,
  ADMIN_STAFF_LINK,
} from '@/constants/internalLink';
import {
  ApartmentOutlined,
  CalendarOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
import { Access, Link, Outlet, useAccess } from '@umijs/max';
import NoFoundPage from '../404';

const menuItems: TMenuItem[] = [
  {
    key: ADMIN_STAFF_LINK,
    icon: <UserDeleteOutlined />,
    label: <Link to={ADMIN_STAFF_LINK}>Staff</Link>,
  },
  {
    key: ADMIN_DENTIST_LINK,
    icon: <UserAddOutlined />,
    label: <Link to={ADMIN_DENTIST_LINK}>Dentist</Link>,
  },
  {
    key: ADMIN_APPOINTMENT_REQUEST_LINK,
    icon: <CalendarOutlined />,
    label: <Link to={ADMIN_APPOINTMENT_REQUEST_LINK}>Appoint. Request</Link>,
  },
  {
    key: ADMIN_ROOM_LINK,
    icon: <ApartmentOutlined />,
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
