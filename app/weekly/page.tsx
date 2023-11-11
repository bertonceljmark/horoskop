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
    
    <div className="w-full max-w-4xl">
      <div className="my-5 w-full">
        <h1 className='text-center'>Weekly horoscope</h1>
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
            console.log(weekly);
            return (
              <SwiperSlide key={`${weekly.signId}-${i}`}>
                <WeeklyHoroscopeCard
                  sign={weekly.signId}
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
    </div>
  )
}

export default WeeklyHoroscope;