import CustomLayout from '@/components/CustomLayout';
import {
  STAFF_APPOINTMENT_REQUEST_LINK,
  STAFF_DENTIST_LINK,
  STAFF_EXAMINATION_LINK,
  STAFF_PATIENT_LINK,
  STAFF_ROOM_LINK,
  STAFF_TREATMENT_SESSION_LINK,
} from '@/constants/internalLink';
import { Access, Link, Outlet, useAccess } from '@umijs/max';
import { BiSolidInjection } from 'react-icons/bi';
import { FaCalendarCheck, FaCalendarPlus, FaUserNurse } from 'react-icons/fa';
import { MdMeetingRoom, MdSick } from 'react-icons/md';

import NoFoundPage from '../404';

const menuItems: TMenuItem[] = [
  {
    key: STAFF_EXAMINATION_LINK,
    icon: <FaCalendarCheck />,
    label: <Link to={STAFF_EXAMINATION_LINK}>Examination</Link>,
  },
  {
    key: STAFF_APPOINTMENT_REQUEST_LINK,
    icon: <FaCalendarPlus />,
    label: <Link to={STAFF_APPOINTMENT_REQUEST_LINK}>Appoint. request</Link>,
  },
  {
    key: STAFF_TREATMENT_SESSION_LINK,
    icon: <BiSolidInjection />,
    label: <Link to={STAFF_TREATMENT_SESSION_LINK}>Treatment session</Link>,
  },
  {
    key: STAFF_DENTIST_LINK,
    icon: <FaUserNurse />,
    label: <Link to={STAFF_DENTIST_LINK}>Dentist</Link>,
  },
  {
    key: STAFF_PATIENT_LINK,
    icon: <MdSick />,
    label: <Link to={STAFF_PATIENT_LINK}>Patient</Link>,
  },
  {
    key: STAFF_ROOM_LINK,
    icon: <MdMeetingRoom />,
    label: <Link to={STAFF_ROOM_LINK}>Room</Link>,
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
