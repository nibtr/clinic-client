import ToothImage from '@/assets/images/so-do-rang.png';
import SessionForm from '@/components/SessionForm';
import { STAFF_TREATMENT_SESSION_LINK } from '@/constants/internalLink';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Empty,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Tooltip,
  Typography,
} from 'antd';
import { BiTrash } from 'react-icons/bi';
import { FiAlignCenter } from 'react-icons/fi';
import './AddTreatmentSession.less';
import useAddTreatmentSession from './useAddTreatmentSession';

interface IToothItem {
  id: number;
  teeth: TTeeth[];
  removeTooth: () => void;
  disableDelete: boolean;
}

const getOptions = (teeth: TTeeth[]) => {
  return teeth.map((tooth) => {
    return {
      label: tooth.name + ' - ' + tooth.type,
      value: tooth.id,
    };
  });
};

const getCategoryOptions = (categories: TCategory[]) => {
  return categories.map((category) => {
    return {
      label: category.name + ' - ' + category.code,
      value: category.id,
    };
  });
};

const ToothItem = ({ id, teeth, disableDelete, removeTooth }: IToothItem) => {
  return (
    <Row justify="space-around">
      <Col span={6} className="flex-center">
        <Form.Item
          name={`order${id}`}
          rules={[
            {
              required: true,
              message: 'required!',
            },
          ]}
        >
          <Input placeholder="11,12,13,..." />
        </Form.Item>
      </Col>
      <Col span={16} className="flex-center">
        <Form.Item
          name={`toothID${id}`}
          rules={[
            {
              required: true,
              message: 'Please input tooth order!',
            },
          ]}
          className="select-tooth-wrapper"
        >
          <Select className="select-tooth" options={getOptions(teeth)} />
        </Form.Item>
      </Col>
      <Col span={2} className="flex-center">
        <Button danger disabled={disableDelete} className="delete-tooth-btn" onClick={removeTooth}>
          <BiTrash />
        </Button>
      </Col>
    </Row>
  );
};

function AddTreatmentSession() {
  const [form] = Form.useForm();
  const {
    valueForm,
    teeth,
    toothList,
    categories,
    procedureList,
    showModal,
    setShowModal,
    handleChangeCategory,
    addTooth,
    removeTooth,
    onSubmitForm,
    onChangeForm,
  } = useAddTreatmentSession(form);
  return (
    <main className="staff-add-treatment-session-wrapper">
      <Breadcrumb
        items={[
          {
            title: <Link to={STAFF_TREATMENT_SESSION_LINK}>Treatment Session</Link>,
          },
          {
            title: 'New Treatment Session',
          },
        ]}
      />
      <Form form={form} className="form-wrapper" onFinish={onSubmitForm}>
        <Row justify="space-around">
          <Col span={6}>
            <Divider orientation="left">Input information</Divider>
            <SessionForm form={form} valueForm={valueForm} onChangeForm={onChangeForm} />
            <Form.Item name="healthNote">
              <Input.TextArea placeholder="Health note of patient" />
            </Form.Item>
            <Form.Item name="description">
              <Input.TextArea placeholder="Description of this session" />
            </Form.Item>
            <div className="wrap-category-select">
              <Form.Item
                name="categoryID"
                rules={[
                  {
                    required: true,
                    message: 'Please select category!',
                  },
                ]}
                label="Category"
              >
                <Select
                  placeholder="Select category"
                  options={getCategoryOptions(categories)}
                  onChange={(value) => {
                    handleChangeCategory(value);
                  }}
                />
              </Form.Item>
              <Tooltip title="Procedures" placement="bottom">
                <Button
                  className="more-btn flex-center"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <FiAlignCenter />
                </Button>
              </Tooltip>
              <Modal
                open={showModal}
                onCancel={() => {
                  setShowModal(false);
                }}
                centered
                footer={null}
                width={640}
                className="procedure-modal"
              >
                {procedureList.length === 0 ? (
                  <Empty description="No Data" />
                ) : (
                  <div>
                    <Row>
                      <Col span={4} className="title flex-center">
                        Code
                      </Col>
                      <Col span={6} className="title flex-center">
                        Name
                      </Col>
                      <Col span={4} className="title flex-center">
                        Fee
                      </Col>
                      <Col span={10} className="title flex-center">
                        Description
                      </Col>
                    </Row>
                    <div className="wrap-content">
                      {procedureList.map((procedure) => {
                        return (
                          <Row key={procedure.id} className="procedure-item">
                            <Col className="flex-center" span={4}>
                              {procedure.code}
                            </Col>
                            <Col className="flex-center" span={6}>
                              {procedure.name}
                            </Col>
                            <Col className="flex-center" span={4}>
                              {procedure.fee}
                            </Col>
                            <Col className="flex-center" span={10}>
                              <Typography.Paragraph
                                ellipsis={{
                                  rows: 2,
                                  symbol: '...',
                                  tooltip: procedure.description,
                                }}
                                className="ant-typo-mb0"
                              >
                                {procedure.description}
                              </Typography.Paragraph>
                            </Col>
                          </Row>
                        );
                      })}
                    </div>
                  </div>
                )}
              </Modal>
            </div>
          </Col>

          <Col span={6}>
            <Divider orientation="left">Select tooth</Divider>
            <header className="header-tooth">
              <Row justify="space-around">
                <Col span={6} className="flex-center bold">
                  Tooth Order
                </Col>
                <Col span={16} className="flex-center bold">
                  Tooth Order
                </Col>
                <Col span={2}>
                  <Button className="add-tooth-btn" icon={<PlusOutlined />} onClick={addTooth} />
                </Col>
              </Row>
            </header>
            {toothList.map((tooth, index) => {
              return (
                <ToothItem
                  key={index}
                  id={tooth}
                  teeth={teeth}
                  removeTooth={() => {
                    removeTooth(index);
                  }}
                  disableDelete={toothList.length === 1}
                />
              );
            })}
          </Col>

          <Col span={6} className="flex-center">
            <img src={ToothImage} alt="tooth" className="tooth-image" />
          </Col>
        </Row>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
}

export default AddTreatmentSession;
