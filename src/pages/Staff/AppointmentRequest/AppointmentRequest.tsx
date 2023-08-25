import ListItem from '@/components/ListItem';
import { splitDateTime } from '@/utils/convertData';
import { Checkbox, Divider, Empty, Pagination, Row, Spin } from 'antd';
import { Fragment } from 'react';
import useAppointmentRequest from './useAppointmentRequest';

const renderList = (list: TAppointmentRequest[], deleteAppointReq: (id: number) => void) => {
  if (list.length === 0) {
    return <Empty description="No data" />;
  }

  return (
    <Fragment>
      {list.map((appointmentRequest: TAppointmentRequest) => {
        const fields: string[] = [];
        fields.push(appointmentRequest.patientName);
        fields.push(appointmentRequest.patientPhone);
        fields.push(splitDateTime(appointmentRequest.appointmentTime));
        fields.push(splitDateTime(appointmentRequest.requestTime));
        fields.push(appointmentRequest.note || '');
        return (
          <ListItem
            key={appointmentRequest.id}
            fields={fields}
            onDelete={() => {
              deleteAppointReq(appointmentRequest.id);
            }}
          />
        );
      })}
    </Fragment>
  );
};

function AppointmentRequest() {
  const { list, total, isLoading, page, isToday, changePage, changeIsToday, deleteAppointReq } =
    useAppointmentRequest();
  return (
    <main>
      <header>
        <ListItem
          header
          fields={['Patient name', 'Phone', 'Appointment time', 'Request time', 'Note']}
        />
      </header>
      {isLoading ? (
        <Row justify="center">
          <Spin />
        </Row>
      ) : (
        <div>
          <Divider orientation="left" orientationMargin="0">
            <Checkbox checked={isToday} onChange={changeIsToday}>
              today
            </Checkbox>
          </Divider>
          {renderList(list, deleteAppointReq)}
        </div>
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

export default AppointmentRequest;
