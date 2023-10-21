import { StarValueType } from "../interfaces/globalInterfaces";
import openai from "../utils/openai";

export default async function generateAnswer(sign: StarValueType) {
  const prompt = `Pretend you are a really good horoscope analyst that gets all of the predictions right.Do not mention your role.
  You achieve by writing cunning predictions that could be understood in multiple different ways. Predictions should reflect star sign character traits. 
  Predictions should reflect todays star positions, but do not mention that. Response must be 450-500 character long. 
  Prediction should be focused on today and not longer time period. Do not use emojis. Do not use word today. 
  Write the response as an average horoscope analyst would. Give me prediction for star sign ${sign}`;

  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return chatCompletion.data.choices[0].message?.content;
}
