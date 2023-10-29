"use client";

import { useEffect } from "react";
import { StarValueType } from "../interfaces/globalInterfaces";
import { bumpNumberOfTimesUsed } from "../helpers/horoscopeLocalStorageHelper";
import SignSelect from "../components/SignSelect";
import DailyPredictionText from "../components/DailyPredictionText";
import { useRouter } from "next/navigation";
import useGetInitSign from "../hooks/useGetInitSign";

const DailyHoroscope = () => {
  const router = useRouter();
  const initSign = useGetInitSign();

  useEffect(() => {
    if (initSign) {
      bumpNumberOfTimesUsed(initSign);
    }
  }, [initSign]);

  const handleSignChange = (newSign: StarValueType) => {
    router.push(`/daily?sign=${newSign}`);
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="my-5 w-full">
        <SignSelect sign={initSign} handleChange={handleSignChange} />
      </div>
      <div className="my-5 w-full flex items-center justify-center">
        <DailyPredictionText sign={initSign} key={initSign} />
      </div>
    </div>
  );
};

export default DailyHoroscope;
