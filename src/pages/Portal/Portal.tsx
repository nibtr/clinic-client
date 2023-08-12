import { Col, Row } from 'antd';
import { FacebookOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';
import { QueryClient, QueryClientProvider } from 'react-query';

import Carousel from '../../components/Slider';
import Outstandings from './Outstandings';
import Appointment from './Appointment';
import Services from './Services';
import Map from './Map';
import logo from '@/assets/images/logo-1.png';
import './Portal.less';


const queryClient = new QueryClient();

function Portal() {
  return (
    <main className="portal-wrapper">
      <QueryClientProvider client={queryClient}>
        <header className="portal-header">
          <div className='header-image'>
            <img className='img-logo' src={logo} alt="logo" />
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
                    <li><a href="tel:(+84) 1234 4321">(+84) 1234 4321</a></li>
                    <li>123 Nguyễn Văn Cừ / TP.HCM</li>
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
                    <li><a href="#">COVID - 19 SAFETY & NOTICE</a></li>
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
                </div>
              </Col>

            </Row>
          </div>
        </footer>
      </QueryClientProvider>
    </main>
  );
}

export default Portal;
