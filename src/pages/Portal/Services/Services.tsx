import { Row, Col } from 'antd'
import { servicesData } from '../datafake'
import './Services.less'



function Services() {
    return (
        <div className="services-wrapper">
            <Row className='services-content'>
                {servicesData.map((item, index) => (
                    <Col
                        key={index}
                        className='services-items'
                        xs={{ span: 24 }}
                        sm={{ span: 12 }}
                        md={{ span: 8 }}
                        lg={{ span: 6 }}
                    >
                        <img className="services-item-img" src={item.url} alt={item.title} />
                        <div className='services-item-content'>
                            <h3>{item.title}</h3>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Services;
