import FieldInfo from '@/components/FieldInfo';
import ListItem from '@/components/ListItem';
import PersonnelInfo from '@/components/PersonnelInfo';
import { STAFF_PATIENT_LINK } from '@/constants/internalLink';
import { convertMethodPayment, convertSessionStatus, splitDateTime } from '@/utils/convertData';
import { Link } from '@umijs/max';
import { Breadcrumb, Col, Collapse, CollapseProps, Empty, Row, Spin } from 'antd';
import { Fragment } from 'react';
import './PatientDetail.less';
import usePatientDetail from './usePatientDetail';

const collapseKey = {
  paymentRecord: 'PAYMENT_RECORD',
  session: 'SESSION',
};

const getCollapseItem = (detail: TPatient, navigateToTreatmentSession: (id: number) => void) => {
  const items: CollapseProps['items'] = [];

  if (detail.PaymentRecord.length > 0) {
    items.push({
      key: collapseKey.paymentRecord,
      label: 'Payment Record',
      children: (
        <Fragment>
          <ListItem header fields={['Date', 'Total', 'Paid', 'Change', 'Method']} />
          {detail.PaymentRecord.map((paymentRecord) => {
            return (
              <ListItem
                key={paymentRecord.id}
                notHover
                fields={[
                  splitDateTime(paymentRecord.date),
                  paymentRecord.total.toString(),
                  paymentRecord.paid.toString(),
                  paymentRecord.change.toString(),
                  convertMethodPayment(paymentRecord.method),
                ]}
              />
            );
          })}
        </Fragment>
      ),
    });
  }

  if (detail.Session.length > 0) {
    items.push({
      key: collapseKey.session,
      label: 'Treatment Session',
      children: (
        <Fragment>
          <ListItem header fields={['Time', 'Status', 'Dentist', 'Room', 'Note']} />
          {detail.Session.map((session) => {
            return (
              <ListItem
                key={session.id}
                canDelete={false}
                onClick={() => {
                  navigateToTreatmentSession(session.id);
                }}
                fields={[
                  splitDateTime(session.time),
                  convertSessionStatus(session.status as string),
                  session.Dentist.name,
                  session.Room.code,
                  session.note || '',
                ]}
              />
            );
          })}
        </Fragment>
      ),
    });
  }

  return items;
};

const renderDetail = (
  detail: TPatient | undefined,
  navigateToTreatmentSession: (id: number) => void,
) => {
  if (detail === undefined) {
    return (
      <Row justify="center">
        <Empty description="No data" />
      </Row>
    );
  }

  return (
    <Row justify="start" gutter={[16, 16]}>
      <Col span={10}>
        <PersonnelInfo personnel={detail} />
        <FieldInfo label="Drug Contraindication" value={detail.drugContraindication} />
        <FieldInfo label="Allergy Status" value={detail.allergyStatus} />
      </Col>
      <Col span={14}>
        <Collapse
          items={getCollapseItem(detail, navigateToTreatmentSession)}
          defaultActiveKey={[collapseKey.paymentRecord, collapseKey.session]}
        />
      </Col>
    </Row>
  );
};

function PatientDetail() {
  const { searching, detail, isLoading, navigateToTreatmentSession } = usePatientDetail();
  return (
    <main className="staff-patient-detail-wrapper">
      <Breadcrumb
        items={[
          {
            title: <Link to={STAFF_PATIENT_LINK + searching}>Staff</Link>,
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
        <div className="wrap-contain">{renderDetail(detail, navigateToTreatmentSession)}</div>
      )}
    </main>
  );
}

export default PatientDetail;
