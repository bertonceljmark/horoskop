"use client";

import WeeklyHoroscopeCard from "../components/WeeklyHoroscopeCard";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import { Navigation, Pagination } from 'swiper/modules';
const WeeklyHoroscope = () => {
  return (
    <main className="flex min-h-screen flex-col items-center md:p-24 p-3">
      <div className="w-full max-w-4xl">
        <div className="my-5 w-full">
          <h1>Weekly horoscope</h1>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          pagination={{
            clickable: true
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <WeeklyHoroscopeCard 
              sign="Aries"
              health={1}
              money={2}
              love={3}
              text={"Aries, Mars’ continued transit through Scorpio is deepening your intuitive faculties, and it’ll be quite evident in this post-eclipse week, particularly when it comes to money matters. If you’ve been wanting to look into conscious-investing strategies, you have the green light to begin your research, as Jupiter and Uranus’ presence in your money sector orients you toward fulfilling, reciprocal, and win-win situations."}
            />
          </SwiperSlide>
          <SwiperSlide>
            <WeeklyHoroscopeCard 
              sign="Aries"
              health={4}
              money={5}
              love={6}
              text={"Aries, Mars’ continued transit through Scorpio is deepening your intuitive faculties, and it’ll be quite evident in this post-eclipse week, particularly when it comes to money matters. If you’ve been wanting to look into conscious-investing strategies, you have the green light to begin your research, as Jupiter and Uranus’ presence in your money sector orients you toward fulfilling, reciprocal, and win-win situations."}
            />
          </SwiperSlide>
          <SwiperSlide>
            <WeeklyHoroscopeCard 
              sign="Aries"
              health={7}
              money={8}
              love={9}
              text={"Aries, Mars’ continued transit through Scorpio is deepening your intuitive faculties, and it’ll be quite evident in this post-eclipse week, particularly when it comes to money matters. If you’ve been wanting to look into conscious-investing strategies, you have the green light to begin your research, as Jupiter and Uranus’ presence in your money sector orients you toward fulfilling, reciprocal, and win-win situations."}
            />
          </SwiperSlide>
          <SwiperSlide>
            <WeeklyHoroscopeCard 
              sign="Aries"
              health={1}
              money={2}
              love={3}
              text={"Aries, Mars’ continued transit through Scorpio is deepening your intuitive faculties, and it’ll be quite evident in this post-eclipse week, particularly when it comes to money matters. If you’ve been wanting to look into conscious-investing strategies, you have the green light to begin your research, as Jupiter and Uranus’ presence in your money sector orients you toward fulfilling, reciprocal, and win-win situations."}
            />
          </SwiperSlide>
  
        </Swiper>
      </div>
    </main>
  )
}

export default WeeklyHoroscope;