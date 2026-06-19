import { redirect } from "next/navigation"
import { auth } from "@/config/auth"
import { prisma } from "@/config/prisma"

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    redirect("/login")
  }

  if (user.username) {
    redirect(`/${user.username}`)
  } else {
    // Fallback if somehow they have no username
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Please set a username</h1>
          <p className="text-muted-foreground">You need a username to view your profile.</p>
        </div>
      </div>
    )
  }
}
