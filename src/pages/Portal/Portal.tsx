import Carousel from '../../components/Slider';
import Services from './Services';
import AppoinmentForm from './Appoinment';
import logo from '@/assets/images/logo.png';

import './Portal.less';

function Portal() {
 
  return (
    <main className="portal-wrapper">
      <header className="header">
        <img className='img-logo' src={logo} alt="logo" />
      </header>
      <Carousel />
      <Services />
      <AppoinmentForm />
    </main>
  );
}

export default Portal;
