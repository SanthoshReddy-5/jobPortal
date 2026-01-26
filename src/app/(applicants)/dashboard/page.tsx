import { logoutUserAction } from '@/features/auth/authActions';
import { getCurrentUser } from '@/features/auth/authQueries';
import { redirect } from 'next/navigation';
import React from 'react'

const ApplicantDashboard = async () => {

  const user = await getCurrentUser();
  console.log("user data:", user);

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className='bg-black text-white p-10'>
      <h1>Applicant Dashboard</h1>
      <h2>Hello, {user?.name}!</h2>
      <h2>Your Email: {user?.email}</h2>
    </div>
  )
}

export default ApplicantDashboard;