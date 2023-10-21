import { useEffect, useState, useMemo } from "react";
import generateAnswer from "../api/generateAnswer";
import { StarValueType } from "../interfaces/globalInterfaces";
import {
  addToLocalStorage,
  getFromLocalStorage,
  wasSavedToday,
} from "../helpers/horoscopeLocalStorageHelper";

interface IProps {
  sign: StarValueType | null;
}

const useGPT = ({ sign }: IProps) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isCached = useMemo(() => wasSavedToday(sign), [sign]);

  useEffect(() => {
    if (isCached) {
      const cachedValue = getFromLocalStorage(sign);

      setMessage(cachedValue);
    }
  }, [isCached]);

  useEffect(() => {
    if (sign) {
      if (isCached) {
        const cachedValue = getFromLocalStorage(sign);

        setMessage(cachedValue);
      } else {
        const fetchData = async () => {
          setLoading(true);
          return await generateAnswer(sign);
        };

        fetchData().then((msg) => {
          setLoading(false);

          if (msg) {
            setMessage(msg);

            addToLocalStorage(sign, {
              date: new Date().toLocaleDateString(),
              message: msg,
            });
          } else {
            setError("Something went wrong");
          }
        });
      }
    }
  }, [sign]);

  return { message, loading, error };
};

export default useGPT;
