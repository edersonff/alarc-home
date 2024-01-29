import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";

export default function Testimonials() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      navigation={true}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {[1, 2, 3, 4, 5].map((item) => (
        <SwiperSlide>
          <div className="center bg-red-600 text-white text-xl font-bold w-full h-[20vh]">
            Slide {item}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
