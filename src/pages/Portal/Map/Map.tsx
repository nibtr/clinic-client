import { Row, Col } from 'antd';
import './Map.less'

function Map() {
    return (
        <div className='map-wrapper'>
            <div className="service-title title-custom">
                <h2>Location</h2>
            </div>
            <div className="map-container">
                <Row className="hotel_map">
                    <Col span={8}>
                        <div className="maps_content">
                            <h1>VT dental clinic</h1>
                            <p>Address: 227 Nguyen Van Cu, Tp.Ho Chi Minh</p>
                            <p>Phone: +84 123 456 789</p>
                            <p>Email:
                                <a href="mailto: trung@info.com.vn"> trung@info.com.vn</a></p>
                        </div>
                    </Col>

                    <Col span={16}>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.635863047679!2d106.67975127451041!3d10.762521589385393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1bfc262bf1%3A0x4e843897f2900135!2zMjI3IMSQLiBOZ3V54buFbiBWxINuIEPhu6ssIFBoxrDhu51uZyA0LCBRdeG6rW4gNSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1690871094574!5m2!1svi!2s" width={600} height={450} style={{ border: 0 }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </Col>

                </Row>
            </div>
        </div>
    )
}

export default Map;