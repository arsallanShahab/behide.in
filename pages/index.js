import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Header from "../components/PageHead";
import { client } from "../lib/contentful";

export default function Home({ data }) {
  // console.log(data);
  const { bannerImages } = data;
  return (
    <>
      <Header />
      <div className="slideshow">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation
        >
          <SwiperSlide>
            <img src={bannerImages[0]} alt="intro-bg-1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={bannerImages[1]} alt="intro-bg-2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={bannerImages[2]} alt="intro-bg-3" />
          </SwiperSlide>
        </Swiper>
      </div>
      <h1 className="text-4xl font-bold font-poppins py-16 px-8">Category</h1>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const response = await client.getEntries({
    content_type: "pageBanner",
  });
  const bannerImages = response.items[0].fields.bannerImage.map(
    (item) => item.fields.file.url
  );
  return {
    props: {
      data: { bannerImages },
    },
  };
};
