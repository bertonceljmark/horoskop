import { StarValueType } from "../interfaces/globalInterfaces"

export const chatgptService = {
  generateAnswer: async (sign: StarValueType): Promise<string> => {
    const response = await fetch(`/api/generateAnswer/?sign=${sign}`)
    const parsed = await response.json()
    return parsed.text
  },
}