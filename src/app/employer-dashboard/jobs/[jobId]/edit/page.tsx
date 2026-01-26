import { JobPostingForm } from "@/features/employers/components/JobPostingForm";
import { getJobDetailsByIdAction } from "@/features/employers/jobActions";
import { redirect } from "next/navigation";

interface EditJobPageProps{
    params:{jobId:string};
}

const EditJobPage = async ({params}:EditJobPageProps) => {

  const jobId=Number(params.jobId);

  if(Number.isNaN(jobId)){
      redirect("employer-dashboard/jobs");
  }

  const {status, data:job}=await getJobDetailsByIdAction(jobId);
  console.log("Job data fetched",job);

  if(status==="ERROR" || !job){
    redirect("employer-dashboard/jobs");
  }

  return (
    <div className='max-w-3xl mx-auto py-8'>
      <div className="mb-8">
        <h1 className='text-2xl font-bold'>Editing job: {job.title}</h1>
      </div>

      <JobPostingForm initialData={job} isEditMode={true}/>
    </div>
  )
}

export default EditJobPage;