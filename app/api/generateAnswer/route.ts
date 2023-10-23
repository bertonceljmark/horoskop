import { NextRequest, NextResponse } from 'next/server';
import { StarValueType } from "../../interfaces/globalInterfaces";
import openai from "../../utils/openai";

async function generateAnswer(sign: StarValueType) {
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

export async function GET(request: NextRequest){
  try {
    let sign = request.nextUrl.searchParams.get('sign')
    if (!sign) throw new Error('Sign not set')
    
    // TODO Check if sign exists
    const text = await generateAnswer(sign as StarValueType)
    return NextResponse.json({ text });
    
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}

