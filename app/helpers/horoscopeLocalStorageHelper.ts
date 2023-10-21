import { StarValueType } from "../interfaces/globalInterfaces";

const todaysDate = new Date().toLocaleDateString();

export const addToLocalStorage = (
  key: StarValueType,
  value: { date: string; message: string }
) => {
  const parsedValue = JSON.stringify(value);

  window.localStorage.setItem(key, parsedValue);
};

export const getFromLocalStorage = (key: StarValueType | null) => {
  if (key) {
    const parsedItem = JSON.parse(window.localStorage.getItem(key) || "");

    return parsedItem.message;
  }
};

export const clearLocalStorage = () => window.localStorage.clear();

export const wasSavedToday = (key: StarValueType | null) => {
  if (key) {
    const item = window?.localStorage?.getItem(key);

    const parsedItem = item
      ? JSON.parse(window?.localStorage?.getItem(key) || "")
      : null;

    return parsedItem?.date === todaysDate;
  }
};

export const setLocalStorageSigns = (newSign: StarValueType) => {
  const signs = JSON.parse(window.localStorage.getItem("signs") || "[]");

  if (!signs.includes(newSign)) {
    const newSigns = [...signs, newSign];

    window.localStorage.setItem("signs", JSON.stringify(newSigns));
  }
};

export const getLocalStorageSigns = () => {
  const signs = JSON.parse(window.localStorage.getItem("signs") || "[]");

  return signs;
};

export const bumpNumberOfTimesUsed = (key: StarValueType) => {
  const existingItems = JSON.parse(
    window?.localStorage?.getItem("signs") || "[]"
  );

  const existingSelectedItem =
    existingItems.find((item: any) => item.key === key) || null;

  if (existingSelectedItem) {
    const newArray = existingItems.map((item: any) => {
      if (item.key === key) {
        return {
          key,
          numberOfTimesUsed: item.numberOfTimesUsed + 1,
        };
      }

      return item;
    });

    window.localStorage.setItem("signs", JSON.stringify(newArray));
  } else {
    window.localStorage.setItem(
      "signs",
      JSON.stringify([...existingItems, { key, numberOfTimesUsed: 1 }])
    );
  }
};
