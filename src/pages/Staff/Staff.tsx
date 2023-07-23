import CustomLayout from '@/components/CustomLayout';
import {
  ApartmentOutlined,
  CalendarOutlined,
  CarryOutOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
import { Access, useAccess } from '@umijs/max';
import NoFoundPage from '../404';

const menuItems: TMenuItem[] = [
  {
    key: '1',
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
        <section>Staff</section>
      </CustomLayout>
    </Access>
  );
}

export default Staff;
