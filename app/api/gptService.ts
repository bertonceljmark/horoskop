

import { IWeaklyPrediction, StarValueType } from "../interfaces/globalInterfaces";
import openai from "../utils/openai";

export async function generateWeekly(sign: StarValueType): Promise<IWeaklyPrediction> {
  const prompt = `Act like a really good fortune teller and predict the weekly horoscope for the astrological sign ${sign}.
  You achieve by writing cunning predictions that could be understood in multiple different ways. Predictions should reflect star sign character traits. 
  Predictions should reflect todays star positions, but do not mention that. Response must be 450-500 character long. 
  Prediction should be focused on today and not longer time period. Do not use emojis. Do not use word today.
  
  Output should look like this in JSON format: {
    sign: "virgo"|"libra"|"scorpio"|"sagittarius"|"capricorn"|"aquarius"|"pisces"|"aries"|"taurus"|"gemini"|"cancer"|"leo",
    text: string,
    health: number from 0 to 10,
    money: number from 0 to 10,
    love: number from 0 to 10,
  }`;

  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: prompt }],
  });

  return await JSON.parse(chatCompletion.data.choices[0].message?.content!);
}