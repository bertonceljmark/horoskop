import { IWeaklyPrediction } from "../interfaces/globalInterfaces";

export const weekliesService = {
  getWeeklies: async (): Promise<IWeaklyPrediction[]> => {
    const response = await fetch(`/api/getWeeklies/`)
    const parsed = await response.json()
    return parsed
  }
}