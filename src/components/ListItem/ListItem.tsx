import { Col, Row, Typography } from 'antd';
import { BsTrash } from 'react-icons/bs';
import './ListItem.less';

interface IListItemProps {
  fields: string[];
  header?: boolean;
  canDelete?: boolean;
  notHover?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

function ListItem({ fields, header, canDelete, notHover, onClick, onDelete }: IListItemProps) {
  return (
    <Row
      onClick={onClick}
      className={`list-item-wrapper trans-effect ${
        header ? '' : `item ${notHover ? '' : 'hover'}`
      }`}
    >
      {fields.map((item: string, index: number) => {
        let span = index === 4 ? 6 : 4;
        return (
          <Col span={span} key={item} className={`flex-center ${header ? 'header-item' : ''}`}>
            <Typography.Paragraph
              ellipsis={{
                rows: 1,
                symbol: '...',
                tooltip: item,
              }}
              className="ant-typo-mb0"
            >
              {item}
            </Typography.Paragraph>
          </Col>
        );
      })}
      {!header && canDelete && (
        <Col span={2} className="flex-center wrap-delete-btn trans-effect">
          <div className="delete-btn flex-center" onClick={onDelete}>
            <BsTrash />
          </div>
        </Col>
      )}
    </Row>
  );
}

ListItem.defaultProps = {
  header: false,
  canDelete: true,
  notHover: false,
  onClick: () => {},
  onDelete: () => {},
};

export default ListItem;
