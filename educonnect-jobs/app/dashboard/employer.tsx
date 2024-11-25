import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export default async function EmployerDashboard({ userId }: { userId: string }) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { jobsPosted: { include: { applications: true } } },
  })

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">Your Posted Jobs</h2>
        {user.jobsPosted.length > 0 ? (
          <ul>
            {user.jobsPosted.map((job) => (
              <li key={job.id} className="mb-2">
                <p>Title: {job.title}</p>
                <p>Applications: {job.applications.length}</p>
                <Link href={`/jobs/${job.id}`} className="text-blue-600 hover:underline">
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs posted yet.</p>
        )}
        <Link href="/jobs/post" className="text-blue-600 hover:underline">
          Post a New Job
        </Link>
      </div>
    </div>
  )
}

