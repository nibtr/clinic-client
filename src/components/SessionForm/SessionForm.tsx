import { DATE_FORMAT } from '@/constants/format';
import { getGender } from '@/utils/convertData';
import { SearchOutlined } from '@ant-design/icons';
import { Col, DatePicker, Drawer, Empty, Form, Input, Pagination, Row, Spin } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { Fragment } from 'react';
import ListItem from '../ListItem';
import './SessionForm.less';
import useSessionForm from './useSessionForm';

interface ISessionFormProps {
  form: FormInstance<any>;
  valueForm: {
    [x: string]: string | number;
  };
  onChangeForm: (key: string, value: string | number) => void;
}

const renderList = (
  list: TPersonnel[],
  handleCurrentPersonnel: (personnel: TPersonnel) => void,
) => {
  if (list.length === 0) {
    return <Empty description="No data" />;
  }

  return (
    <Fragment>
      {list.map((item: TPersonnel) => {
        const fields: string[] = [];
        fields.push(item.name);
        fields.push(item.dob?.split('T')[0] || '');
        fields.push(getGender(item.gender || ''));
        fields.push(item.phone);
        fields.push(item.nationalID);
        return (
          <ListItem
            onClick={() => {
              handleCurrentPersonnel(item);
            }}
            key={item.id}
            fields={fields}
            canDelete={false}
          />
        );
      })}
    </Fragment>
  );
};

const renderRoomList = (list: TRoom[], handleRoom: (room: TRoom) => void) => {
  if (list.length === 0) {
    return <Empty description="No data" />;
  }

  return (
    <Fragment>
      {list.map((item: TRoom) => {
        return (
          <Row
            key={item.id}
            justify="space-around"
            className="item-room-list trans-effect"
            onClick={() => {
              handleRoom(item);
            }}
          >
            <Col span={6} className="flex-center">
              {item.code}
            </Col>
            <Col span={16} className="flex-center">
              {item.name}
            </Col>
          </Row>
        );
      })}
    </Fragment>
  );
};

export const formKey = {
  time: 'time',
  patientID: 'patientID',
  dentistID: 'dentistID',
  assistantID: 'assistantID',
  roomID: 'roomID',
};

const getTitle = (isPersonnelList: { [x: string]: boolean }) => {
  if (isPersonnelList.dentist) {
    return 'Dentist list';
  }

  if (isPersonnelList.assistant) {
    return 'Assistant list';
  }

  return 'Patient list';
};

function SessionForm({ form, valueForm, onChangeForm }: ISessionFormProps) {
  const {
    list,
    total,
    isLoading,
    showDrawer,
    page,
    searchName,
    isPersonnelList,
    showDrawerRoom,
    roomList,
    isLoadingRoom,
    setShowDrawerRoom,
    setIsPersonnelList,
    handleCurrentPersonnel,
    setSearchName,
    setShowDrawer,
    changePage,
    onChangeTime,
    handleRoom,
  } = useSessionForm(form, valueForm, onChangeForm);

  return (
    <div className="session-form-wrapper">
      <Form.Item
        name="time"
        rules={[
          {
            required: true,
            message: 'Please input examination time!',
          },
        ]}
        label={<label>Examination time</label>}
      >
        <DatePicker
          onChange={(value) => {
            onChangeTime(value?.format(DATE_FORMAT) || '');
          }}
        />
      </Form.Item>
      <Form.Item
        name={formKey.patientID as string}
        rules={[
          {
            required: true,
            message: 'Please input patient!',
          },
        ]}
        label={<label>Patient</label>}
      >
        <Input
          placeholder="Nguyen Van A"
          onClick={() => {
            setShowDrawer(true);
            setIsPersonnelList((prev) => ({
              [formKey.patientID]: true,
              [formKey.dentistID]: false,
              [formKey.assistantID]: false,
            }));
          }}
        />
      </Form.Item>
      <Form.Item
        name={formKey.dentistID as string}
        rules={[
          {
            required: true,
            message: 'Please input dentist!',
          },
        ]}
        label={<label>Dentist</label>}
      >
        <Input
          placeholder="Nguyen Van B"
          onClick={() => {
            setShowDrawer(true);
            setIsPersonnelList((prev) => ({
              ...prev,
              [formKey.dentistID]: true,
              [formKey.assistantID]: false,
              [formKey.patientID]: false,
            }));
          }}
        />
      </Form.Item>
      <Form.Item name={formKey.assistantID as string} label={<label>Assistant</label>}>
        <Input
          placeholder="Nguyen Van B"
          onClick={() => {
            setShowDrawer(true);
            setIsPersonnelList((prev) => ({
              ...prev,
              [formKey.assistantID]: true,
              [formKey.dentistID]: false,
              [formKey.patientID]: false,
            }));
          }}
        />
      </Form.Item>
      <Form.Item
        name={formKey.roomID as string}
        rules={[
          {
            required: true,
            message: 'Please input room!',
          },
        ]}
        label={<label>Room</label>}
      >
        <Input
          placeholder="Room name"
          onClick={() => {
            setShowDrawerRoom(true);
          }}
        />
      </Form.Item>
      <Form.Item name="note">
        <Input.TextArea placeholder="Note for this session" />
      </Form.Item>
      <Drawer
        title={getTitle(isPersonnelList)}
        width={720}
        onClose={() => {
          setShowDrawer(false);
        }}
        open={showDrawer}
        extra={
          <div className="flex-center">
            <Input
              value={searchName}
              placeholder="Nguyen Van A"
              prefix={<SearchOutlined />}
              onChange={(event) => {
                setSearchName(event.target.value);
              }}
              allowClear
            />
          </div>
        }
      >
        <ListItem header fields={['Name', 'DoB', 'Gender', 'Phone', 'National ID']} />
        <section>
          {isLoading ? (
            <Row justify="center">
              <Spin />
            </Row>
          ) : (
            renderList(list, handleCurrentPersonnel)
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
        </section>
      </Drawer>
      <Drawer
        title="Room list"
        width={720}
        onClose={() => {
          setShowDrawerRoom(false);
        }}
        open={showDrawerRoom}
        className="staff-add-examination-drawer-room"
      >
        <header>
          <Row justify="space-around" className="header-room-list">
            <Col span={6} className="flex-center header-title">
              Code
            </Col>
            <Col span={16} className="flex-center header-title">
              Name
            </Col>
          </Row>
        </header>
        <section>
          {isLoadingRoom ? (
            <Row justify="center">
              <Spin />
            </Row>
          ) : (
            renderRoomList(roomList, handleRoom)
          )}
        </section>
      </Drawer>
    </div>
  );
}

export default SessionForm;
