import { auth } from "@/config/auth"
import { prisma } from "@/config/prisma"
import { UsernameSetupDialog } from "./username-setup-dialog"

export async function UsernameSetupCheck() {
  const session = await auth()
  if (!session?.user?.id) return null

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { username: true },
  })

  if (user?.username) return null

  return <UsernameSetupDialog />
}
