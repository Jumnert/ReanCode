// Re-export the canonical Prisma singleton so any future imports from
// "@/lib/db" keep working without duplicating the client setup.
export { prisma as db, prisma, default } from '@/config/prisma'
