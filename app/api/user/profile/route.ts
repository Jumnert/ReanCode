import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/config/prisma"
import { auth } from "@/config/auth"
import { redis, CacheKeys } from "@/config/redis"

export async function PUT(req: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const {
      name,
      username,
      bio,
      location,
      phone,
      pronouns,
      title,
      portfolioUrl,
      techStack,
    } = body

    // Check if username is already taken by someone else
    if (username) {
      const existingUser = await prisma.user.findUnique({
        where: { username },
      })
      
      if (existingUser && existingUser.id !== session.user.id) {
        return NextResponse.json({ error: "Username is already taken" }, { status: 400 })
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        username,
        bio,
        location,
        phone,
        pronouns,
        title,
        portfolioUrl,
        techStack: techStack ? techStack : undefined,
      },
    })

    // Invalidate profile cache so other viewers see fresh data
    if (updatedUser.username) {
      await redis.del(CacheKeys.userProfile(updatedUser.username))
    }

    return NextResponse.json(updatedUser)
  } catch (error: any) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Failed to update profile", details: error.message }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}
