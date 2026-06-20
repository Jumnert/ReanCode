import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/config/auth"
import { uploadAvatar, uploadBanner } from "@/config/cloudinary"
import { prisma } from "@/config/prisma"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { type, image } = body

    if (!type || !image) {
      return NextResponse.json({ error: "Missing type or image data" }, { status: 400 })
    }

    let resultUrl = ""

    if (type === "avatar") {
      const result = await uploadAvatar(image, session.user.id)
      resultUrl = result.secure_url
      await prisma.user.update({
        where: { id: session.user.id },
        data: { avatarUrl: resultUrl },
      })
    } else if (type === "banner") {
      const result = await uploadBanner(image, session.user.id)
      resultUrl = result.secure_url
      await prisma.user.update({
        where: { id: session.user.id },
        data: { bannerUrl: resultUrl },
      })
    } else {
      return NextResponse.json({ error: "Invalid upload type" }, { status: 400 })
    }

    return NextResponse.json({ url: resultUrl })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
