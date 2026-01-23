import { JobPostingForm } from "@/features/employers/components/JobPostingForm";

const JobPostingPage = () => {
  return (
    <div className='container mx-auto py-6'>
        <h1 className='text-2xl font-bold mb-6'>Post a new Job!</h1>
        <JobPostingForm />
    </div>
  )
}

export default JobPostingPage;