import { redirect } from "next/navigation"
import { auth } from "@/config/auth"
import { prisma } from "@/config/prisma"
import { UsernameSetupForm } from "@/components/username-setup-form"

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
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card border border-border/60 rounded-xl p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold font-sans tracking-tight mb-2">Welcome to Rean2Code! 🎉</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Please set a unique username to create your public profile. This is how others will find you.
          </p>
          <UsernameSetupForm />
        </div>
      </div>
    )
  }
}
