import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import UndergraduateDashboard from './undergraduate'
import EmployerDashboard from './employer'
import MentorDashboard from './mentor'

export default async function Dashboard() {
  const session = await getSession()
  
  if (!session) {
    redirect('/login')
  }

  switch (session.role) {
    case 'undergraduate':
      return <UndergraduateDashboard userId={session.userId} />
    case 'employer':
      return <EmployerDashboard userId={session.userId} />
    case 'mentor':
      return <MentorDashboard userId={session.userId} />
    default:
      return <div>Invalid user role</div>
  }
}

