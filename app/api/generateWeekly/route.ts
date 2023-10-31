import { NextRequest, NextResponse } from "next/server";
import { StarValueType } from "../../interfaces/globalInterfaces";
import openai from "../../utils/openai";
import prisma from "@/lib/prisma";

interface IWeaklyPrediction {
  text: string,
  health: number,
  money: number,
  love: number,
}

async function generateWeekly(sign: StarValueType): Promise<IWeaklyPrediction> {
  const prompt = `Act like a really good fortune teller and predict the weekly horoscope for the astrological sign ${sign}.
  You achieve by writing cunning predictions that could be understood in multiple different ways. Predictions should reflect star sign character traits. 
  Predictions should reflect todays star positions, but do not mention that. Response must be 450-500 character long. 
  Prediction should be focused on today and not longer time period. Do not use emojis. Do not use word today.
  
  Output should look like this in JSON format: {
    text: string
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

export async function GET(request: NextRequest) {
  try {
    let signId = request.nextUrl.searchParams.get("sign") as StarValueType;
    if (!signId) throw new Error("Sign not set");

    const response = await generateWeekly(signId);
    if (!response) throw new Error("No text generated");

    await prisma.weeklyPrediction.create({
      data: {
        signId,
        content: response.text,
        health: response.health,
        money: response.money,
        love: response.love,
      }
    })

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}