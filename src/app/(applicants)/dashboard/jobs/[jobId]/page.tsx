import { getJobById } from '@/features/employers/jobQueries';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface JobDetailsPageProps{
    params:{jobId:string};
}

const jobDetailsPage =async({params}:JobDetailsPageProps) => {
  const jobId=parseInt(params.jobId);

  if(isNaN(jobId)){
    return notFound();
  }

  const job=await getJobById(jobId);

  if(!job){
    return notFound();
  }
    
  return (
    <div className='container mx-auto max-w-6xl py-10 px-4 space-y-8'>
        <nav className='flex items-center gap-2 text-sm text-muted-foreground mb-6'>
          Dashboard
        </nav>

        <div>{jobId}</div>
    </div>
  )
}

export default jobDetailsPage;