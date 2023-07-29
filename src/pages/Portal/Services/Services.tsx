import { Row, Col } from 'antd'
import { servicesData } from '../datafake'
import './Services.less'



function Services() {
    return (
        <Row
            gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
            }}
            className='services-wrapper'
        >
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
    )
}

export default Services;
