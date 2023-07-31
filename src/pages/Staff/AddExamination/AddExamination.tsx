import DentistSVG from '@/assets/svg/Dentist';
import ListItem from '@/components/ListItem';
import { DATE_FORMAT } from '@/constants/format';
import { STAFF_EXAMINATION_LINK } from '@/constants/internalLink';
import { getGender } from '@/utils/convertData';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Drawer,
  Empty,
  Form,
  Input,
  Pagination,
  Row,
  Spin,
} from 'antd';
import { Fragment } from 'react';
import './AddExamination.less';
import useAddExamination from './useAddExamination';

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

function AddExamination() {
  const [form] = Form.useForm();
  const {
    list,
    total,
    isLoading,
    showDrawer,
    page,
    searchName,
    isPatientList,
    showDrawerRoom,
    roomList,
    isLoadingRoom,
    submitLoading,
    onSubmitForm,
    setShowDrawerRoom,
    setIsPatientList,
    handleCurrentPersonnel,
    setSearchName,
    setShowDrawer,
    changePage,
    onChangeTime,
    handleRoom,
  } = useAddExamination(form);

  return (
    <main className="staff-add-examination-wrapper">
      <Breadcrumb
        items={[
          {
            title: <Link to={STAFF_EXAMINATION_LINK}>Examination</Link>,
          },
          {
            title: 'New examination',
          },
        ]}
      />
      <Row justify="space-around">
        <Col span={6}>
          <Form form={form} className="form-wrapper" onFinish={onSubmitForm}>
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
              name="patientID"
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
                  setIsPatientList(true);
                }}
              />
            </Form.Item>
            <Form.Item
              name="dentistID"
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
                  setIsPatientList(false);
                }}
              />
            </Form.Item>
            <Form.Item
              name="roomID"
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
              <Input.TextArea placeholder="Note" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" loading={submitLoading}>
                Submit
              </Button>
            </Form.Item>
            <Drawer
              title={isPatientList ? 'Patient list' : 'Dentist list'}
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
          </Form>
        </Col>

        <Col span={10} className="flex-center">
          <DentistSVG width="100%" />
        </Col>
      </Row>
    </main>
  );
}

export default AddExamination;
