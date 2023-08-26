import FieldInfo from '@/components/FieldInfo';
import ListItem from '@/components/ListItem';
import PersonnelInfo from '@/components/PersonnelInfo';
import { STAFF_PATIENT_LINK, STAFF_TREATMENT_SESSION_LINK } from '@/constants/internalLink';
import {
  convertMethodPayment,
  convertSessionStatus,
  convertSessionStatusToColor,
  splitDateTime,
} from '@/utils/convertData';
import { getSearching } from '@/utils/routing';
import { Link, useParams } from '@umijs/max';
import {
  Breadcrumb,
  Col,
  Collapse,
  CollapseProps,
  Divider,
  Empty,
  Row,
  Spin,
  Typography,
} from 'antd';
import { Fragment } from 'react';
import './TreatmentSessionDetail.less';
import useTreatmentSessionDetail from './useTreatmentSessionDetail';

const renderToothSession = (toothSession: TToothSession[]) => {
  return toothSession.map((toothSession) => {
    return (
      <Row key={`${toothSession.toothID}${toothSession.treatmentSessionID}${toothSession.order}`}>
        <Col className="flex-center" span={10}>
          {toothSession.order}
        </Col>
        <Col className="flex-center" span={14}>
          {`${toothSession.Tooth.name} - ${toothSession.Tooth.type}`}
        </Col>
      </Row>
    );
  });
};

const renderProcedures = (procedures: TProcedure[]) => {
  return procedures.map((procedure) => {
    return (
      <Row key={procedure.id}>
        <Col className="flex-center" span={2}>
          {procedure.code}
        </Col>
        <Col className="flex-center" span={6}>
          {procedure.name}
        </Col>
        <Col className="flex-center" span={4}>
          {procedure.fee}
        </Col>
        <Col className="flex-center" span={12}>
          <Typography.Paragraph
            ellipsis={{ rows: 1, tooltip: procedure.description, symbol: '...' }}
          >
            {procedure.description}
          </Typography.Paragraph>
        </Col>
      </Row>
    );
  });
};

const renderPrescription = (prescription: TPrescription[]) => {
  return prescription.map((prescription) => {
    return (
      <Row key={`${prescription.treatmentSessionID}${prescription.drugID}`}>
        <Col className="flex-center" span={10}>
          {prescription.Drug.code}
        </Col>
        <Col className="flex-center" span={14}>
          {prescription.Drug.name}
        </Col>
      </Row>
    );
  });
};

const getCollapseItem = (detail: TTreatmentSessionDetail) => {
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Room',
      children: (
        <Fragment>
          <FieldInfo label="Code" value={detail.Session.Room.code} />
          <FieldInfo label="Name" value={detail.Session.Room.name} />
        </Fragment>
      ),
    },
    {
      key: '2',
      label: `Category - ${detail.Category.name} - ${detail.Category.code}`,
      children: (
        <Fragment>
          <Row>
            <Col className="flex-center bold" span={2}>
              Code
            </Col>
            <Col className="flex-center bold" span={6}>
              Name
            </Col>
            <Col className="flex-center bold" span={4}>
              Fee
            </Col>
            <Col className="flex-center bold" span={12}>
              Description
            </Col>
          </Row>
          <div className="collapse-item-wrapper">{renderProcedures(detail.Category.Procedure)}</div>
        </Fragment>
      ),
    },
    {
      key: '3',
      label: 'Tooth',
      children: (
        <Fragment>
          <Row>
            <Col className="flex-center bold" span={10}>
              Order
            </Col>
            <Col className="flex-center bold" span={14}>
              Surface
            </Col>
          </Row>
          <div className="collapse-item-wrapper">{renderToothSession(detail.ToothSession)}</div>
        </Fragment>
      ),
    },
    {
      key: '4',
      label: 'Prescription',
      children: (
        <Fragment>
          <Row>
            <Col className="flex-center bold" span={10}>
              Code
            </Col>
            <Col className="flex-center bold" span={14}>
              Name
            </Col>
          </Row>
          <div className="collapse-item-wrapper">{renderPrescription(detail.Prescription)}</div>
        </Fragment>
      ),
    },
  ];

  if (detail.PaymentRecord) {
    items.push({
      key: '5',
      label: 'Payment Record',
      children: (
        <Fragment>
          <ListItem header fields={['Date', 'Total', 'Paid', 'Change', 'Method']} />
          <ListItem
            notHover
            fields={[
              splitDateTime(detail.PaymentRecord.date),
              detail.PaymentRecord.total.toString(),
              detail.PaymentRecord.paid.toString(),
              detail.PaymentRecord.change.toString(),
              convertMethodPayment(detail.PaymentRecord.method),
            ]}
          />
        </Fragment>
      ),
    });
  }

  return items;
};

const renderDetail = (detail: TTreatmentSessionDetail | undefined) => {
  if (detail === undefined) {
    return <Empty description="No data" />;
  }

  return (
    <Row justify="space-around">
      <Col span={8}>
        <Divider orientation="left">Patient</Divider>
        <PersonnelInfo personnel={detail.Session.Patient} />
        <FieldInfo
          label="Drug Contraindication"
          value={detail.Session.Patient.drugContraindication}
        />
        <FieldInfo label="Allergy Status" value={detail.Session.Patient.allergyStatus} />
        <Divider orientation="left">Dentist</Divider>
        <PersonnelInfo personnel={detail.Session.Dentist} />
        {detail.Session.Assistant && (
          <Fragment>
            <Divider orientation="left">Assistant</Divider>
            <PersonnelInfo personnel={detail.Session.Assistant} />
          </Fragment>
        )}
      </Col>
      <Col span={10}>
        <Divider orientation="left">Common information</Divider>
        <FieldInfo
          label="Status"
          value={
            detail.Session.status ? (
              <span
                className={`session-status ${convertSessionStatusToColor(detail.Session.status)}`}
              >
                {convertSessionStatus(detail.Session.status)}
              </span>
            ) : (
              ''
            )
          }
        />
        <FieldInfo label="Time" value={splitDateTime(detail.Session.time)} />
        <FieldInfo label="Note" value={detail.Session.note} />
        <FieldInfo label="Description" value={detail.description} />
        <FieldInfo label="Health note" value={detail.healthNote} />
        <Collapse items={getCollapseItem(detail)} className="collapse-info-treatment-session" />
      </Col>
    </Row>
  );
};

const getBreadcrumbItems = () => {
  const searching = getSearching();
  return [
    {
      title: <Link to={STAFF_TREATMENT_SESSION_LINK + searching}>Treatment session</Link>,
    },
    {
      title: 'Detail',
    },
  ];
};

const getBreadcrumbItemsPatient = () => {
  const searching = getSearching();
  const { patientID } = useParams();
  console.log(patientID);

  return [
    {
      title: <Link to={`${STAFF_PATIENT_LINK}${searching}`}>Patient</Link>,
    },
    {
      title: <Link to={`${STAFF_PATIENT_LINK}/${patientID}${searching}`}>Detail</Link>,
    },
    {
      title: 'Treatment session detail',
    },
  ];
};

function TreatmentSessionDetail() {
  const { detail, isLoading, isPatientRoute } = useTreatmentSessionDetail();
  return (
    <main className="staff-treatment-session-detail">
      <Breadcrumb items={isPatientRoute ? getBreadcrumbItemsPatient() : getBreadcrumbItems()} />
      {isLoading ? (
        <Row justify="center">
          <Spin />
        </Row>
      ) : (
        renderDetail(detail)
      )}
    </main>
  );
}

export default TreatmentSessionDetail;
