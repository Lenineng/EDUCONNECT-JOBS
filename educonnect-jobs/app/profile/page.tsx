import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import ProfileForm from './profile-form'

const prisma = new PrismaClient()

export default async function ProfilePage() {
  const session = await getSession()
  
  if (!session) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { profile: true },
  })

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      <ProfileForm user={user} />
    </div>
  )
}

