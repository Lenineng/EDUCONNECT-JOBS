import { NextResponse } from 'next/server'
import { createUser } from '@/lib/auth'

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json()
  try {
    await createUser(email, password, name, role)
    return NextResponse.json({ message: 'User created successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}

