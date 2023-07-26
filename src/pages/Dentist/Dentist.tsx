import CustomLayout from '@/components/CustomLayout';
import { CalendarOutlined } from '@ant-design/icons';
import { Access, Outlet, useAccess } from '@umijs/max';
import NoFoundPage from '../404';

const menuItems: TMenuItem[] = [
  {
    key: '1',
    icon: <CalendarOutlined />,
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
