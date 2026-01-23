"use client";

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Job } from '../jobTypes';
import { deleteJobAction, getEmployerJobsAction } from '../jobActions';
import { Loader2 } from 'lucide-react';
import EmployerJobCard from './EmployerJobCard';
import { useRouter } from 'next/navigation';

const EmployerJoblist = () => {

    const router=useRouter();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchJobs() {
            setIsLoading(true);
            try {
                const res = await getEmployerJobsAction();

                if (res.status === "SUCCESS" && res.data) {
                    setJobs(res.data);
                } else {
                    toast.error(res.message || "Failed to load Jobs!")
                }
            } catch (error) {
                toast.error("Something went wrong")
            } finally {
                setIsLoading(false);
            }
        }

        fetchJobs();
    }, []);

    const handleDelete=async (jobId:number)=>{
        try{
            const res=await deleteJobAction(jobId);

            if(res.status==="SUCCESS"){
                setJobs((prevJobs)=>prevJobs.filter((job)=>job.id!==jobId));
                toast.success("Job Deleted Successfully!");
            }else{
                toast.error(res.message);
            }
        }catch(error){
            toast.error("An unexpected error occurred!");
        }
    }

    const handleEdit=async (jobId:number)=>{
        router.push(`/employer-dashboard/jobs/${jobId}/edit`);
    }

    if (isLoading) {
        return (
            <div className='flex justify-center items-center min-h-[400px]'>
               <Loader2 className='w-8 h-8 animate-spin'/>
            </div>
        );
    }

    if(jobs.length===0){
        return (
            <div className='text-center py-12'>
               <p className='text-muted-foreground'>No Jobs posted!</p>
            </div>
        );
    }

    return (
        <section className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
          {jobs.map((job)=>(<EmployerJobCard key={job.id} job={job} onDelete={handleDelete} onEdit={handleEdit}/>))}
        </section>
    )
}

export default EmployerJoblist;