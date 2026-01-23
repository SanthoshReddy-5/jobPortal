import { error } from "console";
import { redirect } from "next/navigation";

interface EditJobPageProps{
    params:{jobId:string};
}

const EditJobPage = ({params}:EditJobPageProps) => {

  const jobId=Number(params.jobId);

  if(Number.isNaN(jobId)){
      redirect("employer-dashboard/jobs");
  }

  const {status,data:job}=getJobByIdAction(jobId);
  console.log("Job data fetched",job);

  if(status==="ERROR" || !job){
    redirect("employer-dashboard/jobs");
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Edit job Post!</h1>
      <p>Editing job with ID: {jobId}</p>
    </div>
  )
}

export default EditJobPage;