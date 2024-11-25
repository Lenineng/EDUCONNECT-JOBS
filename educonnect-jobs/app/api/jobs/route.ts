import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getSession } from '@/lib/auth'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const session = await getSession()
  if (!session || session.role !== 'employer') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { title, description, company, location, salary } = await req.json()
  try {
    const job = await prisma.job.create({
      data: {
        title,
        description,
        company,
        location,
        salary,
        employerId: session.userId,
      },
    })
    return NextResponse.json(job)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 })
  }
}

