import { NextResponse } from 'next/server'
import { getUser, createSession } from '@/lib/auth'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const user = await getUser(email, password)
  if (user) {
    await createSession(user)
    return NextResponse.json({ message: 'Logged in successfully' })
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}

