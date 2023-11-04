import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { StarValues } from "@/app/interfaces/globalInterfaces";
import { generateWeekly } from "../gptService";

// It will fail you can generate only around 3 because GPT API,
// Should be created for loop to await each request and then save it to DB
export async function GET(request: NextRequest) {
  try {

    const requests = Object.values(StarValues).map(sign => {
      return generateWeekly(sign)
    })

    const responses = await Promise.all(requests)
    const databaseData = await responses.map(prediction => {
      return {
        signId: prediction.sign,
        content: prediction.text,
        health: prediction.health,
        money: prediction.money,
        love: prediction.love,
      }
    })

    await prisma.weeklyPrediction.createMany({ data: databaseData })
    return NextResponse.json(responses);

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 400 });
  }
}