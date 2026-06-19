import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/config/auth"
import { prisma } from "@/config/prisma"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const today = new Date()
    today.setUTCHours(0, 0, 0, 0) // Normalize to midnight UTC for daily tracking

    const activity = await prisma.studyActivity.upsert({
      where: {
        userId_date: {
          userId: session.user.id,
          date: today,
        },
      },
      update: {
        count: { increment: 1 },
      },
      create: {
        userId: session.user.id,
        date: today,
        count: 1,
      },
    })

    return NextResponse.json(activity)
  } catch (error: any) {
    console.error("Study tracking error:", error)
    return NextResponse.json({ error: "Failed to track study activity" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the last 365 days of activity
    const oneYearAgo = new Date()
    oneYearAgo.setDate(oneYearAgo.getDate() - 365)
    oneYearAgo.setUTCHours(0, 0, 0, 0)

    const activities = await prisma.studyActivity.findMany({
      where: {
        userId: session.user.id,
        date: { gte: oneYearAgo },
      },
      orderBy: { date: 'asc' },
    })

    // Format for the contribution graph
    const formattedActivities = activities.map(a => {
      const count = a.count
      return {
        date: a.date.toISOString().split('T')[0],
        count,
        level: count > 3 ? 4 : count > 2 ? 3 : count > 1 ? 2 : count > 0 ? 1 : 0
      }
    })

    return NextResponse.json(formattedActivities)
  } catch (error: any) {
    console.error("Failed to fetch study activity:", error)
    return NextResponse.json({ error: "Failed to fetch study activity" }, { status: 500 })
  }
}
