export type StarValueType =
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces"
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo";

export const StarValues = Object.freeze({
  VIRGO: "virgo",
  LIBRA: "libra",
  SCORPIO: "scorpio",
  SAGITTARIUS: "sagittarius",
  CAPRICORN: "capricorn",
  AQUARIUS: "aquarius",
  PISCE: "pisces",
  ARIES: "aries",
  TAURUS: "taurus",
  GEMINI: "gemini",
  CANCER: "cancer",
  LEO: "leo",
})

export interface IWeaklyPrediction {
  sign: string
  content: string,
  health: number,
  money: number,
  love: number,
}
