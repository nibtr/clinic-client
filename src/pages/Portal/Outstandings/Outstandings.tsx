import { Row, Col } from 'antd'
import { outstandingsData } from '../datafake'
import './Outstandings.less'



function Outstandings() {
    return (
        <div className="outstanding-wrapper">
             <div className="outstanding-title title-custom">
                <h2>PRESTIGE DENTAL LOCATION</h2>
            </div>
            <Row className='outstanding-content'>
                {outstandingsData.map((item, index) => (
                    <Col
                        key={index}
                        className='outstanding-items'
                        xs={{ span: 24 }}
                        sm={{ span: 12 }}
                        md={{ span: 8 }}
                        lg={{ span: 6 }}
                    >
                        <img className="outstanding-item-img" src={item.url} alt={item.title} />
                        <div className='outstanding-item-content'>
                            <h3 className='outstanding-title'>
                                <p>{item.title}</p>
                            </h3>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Outstandings;
