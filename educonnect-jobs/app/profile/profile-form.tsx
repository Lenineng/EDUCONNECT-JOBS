'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Profile } from '@prisma/client'

type UserWithProfile = User & { profile: Profile | null }

export default function ProfileForm({ user }: { user: UserWithProfile }) {
  const [name, setName] = useState(user.name)
  const [bio, setBio] = useState(user.profile?.bio || '')
  const [skills, setSkills] = useState(user.profile?.skills || '')
  const [experience, setExperience] = useState(user.profile?.experience || '')
  const [education, setEducation] = useState(user.profile?.education || '')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, bio, skills, experience, education }),
    })
    if (response.ok) {
      router.refresh()
    } else {
      alert('Failed to update profile')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={3}
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
        <input
          type="text"
          id="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
        <textarea
          id="experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={3}
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="education" className="block text-sm font-medium text-gray-700">Education</label>
        <textarea
          id="education"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={3}
        ></textarea>
      </div>
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Update Profile
      </button>
    </form>
  )
}

