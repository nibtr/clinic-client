import CustomLayout from '@/components/CustomLayout';
import {
  ADMIN_APPOINTMENT_REQUEST_LINK,
  ADMIN_DENTIST_LINK,
  ADMIN_ROOM_LINK,
  ADMIN_STAFF_LINK,
} from '@/constants/internalLink';
import { UserSwitchOutlined } from '@ant-design/icons';
import { Access, Link, Outlet, useAccess } from '@umijs/max';
import NoFoundPage from '../404';

const menuItems: TMenuItem[] = [
  {
    key: '1',
    icon: <UserSwitchOutlined />,
    label: <Link to={ADMIN_STAFF_LINK}>Staff</Link>,
  },
  {
    key: '2',
    icon: <UserSwitchOutlined />,
    label: <Link to={ADMIN_DENTIST_LINK}>Dentist</Link>,
  },
  {
    key: '3',
    icon: <UserSwitchOutlined />,
    label: <Link to={ADMIN_APPOINTMENT_REQUEST_LINK}>Appoint. Request</Link>,
  },
  {
    key: '4',
    icon: <UserSwitchOutlined />,
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
