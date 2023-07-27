import { Input, Modal, Tooltip, Typography } from 'antd';
import { Fragment, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import './RoomItem.less';

interface IRoomItemProps {
  roomCode: string;
  roomDescription: string;
  patientNumber: number;
}

function RoomItem({ roomCode, roomDescription, patientNumber }: IRoomItemProps) {
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <div className="room-item-wrapper">
      <Tooltip
        title={
          <div className="room-item-tooltip flex-center">
            <div
              className={`tooltip-item trans-effect ${editMode ? 'save' : ''}`}
              onClick={() => {
                setEditMode(!editMode);
              }}
            >
              {editMode ? 'save' : 'edit'}
            </div>
            <div
              className="tooltip-item trans-effect red"
              onClick={() => {
                setShowModal(true);
              }}
            >
              delete
            </div>
          </div>
        }
        placement="bottom"
        trigger="click"
      >
        <button className="menu-btn flex-center">
          <BsThreeDotsVertical />
        </button>
      </Tooltip>
      {editMode ? (
        <Fragment>
          <Input className="input" value={roomCode} />
          <Input className="input" value={roomDescription} />
        </Fragment>
      ) : (
        <Fragment>
          <p className="room-code">{roomCode}</p>
          <Typography.Paragraph
            className="ant-typo-mb0"
            ellipsis={{ rows: 1, symbol: '...', tooltip: roomDescription }}
          >
            {roomDescription}
          </Typography.Paragraph>
        </Fragment>
      )}

      <p>Patient number: {patientNumber}</p>

      <Modal
        closeIcon={false}
        open={showModal}
        width={320}
        onCancel={hideModal}
        onOk={hideModal}
        okText="Delete"
      >
        <p>Are you sure you want to delete this room?</p>
      </Modal>
    </div>
  );
}

export default RoomItem;
