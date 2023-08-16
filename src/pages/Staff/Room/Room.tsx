import RoomItem from '@/components/RoomItem';
import { Col, Empty, Row, Spin } from 'antd';
import useRoom from './useRoom';

const renderList = (listRoom: TRoom[]) => {
  if (listRoom.length === 0) {
    return <Empty description="No data" />;
  }

  return (
    <Row gutter={[16, 16]} justify="start">
      {listRoom.map((room: TRoom) => {
        const fields: string[] = [];
        fields.push(room.code);
        fields.push(room.name);
        return <Col span={6}>
          <RoomItem
            key={room.id}
            roomCode={room.code}
            roomDescription={room.name}
            patientNumber={10}
          />
        </Col>

      })}

    </Row>
  );
};

function Room() {
  const { listRoom, isLoading } = useRoom();
  return (
    <main>

      {isLoading ? (
        <Row justify="center">
          <Spin />
        </Row>
      ) : (
        renderList(listRoom)
      )}
    </main>
  );
}

export default Room;
