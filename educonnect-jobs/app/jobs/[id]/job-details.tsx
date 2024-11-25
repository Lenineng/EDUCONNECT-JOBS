import { Job, User } from '@prisma/client'

type JobWithEmployer = Job & { employer: User }

export default function JobDetails({ job }: { job: JobWithEmployer }) {
  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-4">{job.company} - {job.location}</p>
      <p className="mb-4">{job.description}</p>
      {job.salary && <p className="mb-4">Salary: {job.salary}</p>}
      <p>Posted by: {job.employer.name}</p>
    </div>
  )
}

