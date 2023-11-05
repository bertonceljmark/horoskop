import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { StarValueType, StarValues } from "../../interfaces/globalInterfaces";
import { generateWeekly } from "../gptService";

export async function GET(request: NextRequest) {
  try {
    let signId = request.nextUrl.searchParams.get("sign") as StarValueType
    if (!signId) throw new Error("Sign not set")
    if (!Object.keys(StarValues).includes(signId.toLocaleUpperCase())) throw new Error("Sign not valid")

    const response = await generateWeekly(signId)
    if (!response) throw new Error("No content generated")

    await prisma.weeklyPrediction.create({
      data: {
        signId,
        content: response.content,
        health: response.health,
        money: response.money,
        love: response.love,
      }
    })

    return NextResponse.json(response)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}