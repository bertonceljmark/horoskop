"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from "react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Navigation, Pagination } from 'swiper/modules';

import WeeklyHoroscopeCard from "../components/WeeklyHoroscopeCard";
import { IWeaklyPrediction } from "../interfaces/globalInterfaces";
import { weekliesService } from '../services/weeklies';

const sliderBreakpoints = {
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
}

const WeeklyHoroscope = () => {
  const [weeklies, setWeeklies] = useState<IWeaklyPrediction[]>([])

  const fetchWeeklies = async () => {
    const weeklies = await weekliesService.getWeeklies()
    setWeeklies(weeklies)
  }

  useEffect(() => {
    fetchWeeklies()
  }, [])

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
          pagination={{clickable: true}}
          breakpoints={sliderBreakpoints}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {weeklies.map((weekly,i) => {
            return (
              <SwiperSlide key={`${weekly.sign}-${i}`}>
                <WeeklyHoroscopeCard
                  sign={weekly.sign}
                  health={weekly.health}
                  money={weekly.money}
                  love={weekly.love}
                  content={weekly.content}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </main>
  )
}

export default WeeklyHoroscope;