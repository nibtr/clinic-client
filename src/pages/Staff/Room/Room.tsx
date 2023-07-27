import RoomItem from '@/components/RoomItem';
import { Col, Row } from 'antd';

function Room() {
  return (
    <main>
      <Row gutter={[16, 16]}>
        <Col span={4}>
          <RoomItem
            roomCode={'ASD123'}
            roomDescription={
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
            }
            patientNumber={10}
          />
        </Col>
      </Row>
    </main>
  );
}

export default Room;
