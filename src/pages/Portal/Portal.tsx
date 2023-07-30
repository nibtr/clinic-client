import Carousel from '../../components/Slider';
import Services from './Services';
import AppoinmentForm from './Appoinment';
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
      <div className='portal-content'>
        <Carousel />
        <Services />
        <AppoinmentForm />
      </div>
    </main>
  );
}

export default Portal;
