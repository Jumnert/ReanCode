import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/config/auth";
import { prisma } from "@/config/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const experiences = await prisma.workExperience.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' } // Could also order by employmentPeriod start
    });

    return NextResponse.json(experiences);
  } catch (error: any) {
    console.error("Failed to fetch work experience:", error);
    return NextResponse.json({ error: "Failed to fetch work experience" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { companyName, companyLogo, companyWebsite, isCurrentEmployer, positions } = body;

    if (!companyName) {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 });
    }

    const newExperience = await prisma.workExperience.create({
      data: {
        userId,
        companyName,
        companyLogo,
        companyWebsite,
        isCurrentEmployer: Boolean(isCurrentEmployer),
        positions: positions || []
      }
    });

    return NextResponse.json(newExperience);
  } catch (error: any) {
    console.error("Failed to add work experience:", error);
    return NextResponse.json({ error: "Failed to add work experience" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, companyName, companyLogo, companyWebsite, isCurrentEmployer, positions } = body;

    if (!id) {
      return NextResponse.json({ error: "Experience ID is required" }, { status: 400 });
    }

    // Verify ownership
    const existing = await prisma.workExperience.findUnique({ where: { id } });
    if (!existing || existing.userId !== userId) {
      return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 });
    }

    const updatedExperience = await prisma.workExperience.update({
      where: { id },
      data: {
        companyName,
        companyLogo,
        companyWebsite,
        isCurrentEmployer: Boolean(isCurrentEmployer),
        positions: positions || []
      }
    });

    return NextResponse.json(updatedExperience);
  } catch (error: any) {
    console.error("Failed to update work experience:", error);
    return NextResponse.json({ error: "Failed to update work experience" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Experience ID is required" }, { status: 400 });
    }

    // Verify ownership
    const existing = await prisma.workExperience.findUnique({ where: { id } });
    if (!existing || existing.userId !== userId) {
      return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 });
    }

    await prisma.workExperience.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to delete work experience:", error);
    return NextResponse.json({ error: "Failed to delete work experience" }, { status: 500 });
  }
}
