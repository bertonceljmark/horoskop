import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const now = new Date()
    const startDay = 1; //0=sunday, 1=monday etc.
    const d = now.getDay(); //get the current day
    const weekStart = new Date(now.valueOf() - (d<=0 ? 7-startDay:d-startDay)*86400000); //rewind to start day
    const weekEnd = new Date(weekStart.valueOf() + 6*86400000); //add 6 days to get last day
    
    const results = await prisma.weeklyPrediction.findMany({
      where: {
        createdAt: {
          gte: weekStart, // Start of today
          lte: weekEnd, // End of today
        }
      }
    })

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}