import { Swiper, SwiperSlide } from "swiper/react";
import React, { useMemo } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { useInfoStore } from "@/store/info";
import { ReviewType } from "@/@types/Review";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Image from "next/image";

export default function Reviews() {
  const reviews = useInfoStore((state) => state.reviews);
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      navigation={true}
      modules={[Navigation, Pagination]}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <SwiperSlide />
      {reviews.map((review, i) => (
        <SwiperSlide className="h-full center" key={i}>
          <div className="min-w-[500px] min-h-[300px]">
            <Review {...review} />
          </div>
        </SwiperSlide>
      ))}
      <SwiperSlide />
    </Swiper>
  );
}

export function Review({
  description,
  name,
  image,
  location,
  star,
}: ReviewType) {
  const starComponent = useMemo(() => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < star) {
        stars.push(<FaStar />);
      } else if (i === star && star % 1 !== 0) {
        stars.push(<FaStarHalfAlt />);
      } else {
        stars.push(<FaRegStar />);
      }
    }
    return stars;
  }, [star]);

  return (
    <div className="center flex-col text-center text-black bg-white shadow-lg text-xl font-bold w-full h-full py-5 px-12 rounded-[10px]">
      <p className="font-extralight tracking-widest mb-6 text-xs">{location}</p>
      <div className="w-[50px] h-[50px] rounded-full relative overflow-hidden mb-2">
        <Image
          src={image}
          alt={name}
          layout="fill"
          className="object-cover unselectable undraggable"
        />
      </div>
      <h3 className="text-primary font-extrabold text-2xl mb-4">{name}</h3>

      <p className="font-extralight text-xs tracking-[13%] leading-6 mb-4 max-w-[373px]">
        {description}
      </p>

      <div className="flex justify-center gap-2 text-base text-[#FFA927]">
        {starComponent}
      </div>
    </div>
  );
}
