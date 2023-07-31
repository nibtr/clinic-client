import { Row, Col } from 'antd'
import { servicesData } from '../datafake'
import './Services.less'

function Services() {
    return (
        <div className="service-wrapper">
            <div className="service-title title-custom">
                <h2>Our Services</h2>
            </div>
            <Row className='service-row'>
                    {servicesData.map((item, index) => (
                        <Col
                            key={index}
                            className='service-items'
                            xs={{ span: 24 }}
                            sm={{ span: 12 }}
                            md={{ span: 8 }}
                            lg={{ span: 6 }}
                        >

                            <div className="service-item-img">
                                <img src={item.url} alt={item.title} />
                            </div>
                            <div className='service-item-content'>
                                <h3 className='service-item-title'>
                                    <p>{item.title}</p>
                                </h3>
                            </div>
                        </Col>
                    ))}
            </Row>
        </div>
    )
}

export default Services;
