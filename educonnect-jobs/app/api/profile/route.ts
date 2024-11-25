import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getSession } from '@/lib/auth'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { name, bio, skills, experience, education } = await req.json()
  try {
    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: {
        name,
        profile: {
          upsert: {
            create: { bio, skills, experience, education },
            update: { bio, skills, experience, education },
          },
        },
      },
    })
    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}

