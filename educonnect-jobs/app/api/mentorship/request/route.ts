import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getSession } from '@/lib/auth'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const session = await getSession()
  if (!session || session.role !== 'undergraduate') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { mentorId, message } = await req.json()
  try {
    const mentorshipRequest = await prisma.mentorRequest.create({
      data: {
        mentorId,
        menteeId: session.userId,
        message,
        status: 'pending',
      },
    })
    return NextResponse.json(mentorshipRequest)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send mentorship request' }, { status: 500 })
  }
}

