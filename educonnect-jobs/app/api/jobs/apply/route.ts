import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getSession } from '@/lib/auth'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const session = await getSession()
  if (!session || session.role !== 'undergraduate') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { jobId, coverLetter } = await req.json()
  try {
    const application = await prisma.jobApplication.create({
      data: {
        jobId,
        applicantId: session.userId,
        coverLetter,
        status: 'pending',
      },
    })
    return NextResponse.json(application)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}

