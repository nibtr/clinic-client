import CustomLayout from '@/components/CustomLayout';
import { STAFF_APPOINTMENT_LINK } from '@/constants/internalLink';
import {
  ApartmentOutlined,
  CalendarOutlined,
  CarryOutOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
import { Access, Outlet, useAccess } from '@umijs/max';
import NoFoundPage from '../404';

const menuItems: TMenuItem[] = [
  {
    key: STAFF_APPOINTMENT_LINK,
    icon: <CarryOutOutlined />,
    label: 'Appointment',
  },
  {
    key: '2',
    icon: <CalendarOutlined />,
    label: 'Appoint. request',
  },
  {
    key: '3',
    icon: <UserDeleteOutlined />,
    label: 'Patient',
  },
  {
    key: '4',
    icon: <ApartmentOutlined />,
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
