import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function createUser(email: string, password: string, name: string, role: string) {
  const hashedPassword = await bcrypt.hash(password, 10)
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
    },
  })
}

export async function getUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (user && (await bcrypt.compare(password, user.password))) {
    return user
  }
  return null
}

export async function createSession(user: { id: string; email: string; role: string }) {
  const token = await new SignJWT({ userId: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))

  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 86400,
    path: '/',
  })
}

export async function getSession() {
  const token = cookies().get('session')?.value
  if (!token) return null
  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
    return verified.payload as { userId: string; email: string; role: string }
  } catch (err) {
    return null
  }
}

export async function logout() {
  cookies().set('session', '', { maxAge: 0 })
}

