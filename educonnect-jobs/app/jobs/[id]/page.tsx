import { PrismaClient } from '@prisma/client'
import { getSession } from '@/lib/auth'
import JobDetails from './job-details'
import ApplyForm from './apply-form'

const prisma = new PrismaClient()

export default async function JobPage({ params }: { params: { id: string } }) {
  const session = await getSession()
  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: { employer: true },
  })

  if (!job) {
    return <div>Job not found</div>
  }

  const hasApplied = session && await prisma.jobApplication.findFirst({
    where: {
      jobId: job.id,
      applicantId: session.userId,
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <JobDetails job={job} />
      {session && session.role === 'undergraduate' && !hasApplied && (
        <ApplyForm jobId={job.id} />
      )}
      {hasApplied && (
        <p className="mt-4 text-green-600">You have already applied for this job.</p>
      )}
    </div>
  )
}

