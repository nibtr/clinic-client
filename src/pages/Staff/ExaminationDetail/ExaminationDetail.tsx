import FieldInfo from '@/components/FieldInfo';
import PersonnelInfo from '@/components/PersonnelInfo';
import { STAFF_EXAMINATION_LINK } from '@/constants/internalLink';
import {
  convertSessionStatus,
  convertSessionStatusToColor,
  splitDateTime,
} from '@/utils/convertData';
import { Link } from '@umijs/max';
import { Breadcrumb, Col, Divider, Empty, Row, Spin, Typography } from 'antd';
import { Fragment } from 'react';
import './ExaminationDetail.less';
import useExaminationDetail from './useExaminationDetail';

const renderReExList = (reExList: TReExamination[]) => {
  if (reExList.length === 0) {
    return (
      <Row justify="center">
        <Empty description="No data" />
      </Row>
    );
  }

  return reExList.map((reEx) => {
    return (
      <Row key={reEx.id} justify="space-around" className="reEx-item trans-effect">
        <Col span={2}>{reEx.id}</Col>
        <Col span={6}>{splitDateTime(reEx.Session.time)}</Col>
        <Col span={14}>
          <Typography.Paragraph
            ellipsis={{
              rows: 1,
              symbol: '...',
              tooltip: reEx.Session.note || '',
            }}
            className="ant-typo-mb0"
          >
            {reEx.Session.note || ''}
          </Typography.Paragraph>
        </Col>
      </Row>
    );
  });
};

const renderItem = (
  examination: ISessionResponse | null,
  reExList: TReExamination[],
  reExListLoading: boolean,
) => {
  if (examination === null) {
    return (
      <Row justify="center">
        <Empty description="No data" />
      </Row>
    );
  }

  return (
    <Row gutter={[16, 16]} justify="space-around">
      <Col span={8}>
        <Divider orientation="left">Patient</Divider>
        <PersonnelInfo personnel={examination.Patient} />
        <FieldInfo label="Drug Contraindication" value={examination.Patient.drugContraindication} />
        <FieldInfo label="Allergy Status" value={examination.Patient.allergyStatus} />
        <Divider orientation="left">Dentist</Divider>
        <PersonnelInfo personnel={examination.Dentist} />
        {examination.Assistant && (
          <Fragment>
            <Divider orientation="left">Assistant</Divider>
            <PersonnelInfo personnel={examination.Assistant} />
          </Fragment>
        )}
      </Col>
      <Col span={10}>
        <Divider orientation="left">Common information</Divider>
        <FieldInfo
          label="Status"
          value={
            examination.status ? (
              <span className={`session-status ${convertSessionStatusToColor(examination.status)}`}>
                {convertSessionStatus(examination.status)}
              </span>
            ) : (
              ''
            )
          }
        />

        <FieldInfo label="Time" value={splitDateTime(examination.time)} />
        <FieldInfo label="Note" value={examination.note} />
        <Divider orientation="left">Room</Divider>
        <FieldInfo label="Code" value={examination.Room.code} />
        <FieldInfo label="Name" value={examination.Room.name} />
        <Divider orientation="left">Re-examination</Divider>
        {reExListLoading ? (
          <Row justify="center">
            <Spin />
          </Row>
        ) : (
          <Fragment>
            {' '}
            <header className="header-reEx-list">
              <Row>
                <Col className="flex-center bold" span={3}>
                  Code
                </Col>
                <Col className="flex-center bold" span={6}>
                  Time
                </Col>
                <Col className="flex-center bold" span={14}>
                  Note
                </Col>
              </Row>
            </header>
            <div className="wrap-reEx-list">{renderReExList(reExList)}</div>
          </Fragment>
        )}
      </Col>
    </Row>
  );
};

function ExaminationDetail() {
  const { searching, examination, isLoading, reExList, reExListLoading } = useExaminationDetail();
  return (
    <div className="staff-examination-detail-wrapper">
      <Breadcrumb
        items={[
          {
            title: <Link to={STAFF_EXAMINATION_LINK + searching}>Examination</Link>,
          },
          {
            title: 'Detail',
          },
        ]}
      />
      {isLoading ? (
        <Row justify="center">
          <Spin />
        </Row>
      ) : (
        renderItem(examination, reExList, reExListLoading)
      )}
    </div>
  );
}

export default ExaminationDetail;
