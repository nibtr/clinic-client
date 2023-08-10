import ListItem from '@/components/ListItem';
import { splitDateTime } from '@/utils/convertData';
import { Checkbox, Divider, Empty, Pagination, Row, Spin } from 'antd';
import { Fragment } from 'react';
import './SessionList.less';
import useSessionList from './useSessionList';

interface ISessionListProps {
  getData: TGetData;
}

const renderList = (list: ISessionResponse[], navigateToDetail: (id: number) => void) => {
  if (list.length === 0) {
    return <Empty description="No data" />;
  }
  return (
    <Fragment>
      {list.map((item) => {
        const fields: string[] = [];
        fields.push(splitDateTime(item.time));
        fields.push(item.Patient.name || '');
        fields.push(item.Dentist.name || '');
        fields.push(item.Assistant?.name || '');
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

function SessionList({ getData }: ISessionListProps) {
  const { list, total, isLoading, isToday, page, changePage, changeIsToday, navigateToDetail } =
    useSessionList(getData);
  return (
    <main className="session-list-wrapper">
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

export default SessionList;
