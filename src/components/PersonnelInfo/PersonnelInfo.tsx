import { MALE_TYPE } from '@/constants/dataQuery';
import { splitDateTime } from '@/utils/convertData';
import FieldInfo from '../FieldInfo';

interface IPersonnelInfoProps {
  personnel: TPersonnel | TPatient;
}

function PersonnelInfo({ personnel }: IPersonnelInfoProps) {
  let gender = '';
  if (personnel.gender) {
    gender = personnel.gender === MALE_TYPE ? 'male' : 'female';
  }
  return (
    <section>
      <FieldInfo label="Name" value={personnel.name} />
      <FieldInfo label="Gender" value={gender} />
      <FieldInfo label="National ID" value={personnel.nationalID} />
      <FieldInfo label="Date of Birth" value={splitDateTime(personnel.dob) || ''} />
      <FieldInfo label="Phone" value={personnel.phone} />
    </section>
  );
}

export default PersonnelInfo;
