import ListItem from '@/components/ListItem';
import { ADMIN_ADD_STAFF } from '@/constants/internalLink';
import { getGender } from '@/utils/convertData';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';
import { Button, Empty, Pagination, Row, Spin } from 'antd';
import { Fragment } from 'react';
import './Staff.less';
import useStaff from './useStaff';

const renderList = (listStaff: TPersonnel[]) => {
  if (listStaff.length === 0) {
    return <Empty description="No data" />;
  }

  return (
    <Fragment>
      {listStaff.map((staff: TPersonnel) => {
        const fields: string[] = [];
        fields.push(staff.name);
        fields.push(staff.dob?.split('T')[0] || '');
        fields.push(getGender(staff.gender || ''));
        fields.push(staff.phone);
        fields.push(staff.nationalID);
        return <ListItem key={staff.id} fields={fields} />;
      })}
    </Fragment>
  );
};

function Staff() {
  const { listStaff, total, isLoading, page, changePage } = useStaff();
  return (
    <main className="admin-staff-page-wrapper">
      <header className="header">
        <Link to={ADMIN_ADD_STAFF}>
          <Button icon={<PlusOutlined />} type="primary" className="new-staff-btn">
            New staff
          </Button>
        </Link>
        <ListItem header fields={['Name', 'DoB', 'Gender', 'Phone', 'National ID']} />
      </header>
      <section>
        {isLoading ? (
          <Row justify="center">
            <Spin />
          </Row>
        ) : (
          renderList(listStaff)
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
    </main>
  );
}

export default Staff;
