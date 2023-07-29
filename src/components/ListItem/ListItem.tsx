import { Col, Row } from 'antd';
import { BsTrash } from 'react-icons/bs';
import './ListItem.less';

interface IListItemProps {
  fields: string[];
  header?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

function ListItem({ fields, header }: IListItemProps) {
  return (
    <Row className={`list-item-wrapper trans-effect ${header ? '' : 'item'}`}>
      {fields.map((item: string, index: number) => {
        let span = index === 4 ? 6 : 4;
        return (
          <Col span={span} key={item} className={`flex-center ${header ? 'header-item' : ''}`}>
            {item}
          </Col>
        );
      })}
      {!header && (
        <Col span={2} className="flex-center wrap-delete-btn trans-effect">
          <div className="delete-btn flex-center">
            <BsTrash />
          </div>
        </Col>
      )}
    </Row>
  );
}

ListItem.defaultProps = {
  header: false,
  onClick: () => {},
  onDelete: () => {},
};

export default ListItem;
