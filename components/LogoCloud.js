import React, { useRef } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const logos = [
  {
    name: 'Indian Raleway',
    image: '/logos/logo-1.png',
  },
  {
    name: 'tapi',
    image: '/logos/logo-2.png',
  },
  {
    name: 'adhunik',
    image: '/logos/logo-3.png',
  },
  {
    name: 'Natural-resouces',
    image: '/logos/logo-4.png',
  },
  {
    name: 'prerna',
    image: '/logos/logo-5.png',
  },
  {
    name: 'dolphy',
    image: '/logos/logo-6.png',
  },
];

const LogoCloud = () => {
  const swiperRef = useRef(null);
  return (
    <div className="max-w-screen-2xl bg-white px-10 pt-32 pb-16">
      <div className="px-0 sm:px-10">
        <div className="relative mb-10 w-full">
          <h1 className="mb-10 font-sora text-5xl font-semibold capitalize">Our Clients</h1>
        </div>

        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          navigation
          className="logo-cloud relative"
          spaceBetween={0}
          slidesPerView={5}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 5,
            },
          }}
        >
          {logos.map((logo, i) => (
            <SwiperSlide key={i}>
              <div key={i} className="logo-cloud__item group cursor-pointer ">
                <img className="h-40 w-full object-contain" src={logo.image} alt={logo.name} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LogoCloud;
