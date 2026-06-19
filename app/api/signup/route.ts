// Signup API Route
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";

const signupSchema = z.object({
 email: z.string().email(),
 password: z.string().min(8),
 name: z.string().min(1),
 username: z.string()
    .min(3, "ឈ្មោះអ្នកប្រើត្រូវមានយ៉ាងតិច ៣ តួអក្សរ")
    .regex(/^[a-zA-Z0-9_]+$/, "ឈ្មោះអ្នកប្រើអាចមានតែអក្សរ លេខ និងសញ្ញា _"),
 turnstileToken: z.string().optional(),
});

export async function POST(request: NextRequest) {
 try {
 const body = await request.json();
 const { email, password, name, username, turnstileToken } = signupSchema.parse(body);

 // Check if email already exists
 const existingEmail = await prisma.user.findUnique({
 where: { email },
 });

 if (existingEmail) {
 return NextResponse.json(
 { error: "អ៊ីមែលនេះត្រូវបានប្រើរួចហើយ" },
 { status: 400 },
 );
 }

 // Check if username already exists
 const existingUsername = await prisma.user.findUnique({
 where: { username },
 });

 if (existingUsername) {
 return NextResponse.json(
 { error: "ឈ្មោះអ្នកប្រើនេះត្រូវបានប្រើរួចហើយ (Username already exists)" },
 { status: 400 },
 );
 }

 // Hash password with bcrypt
 const hashedPassword = await bcrypt.hash(password, 12);

 // Create user
 const user = await prisma.user.create({
 data: {
 email,
 name,
 username,
 password: hashedPassword,
 },
 });

 return NextResponse.json(
 {
 success: true,
 message: "គណនីត្រូវបានបង្កើតដោយជោគជ័យ",
 user: {
 id: user.id,
 email: user.email,
 name: user.name,
 },
 },
 { status: 201 },
 );
 } catch (error) {
 if (error instanceof z.ZodError) {
 return NextResponse.json(
 { error: "ទិន្នន័យមិនត្រឹមត្រូវ" },
 { status: 400 },
 );
 }

 console.error("Signup error:", error);
 return NextResponse.json(
 { error: "មានបញ្ហាកើតឡើង។ សូមព្យាយាមម្តងទៀត" },
 { status: 500 },
 );
 }
}
