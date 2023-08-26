import { ReactNode } from 'react';
import './FieldInfo.less';

interface IFieldInfoProps {
  label: string;
  value: ReactNode;
}

function FieldInfo({ label, value }: IFieldInfoProps) {
  return (
    <div className="flex-center field-info-wrapper">
      <label className="label">{label}:</label> <span className="value">{value}</span>
    </div>
  );
}

export default FieldInfo;
