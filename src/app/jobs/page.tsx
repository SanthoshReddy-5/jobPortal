import React from 'react';
import { getJobs, JobFilterParams } from '@/features/employers/jobQueries';
import JobCard from '@/features/employers/components/JobCard';
import { JobFilters } from '@/features/applicants/components/JobFilters';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const JobsPage = async ({ searchParams }: PageProps) => {

  const resolvedParams = await searchParams;
  console.log("resolvedParams: ", resolvedParams);

  const filters: JobFilterParams = {
    search:
      typeof resolvedParams.search === "string"
        ? resolvedParams.search
        : undefined,
    jobType:
      typeof resolvedParams.jobType === "string"
        ? resolvedParams.jobType
        : undefined,
    jobLevel:
      typeof resolvedParams.jobLevel === "string"
        ? resolvedParams.jobLevel
        : undefined,
    workType:
      typeof resolvedParams.workType === "string"
        ? resolvedParams.workType
        : undefined,
  };
  
  const jobs = await getJobs(filters);
  console.log("Jobs:", jobs);

  return (
    <div className='space-y-6 p-6'>
      <div className='flex flex-col gap-2'>
         <h1 className='text-2xl font-bold tracking-tight text-gray-900'>Find your Next Dream Job!</h1>
         <p className='text-gray-500'>Browse latest job openings from top companies</p>
      </div>

      <JobFilters />

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