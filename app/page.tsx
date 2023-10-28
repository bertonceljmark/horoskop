"use client";
import { useState } from "react";
import DailyHoroscope from "./pages/DailyHoroscope";
import ParticlesBackground from "./components/ParticlesBackground";
import { CircularProgress } from "@nextui-org/react";

export default function Home() {
  const [pageLoading, setPageLoading] = useState(true);

  return (
    <>
      <ParticlesBackground setPageLoading={setPageLoading} />
      {pageLoading ? (
        <div className="w-screen h-screen flex items-center justify-center bg-black z-[9999999]">
          <CircularProgress size="lg" />
        </div>
      ) : (
        <DailyHoroscope />
      )}
    </>
  );
}
