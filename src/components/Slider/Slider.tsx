import React from 'react';
import { Carousel } from 'antd';
import image1 from '@/assets/images/image1.jpg';
import image2 from '@/assets/images/image2.jpg';
import image3 from '@/assets/images/image3.jpg';
import './Slider.less';


const dataImg = [
  {
    id: 1,
    url: image1,
    alt: 'Image 1'
  },
  {
    id: 2,
    url: image2,
    alt: 'Image 2'
  },
  {
    id: 3,
    url: image3,
    alt: 'Image 3'
  }
];

function Slider() {
  const propsCarousel = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
   <div className="carousel-wrapper">
      <Carousel autoplay swipeToSlide draggable className="carousel-content" {...propsCarousel}>
        {dataImg.map((item) => (
          <div className='carousel-images' key={item.id}>
            <img className='carousel-items' src={item.url} alt={item.alt} />
          </div>
        ))}
      </Carousel>
   </div>
  )
}

export default Slider;