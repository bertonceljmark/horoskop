import { useEffect, useMemo, useState } from "react";
import { getLocalStorageSigns } from "../helpers/horoscopeLocalStorageHelper";
import { useRouter, useSearchParams } from "next/navigation";
import { StarValueType } from "../interfaces/globalInterfaces";

const useGetInitSign = (): StarValueType | null => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const signFromParams = useMemo(
    () => searchParams.get("sign"),
    [searchParams]
  );

  const [mostVisitedSignKey, setMostVisitedSignKey] = useState<string | null>(
    null
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

  return (signFromParams || mostVisitedSignKey) as StarValueType | null;
};

export default useGetInitSign;
