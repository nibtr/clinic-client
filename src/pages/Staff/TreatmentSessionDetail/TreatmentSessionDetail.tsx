import { MALE_TYPE } from '@/constants/dataQuery';
import { STAFF_TREATMENT_SESSION_LINK } from '@/constants/internalLink';
import {
  convertSessionStatus,
  convertSessionStatusToColor,
  splitDateTime,
} from '@/utils/convertData';
import { Link } from '@umijs/max';
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
import { Fragment, ReactNode } from 'react';
import './TreatmentSessionDetail.less';
import useTreatmentSessionDetail from './useTreatmentSessionDetail';

interface IFieldInfoProps {
  label: string;
  value: ReactNode;
}

const FieldInfo = ({ label, value }: IFieldInfoProps) => {
  return (
    <div className="flex-center field-info">
      <label className="label">{label}:</label> <span className="value">{value}</span>
    </div>
  );
};

const renderPersonnelInfo = (personnel: TPersonnel | TPatient) => {
  let gender = '';
  if (personnel.gender) {
    gender = personnel.gender === MALE_TYPE ? 'male' : 'female';
  }

  return (
    <section>
      <FieldInfo label="Name" value={personnel.name} />
      <FieldInfo label="Gender" value={gender} />
      <FieldInfo label="National ID" value={personnel.nationalID} />
      <FieldInfo label="Date of Birth" value={splitDateTime(personnel.dob) || ''} />
      <FieldInfo label="Phone" value={personnel.phone} />
    </section>
  );
};

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
  return items;
};

const renderDetail = (detail: TTreatmentSessionDetail | undefined) => {
  if (detail === undefined) {
    return <Empty description="No data" />;
  }

  console.log(detail);

  return (
    <Row justify="space-around">
      <Col span={8}>
        <Divider orientation="left">Patient</Divider>
        {renderPersonnelInfo(detail.Session.Patient)}
        <FieldInfo
          label="Drug Contraindication"
          value={detail.Session.Patient.drugContraindication}
        />
        <FieldInfo label="Allergy Status" value={detail.Session.Patient.allergyStatus} />
        <Divider orientation="left">Dentist</Divider>
        {renderPersonnelInfo(detail.Session.Dentist)}
        {detail.Session.Assistant && (
          <Fragment>
            <Divider orientation="left">Assistant</Divider>
            {renderPersonnelInfo(detail.Session.Assistant)}
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

function TreatmentSessionDetail() {
  const { detail, isLoading } = useTreatmentSessionDetail();
  return (
    <main className="staff-treatment-session-detail">
      <Breadcrumb
        items={[
          {
            title: <Link to={STAFF_TREATMENT_SESSION_LINK}>Treatment session</Link>,
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
        renderDetail(detail)
      )}
    </main>
  );
}

export default TreatmentSessionDetail;
