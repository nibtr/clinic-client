import AddButton from '@/components/AddButton';
import ListItem from '@/components/ListItem';
import { STAFF_ADD_EXAMINATION } from '@/constants/internalLink';
import { splitDateTime } from '@/utils/convertData';
import { Link } from '@umijs/max';
import { Checkbox, Divider, Empty, Pagination, Row, Spin } from 'antd';
import { Fragment } from 'react';
import './Examination.less';
import useExamination from './useExamination';

const renderList = (list: IExaminationResponse[], navigateToDetail: (id: number) => void) => {
  if (list.length === 0) {
    return <Empty description="No data" />;
  }
  return (
    <Fragment>
      {list.map((item) => {
        const fields: string[] = [];
        fields.push(splitDateTime(item.time));
        fields.push(item.Patient.Personel.name || '');
        fields.push(item.Dentist.Personel.name || '');
        fields.push(item.Assistant?.Dentist.Personel.name || '');
        fields.push(item.Room.name);
        return (
          <ListItem
            key={item.id}
            fields={fields}
            onClick={() => {
              navigateToDetail(item.id);
            }}
          />
        );
      })}
    </Fragment>
  );
};

function Examination() {
  const { list, total, isLoading, isToday, page, changePage, changeIsToday, navigateToDetail } =
    useExamination();
  return (
    <main className="staff-examination-wrapper">
      <header className="header">
        <ListItem
          header
          fields={['Time', 'Patient name', 'Dentist name', 'Assistant name', 'Room']}
        />
        <Link to={STAFF_ADD_EXAMINATION} className="add-btn">
          <AddButton>New Examination</AddButton>
        </Link>
      </header>
      {isLoading ? (
        <Row justify="center">
          <Spin />
        </Row>
      ) : (
        <Fragment>
          <Divider orientation="left" orientationMargin="0">
            <Checkbox checked={isToday} onChange={changeIsToday}>
              today
            </Checkbox>
          </Divider>
          {renderList(list, navigateToDetail)}
        </Fragment>
      )}
      {!isLoading && (
        <Row justify="end">
          <Pagination
            size="small"
            current={page}
            total={total}
            showSizeChanger={false}
            onChange={changePage}
          />
        </Row>
      )}
    </main>
  );
}

export default Examination;
true;
