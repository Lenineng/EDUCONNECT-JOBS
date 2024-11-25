import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export default async function MentorDashboard({ userId }: { userId: string }) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { mentorRequests: { include: { mentee: true } } },
  })

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">Mentorship Requests</h2>
        {user.mentorRequests.length > 0 ? (
          <ul>
            {user.mentorRequests.map((request) => (
              <li key={request.id} className="mb-2">
                <p>From: {request.mentee.name}</p>
                <p>Status: {request.status}</p>
                <Link href={`/mentorship/${request.id}`} className="text-blue-600 hover:underline">
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No mentorship requests yet.</p>
        )}
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
        <Link href="/profile" className="text-blue-600 hover:underline">
          Edit Profile
        </Link>
      </div>
    </div>
  )
}

