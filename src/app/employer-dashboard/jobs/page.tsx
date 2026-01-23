import EmployerJoblist from '@/features/employers/components/EmployerJoblist';
import React from 'react'

const MyJobsPage = () => {
    return (
        <div className='container mx-auto py-6'>
            <h1 className='text-2xl font-bold mb-6'>Below are the Jobs Posted!</h1>
            <EmployerJoblist />
        </div>
    )
}

export default MyJobsPage;