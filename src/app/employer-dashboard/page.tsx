import { getCurrentUser } from '@/features/auth/authQueries';
import { ProfileCompletionStatus } from '@/features/employers/components/ProfileCompletionStatus';
import { StatusCards } from '@/features/employers/components/StatusCards';
import { redirect } from 'next/navigation';
import React from 'react'

const EmployerDashboard = async () => {

  const user = await getCurrentUser();
  console.log("user data:", user);

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Hello, <span className="capitalize">{user?.name.toLowerCase()}</span>
        </h1>
        <p className="text-muted-foreground">
          Here is your daily activities and appLications
        </p>
      </div>

      <StatusCards />

      <ProfileCompletionStatus />
    </div>
  )
}

export default EmployerDashboard;