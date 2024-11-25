'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ApplyForm({ jobId }: { jobId: string }) {
  const [coverLetter, setCoverLetter] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/jobs/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId, coverLetter }),
    })
    if (response.ok) {
      router.refresh()
    } else {
      alert('Failed to apply for job')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Apply for this Job</h2>
      <div className="mb-4">
        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">Cover Letter</label>
        <textarea
          id="coverLetter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={6}
          required
        ></textarea>
      </div>
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit Application
      </button>
    </form>
  )
}

