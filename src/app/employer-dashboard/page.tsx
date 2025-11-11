import { logoutUserAction } from '@/features/auth/authActions';
import { getCurrentUser } from '@/features/auth/authQueries';
import React from 'react'

const EmployerDashboard = async() => {

  const user=await getCurrentUser();
  console.log("user data:",user);

  return (
    <div>
      <div className='bg-black text-white p-10'>
        <h1>Employer Dashboard</h1>
        <h2>Hello, {user?.name}!</h2>
        <h2>Your Email: {user?.email}</h2>
        <button className='py-2 px-3 mt-2 rounded-md bg-white text-black' onClick={logoutUserAction}>Logout</button>
      </div>
    </div>
  )
}

export default EmployerDashboard;