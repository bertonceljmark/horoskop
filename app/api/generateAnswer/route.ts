import { NextRequest, NextResponse } from "next/server";
import { StarValueType } from "../../interfaces/globalInterfaces";
import openai from "../../utils/openai";
import prisma from "@/lib/prisma";

const currentDate = new Date();

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

export async function GET(request: NextRequest) {
  try {
    let signId = request.nextUrl.searchParams.get("sign") as StarValueType;

    if (!signId) throw new Error("Sign not set");

    const dbEntry = await getDbEntry(signId);

    if (dbEntry?.content) {
      return NextResponse.json({ text: dbEntry.content });
    }

    // TODO Check if sign exists
    const text = await generateAnswer(signId);

    if (!text) throw new Error("No text generated");

    await prisma.prediction.create({
      data: {
        content: text,
        signId,
      },
    });

    return NextResponse.json({ text });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

async function getDbEntry(signId: StarValueType) {
  const existingEntry = await prisma.prediction.findFirst({
    where: {
      AND: [
        { signId },
        {
          createdAt: {
            gte: new Date(currentDate.toDateString()), // Start of today
            lte: new Date(currentDate.toDateString() + " 23:59:59"), // End of today
          },
        },
      ],
    },
  });

  return existingEntry;
}
