import { Col, Row } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined, FacebookOutlined, InstagramOutlined, LinkedinOutlined, PhoneOutlined } from '@ant-design/icons';

import ClientProviderLayout from '../../components/ClientProvider';
import Carousel from '../../components/Slider';
import Outstandings from './Outstandings';
import Appointment from './Appointment';
import Services from './Services';
import Map from './Map';
import logo from '@/assets/images/logo-1.png';
import './Portal.less';



function PortalUI() {
  return (
    <main className="portal-wrapper">
      <header className="portal-header">
        <div className='header-image'>
          <img className='img-logo' src={logo} alt="logo" loading="lazy" />
        </div>
      </header>
      <Carousel />
      <Outstandings />
      <Appointment />
      <Services />
      <Map />

      <footer className="portal-footer">
        <div className="footer-container">
          <Row className='footer-row'>
            <Col className='footer-items' span={8}>
              <div className="footer-left">
                <h3>Communications </h3>
                <ul>
                  <li><a href="tel:(+84) 1234 4321"><PhoneOutlined />(+84) 1234 4321</a></li>
                  <li><EnvironmentOutlined />227 Nguyễn Văn Cừ / TP.HCM</li>
                </ul>
              </div>
            </Col>
            <Col className='footer-items' span={8}>
              <div className="footer-center">
                <div className="footer-title">
                  <h3>More Info</h3>
                </div>
                <ul>
                  <li><a href="#">PRIVACY POLICY</a></li>
                  <li><a href="#">TERMS & CONDITIONS</a></li>
                  <li><a href="#">DENTAL SAFETY & NOTICE</a></li>
                  <li><a href="#">PAYMENT METHODS</a></li>
                </ul>

              </div>
            </Col>
            <Col className='footer-items' span={8}>
              <div className="footer-right">
                <div className="footer-title work-time">
                  <h3>Open hours</h3>
                  <ul className="footer-social">
                    <li><a target="_blank"><FacebookOutlined /></a></li>
                    <li><a target="_blank"><InstagramOutlined /></a></li>
                    <li><a target="_blank"><LinkedinOutlined /></a></li>
                  </ul>
                </div>
                <table className="footer_table">
                  <tbody>
                    <tr>
                      <td><ClockCircleOutlined /> Monday - Friday</td>
                      <td>8:00am - 6:00pm</td>
                    </tr>
                    <tr>
                      <td><ClockCircleOutlined /> Saturday - Sunday</td>
                      <td>8:00am - 5:00pm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
          <div className="footer-bottom">
            <p>Copyright © Dental Clinic 2023 | @group2.vn</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Portal() {
  return (
    <ClientProviderLayout>
      <PortalUI />
    </ClientProviderLayout>
  );
}

export default Portal;
