import React from 'react';
import { getJobs } from '@/features/employers/jobQueries';
import JobCard from '@/features/employers/components/JobCard';

const JobsPage = async () => {

  const jobs = await getJobs();
  console.log("Jobs:", jobs);

  return (
    <div className='space-y-6 p-6'>
      <div className='flex flex-col gap-2'>
         <h1 className='text-2xl font-bold tracking-tight text-gray-900'>Find your Next Dream Job!</h1>
         <p className='text-gray-500'>Browse latest job openings from top companies</p>
      </div>

        {jobs.length>0?(
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {jobs.map((job)=>(<JobCard key={job.id} job={job} />))}
          </div>
        ):(
          <div className='flex h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-center'>
            <h3 className='mt-4 text-lg font-semibold text-gray-900'>No jobs found!</h3>
            <p className='text-gray-500'>Check back later for new opportunities.</p>
          </div>
        )}
    </div>
  );
}

export default JobsPage;