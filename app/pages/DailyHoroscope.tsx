"use client";

import { useEffect } from "react";
import { useState } from "react";
import { StarValueType } from "../interfaces/globalInterfaces";
import {
  bumpNumberOfTimesUsed,
  getLocalStorageSigns,
} from "../helpers/horoscopeLocalStorageHelper";
import SignSelect from "../components/SignSelect";
import DailyPredictionText from "../components/DailyPredictionText";

const DailyHoroscope = () => {
  const [mostVisitedSignKey, setMostVisitedSignKey] = useState<string | null>(
    null
  );

  const [sign, setSign] = useState<StarValueType | null>(
    mostVisitedSignKey as StarValueType
  );

  useEffect(() => {
    const localStorageSigns = getLocalStorageSigns();

    const signKeyWithMostVisits =
      localStorageSigns?.reduce(
        (
          maxObject: { numberOfTimesUsed: number; key: string },
          currentObject: { numberOfTimesUsed: number; key: string }
        ) => {
          if (currentObject.numberOfTimesUsed > maxObject.numberOfTimesUsed) {
            return currentObject;
          }
          return maxObject;
        },
        localStorageSigns[0]
      ) || null;

    setMostVisitedSignKey(signKeyWithMostVisits?.key || null);
  });

  useEffect(() => {
    if (sign) {
      bumpNumberOfTimesUsed(sign);
    }
  }, [sign]);

  return (
    <main className="flex min-h-screen flex-col items-center md:p-24 p-3">
      <div className="w-full max-w-4xl">
        <div className="my-5 w-full">
          <SignSelect sign={sign} setSign={setSign} />
        </div>
        <div className="my-5 w-full flex items-center justify-center">
          <DailyPredictionText sign={sign} key={sign} />
        </div>
      </div>
    </main>
  );
};

export default DailyHoroscope;
