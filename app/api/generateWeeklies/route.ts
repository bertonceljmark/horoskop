import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { StarValueType, StarValues } from "@/app/interfaces/globalInterfaces";
import { generateWeekly } from "../gptService";

// Should be better with Promise.all() in parallel but ChatGPT API fails
export async function GET(request: NextRequest) {
  try {
    const weeklies = []
    const failed = []
    for (const sign of Object.values(StarValues)) {
      try {
        const generatedWeekly = await generateWeekly(sign)
  
        weeklies.push({
          signId: generatedWeekly.sign,
          content: generatedWeekly.content,
          health: generatedWeekly.health,
          money: generatedWeekly.money,
          love: generatedWeekly.love,
        })
      } catch (error) {
        console.error(`Generating weekly failed for: ${sign}`, error)
        failed.push(sign)
      }
    }

    for (const sign of failed) {
      try {
        const generatedWeekly = await generateWeekly(sign as StarValueType)
        weeklies.push({
          signId: generatedWeekly.sign,
          content: generatedWeekly.content,
          health: generatedWeekly.health,
          money: generatedWeekly.money,
          love: generatedWeekly.love,
        })
      } catch (error) {
        console.error(`Generating weekly failed 2nd time for: ${sign}`, error)
      }
    }

    await prisma.weeklyPrediction.createMany({ data: weeklies })
    return NextResponse.json(weeklies);

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}