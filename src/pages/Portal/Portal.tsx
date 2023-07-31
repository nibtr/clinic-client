import Carousel from '../../components/Slider';
import Outstandings from './Outstandings';
import Appointment from './Appointment';
import Services from './Services';
import logo from '@/assets/images/logo-1.png';

import './Portal.less';

function Portal() {

  return (
    <main className="portal-wrapper">
      <header className="portal-header">
        <div className='header-image'>
          <img className='img-logo' src={logo} alt="logo" />
        </div>
      </header>
      <Carousel />
      <Outstandings />
      <Appointment />
      <Services />
    </main>
  );
}

export default Portal;
