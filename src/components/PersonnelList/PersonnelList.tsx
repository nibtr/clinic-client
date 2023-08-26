import ListItem from '@/components/ListItem';
import { getGender } from '@/utils/convertData';
import { useLocation, useNavigate } from '@umijs/max';
import { Empty, Pagination, Row, Spin } from 'antd';
import { Fragment } from 'react';
import './PersonnelList.less';

interface IPersonnelList {
  listPersonnel: TPersonnel[];
  total: number;
  isLoading: boolean;
  page: number;
  changePage: (page: number) => void;
}

const renderList = (listPersonnel: TPersonnel[], navigateToDetail: (id: number) => void) => {
  if (listPersonnel.length === 0) {
    return <Empty description="No data" />;
  }

  return (
    <Fragment>
      {listPersonnel.map((personnel: TPersonnel) => {
        const fields: string[] = [];
        fields.push(personnel.name);
        fields.push(personnel.dob?.split('T')[0] || '');
        fields.push(getGender(personnel.gender || ''));
        fields.push(personnel.phone);
        fields.push(personnel.nationalID);
        return (
          <ListItem
            key={personnel.id}
            fields={fields}
            onClick={() => {
              navigateToDetail(personnel.id);
            }}
          />
        );
      })}
    </Fragment>
  );
};
function PersonnelList({ listPersonnel, total, isLoading, page, changePage }: IPersonnelList) {
  const location = useLocation();
  const navigate = useNavigate();
  const navigateToDetail = (id: number) => {
    navigate(location.pathname + '/' + id + location.search);
  };

  return (
    <main className="personnel-list-wrapper">
      {isLoading ? (
        <Row justify="center">
          <Spin />
        </Row>
      ) : (
        renderList(listPersonnel, navigateToDetail)
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

export default PersonnelList;
