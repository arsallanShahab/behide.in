import Link from "next/link";
import { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper";
// import img from "../public/"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Collection from "../components/Collection";
import Header from "../components/PageHead";
import { client } from "../lib/contentful";
import lightFile from "../public/zap.svg";

export default function Home({ data }) {
  console.log(data);
  const { homeBanner } = data;
  const homeBannerItems = homeBanner.items.map((item) => item.fields);
  const [homeBannerData, setHomeBannerData] = useState(null);
  const [index, setIndex] = useState(0);

  // setInterval(() => {
  //   if (index) {
  //     setIndex(homeBannerData.length - 1);
  //     console.log("if");
  //   } else {
  //     setIndex((prev) => prev - 1);
  //     console.log("else");
  //   }
  // }, 2000);
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
          loop
          navigation
        >
          {homeBannerItems.map((item, index) => {
            return (
              <SwiperSlide>
                <div className="relative flex flex-col items-center justify-center px-6 pt-10 bg-brandGrey sm:flex-row pb-44">
                  <div className="flex flex-col items-center px-4 text-center sm:items-start basis-1/2 sm:px-8">
                    <h3 className="py-3 font-rubik uppercase font-semibold word-spacing-trending align-middle text-[#afafaf]">
                      Trending Collection{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="#ffc038"
                        stroke="#ffc038"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="inline-block -mt-1 -ml-2 feather feather-zap"
                      >
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                      </svg>
                    </h3>
                    <h1 className="relative font-poppins z-10 font-bold capitalize text-[55px] sm:text-8xl leading-[.8] text-center sm:text-left text-brandBlack">
                      {item.homeBannerText}
                    </h1>
                    <svg
                      width="150"
                      height="150"
                      viewBox="0 0 197 166"
                      strokeWidth="4"
                      stroke="#ffc038"
                      fill="none"
                      className="absolute top-16 left-1/4 z-[-0]"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M142.944 18.5435C152.501 19.0329 160.097 23.863 167.693 29.2866C192.605 47.0973 200.937 74.7316 183.866 101.887C157.32 143.999 95.4879 171.56 47.5416 158.84C36.9232 156.037 22.5474 153.566 12.0107 139.877C2.20905 127.148 2.61745 112.016 7.10987 98.0073C11.684 83.6438 20.5054 70.4242 27.5299 61.9266C58.2417 24.8517 119.747 -8.84446 175.371 8.91986C176.515 9.26214 177.658 8.67352 177.985 7.60522C178.312 6.53692 177.74 5.39139 176.678 5.04911C119.42 -13.2331 55.9543 21.1866 24.3441 59.3421C15.6043 69.9381 4.1697 87.626 0.902488 105.927C-1.30288 118.435 0.248727 131.221 8.74347 142.344C19.9337 156.926 35.208 159.782 46.4799 162.768C95.9781 175.905 159.933 147.538 187.296 104.046C205.674 74.8584 196.853 45.1282 170.062 25.9842C161.894 20.0996 153.562 15.0142 143.189 14.4841C142.045 14.4264 141.065 15.289 141.065 16.4093C140.984 17.5297 141.882 18.4858 142.944 18.5435Z"
                        fill="#FFF"
                      />
                    </svg>
                    <p className="max-w-md pl-5 mt-10 text-sm font-semibold leading-relaxed text-center border-l-0 text-brandMediumGrey sm:border-l-4 font-poppins word-spacing sm:text-left">
                      {item.homeBannerDescription}
                    </p>
                    <Link
                      className="relative inline-block px-16 py-5 mt-10 text-base font-semibold text-white capitalize font-poppins bg-brandTeal"
                      href={`/products/${item.homeBannerLink.sys.id}`}
                    >
                      <span className="mr-3">Check out</span>
                      <div className="absolute px-4 pt-4 pb-2 rounded-full -right-3 -top-6 bg-brandYellow">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 67 67"
                          fill="none"
                          className="rotate-[25deg]"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_309_351)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M15.4392 37.2096C15.1852 36.9603 14.9292 36.7109 14.6715 36.4633C12.0436 33.9443 9.43617 31.4225 6.98974 28.7211C6.39697 28.0669 5.28403 26.7977 4.16643 26.1444C3.36709 25.6773 2.53979 25.4819 1.78325 25.5787C1.30122 25.6401 0.59682 25.883 0.243209 26.807C0.183654 26.9624 0.112947 27.2294 0.0850306 27.57C0.040364 28.1209 0.0840787 29.1092 0.0980371 29.246C0.293454 31.2392 0.488864 33.145 0.847127 35.1169C1.17654 36.9314 1.40173 38.76 1.75627 40.5718C2.28669 43.2825 2.96974 45.8917 3.96543 48.4731C4.33486 49.4316 5.41337 49.9089 6.37185 49.5395C7.32939 49.1701 7.80769 48.0925 7.43826 47.1341C6.52166 44.7565 5.89727 42.3538 5.40966 39.8571C5.05791 38.0621 4.83549 36.2493 4.50886 34.4515C4.29669 33.2818 4.14593 32.1363 4.01751 30.9805L4.23062 31.2196C6.7366 33.9862 9.40453 36.5704 12.0957 39.1499C13.1026 40.1158 14.075 41.1096 15.0977 42.0597C15.1805 42.1807 15.5629 42.7353 15.7509 42.9251C16.0636 43.2415 16.4014 43.4183 16.6954 43.5058C17.4427 43.7291 18.2011 43.6463 18.8636 42.8088C19.3596 42.1816 19.6453 41.2092 19.6239 40.0478C19.595 38.4519 18.9893 36.348 18.8609 35.3784C18.0475 29.2432 16.7317 23.1322 16.3818 16.944C16.3242 15.9186 15.4448 15.1332 14.4193 15.1909C13.3938 15.2495 12.6075 16.1288 12.6661 17.1543C13.0206 23.4356 14.3449 29.6396 15.1703 35.8678C15.2149 36.1991 15.321 36.6709 15.4392 37.2096Z"
                              fill="#FFF"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M31.7008 11.7781C29.5903 12.3374 27.4761 12.825 25.7806 14.2748C24.007 15.7926 23.1053 17.9971 22.7843 20.4537C22.3748 23.5878 22.9239 27.1435 23.2644 29.6774C23.4413 30.9895 23.5166 32.818 23.8991 34.4381C24.2285 35.8312 24.7896 37.079 25.6448 37.9528C26.9885 39.3254 29.0506 39.464 31.1658 38.6079C33.6094 37.6187 36.0428 35.3361 36.7045 34.0054C37.1623 33.086 36.7872 31.9675 35.8669 31.5106C34.9475 31.0528 33.83 31.4278 33.3721 32.3472C32.9525 33.1912 31.3193 34.5302 29.769 35.1584C29.4229 35.2979 29.0804 35.4021 28.7566 35.4282C28.5881 35.4422 28.4197 35.4664 28.3053 35.35C27.7441 34.7759 27.5469 33.8426 27.384 32.8999C27.156 31.586 27.0927 30.2134 26.9541 29.1805C26.6488 26.9146 26.1092 23.7386 26.4749 20.9358C26.6712 19.4329 27.1151 18.0324 28.201 17.1037C29.461 16.0262 31.0839 15.7926 32.6537 15.3766C33.6466 15.1142 34.2394 14.0943 33.9761 13.1014C33.7136 12.1085 32.6937 11.5157 31.7008 11.7781Z"
                              fill="#FFF"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M31.5587 21.5849C29.9237 22.4755 28.1761 23.3911 26.4238 24.0202C25.457 24.3673 24.9536 25.4337 25.2997 26.4006C25.6468 27.3674 26.7132 27.8708 27.6801 27.5237C29.61 26.8314 31.5391 25.8348 33.3388 24.8549C34.2405 24.3636 34.5745 23.232 34.0832 22.3303C33.5919 21.4276 32.4613 21.0945 31.5587 21.5849Z"
                              fill="#FFF"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M54.0352 22.5729C52.6766 20.9296 51.2407 19.3123 49.7239 17.8346C49.6001 17.7145 48.0703 16.4545 47.1612 15.9837C46.548 15.6663 46.0045 15.6087 45.6862 15.6394C44.7603 15.7287 44.1955 16.2303 43.9638 17.0882C43.7423 17.9109 43.6623 18.7679 43.6623 19.6426C42.286 17.0622 41.027 14.4083 40.2621 11.6138C40.1988 11.383 40.1476 11.2751 40.1392 11.2555C39.8814 10.686 39.5157 10.4924 39.3855 10.4161C38.7452 10.0402 38.1683 10.1035 37.6816 10.3222C37.6221 10.3482 36.31 10.9308 36.6235 12.4187C36.6487 12.5388 36.8627 13.3939 36.9251 13.728C36.98 14.0183 37.0991 14.2798 37.2656 14.5013C38.5479 18.1844 40.5096 21.6638 42.3921 25.0612C42.7987 25.7955 43.1161 26.552 43.3254 27.3643C43.3869 27.6016 43.412 28.1386 43.4659 28.4019C43.5581 28.8476 43.7404 29.1463 43.8568 29.299C44.4616 30.0936 45.207 30.1746 45.8947 29.9709C46.1887 29.8843 46.7778 29.6861 47.136 28.8328C47.9419 26.9158 47.8507 24.7988 47.6172 22.666C47.5483 22.035 47.4627 21.4041 47.4106 20.7807C49.066 22.4259 50.6154 24.2404 52.0717 26.0541C52.2318 26.2532 53.8528 28.066 54.2837 28.3358C55.3612 29.0133 56.1978 28.5043 56.5561 28.2009C57.1023 27.7375 57.5322 26.9419 57.7072 25.9285C57.9324 24.6174 57.7546 22.813 57.7369 22.0871C57.6188 17.2017 57.4419 12.0949 56.3448 7.32486C56.115 6.32358 55.1156 5.69821 54.1143 5.92806C53.113 6.1579 52.4877 7.15828 52.7175 8.15863C53.7588 12.6886 53.903 17.5396 54.0156 22.1775C54.0184 22.2845 54.0259 22.4185 54.0352 22.5729Z"
                              fill="#FFF"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M61.4723 6.08726C62.147 9.34886 62.8225 12.5807 63.2636 15.9344C63.3976 16.9533 64.3328 17.6717 65.3517 17.5377C66.3698 17.4037 67.0882 16.4685 66.9542 15.4496C66.3326 10.7195 65.2569 6.22871 64.3561 1.5629C64.009 -0.240516 62.2949 0.0116897 62.1898 0.0303008C61.9581 0.0712452 60.6953 0.340173 60.6534 1.81883C60.6506 1.90909 60.7111 2.5474 60.7213 2.79493C60.7437 3.36164 60.7325 3.91535 60.7036 4.48298C60.6701 5.13716 60.9782 5.72993 61.4723 6.08726Z"
                              fill="#FFF"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M66.2885 25.3208C66.4774 24.7457 66.3816 24.0888 65.9758 23.5797C65.3347 22.7767 64.1631 22.6455 63.36 23.2866C62.6184 23.8784 62.4797 24.5996 62.5793 25.4818C62.6947 26.5026 63.6178 27.2377 64.6386 27.1214C65.572 27.0163 66.2662 26.2346 66.2885 25.3208Z"
                              fill="#FFF"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_309_351">
                              <rect width="67" height="67" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </Link>
                  </div>
                  <div className="flex items-center justify-center w-full basis-1/2">
                    <div className="w-[500px] h-[500px] relative">
                      <img
                        className="relative z-10 object-cover w-full h-full select-none"
                        src={item.homeBannerImage.fields.file.url}
                        alt={item.homeBannerImage.fields.productName}
                      />
                      <div className="absolute select-none w-full h-full block -bottom-[25%] left-7 z-0 right-0 rounded-t-full">
                        <img
                          src="./bg-asset.png"
                          className="object-cover object-center w-full h-[50%] scale-[1.75] "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const homeBanner = await client.getEntries({
    content_type: "homeBanner",
  });
  return {
    props: {
      data: { homeBanner },
    },
  };
};
