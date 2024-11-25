import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export default async function UndergraduateDashboard({ userId }: { userId: string }) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true, jobsApplied: { include: { job: true } } },
  })

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
          {user.
profile ? (
            <>
              <p>Bio: {user.profile.bio}</p>
              <p>Skills: {user.profile.skills}</p>
              <p>Experience: {user.profile.experience}</p>
              <p>Education: {user.profile.education}</p>
            </>
          ) : (
            <p>No profile information available.</p>
          )}
          <Link href="/profile" className="text-blue-600 hover:underline">
            Edit Profile
          </Link>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Your Job Applications</h2>
          {user.jobsApplied.length > 0 ? (
            <ul>
              {user.jobsApplied.map((application) => (
                <li key={application.id} className="mb-2">
                  <p>Job: {application.job.title}</p>
                  <p>Company: {application.job.company}</p>
                  <p>Status: {application.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No job applications yet.</p>
          )}
          <Link href="/jobs" className="text-blue-600 hover:underline">
            Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  )
}

