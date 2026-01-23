import EmployerSettingsForm from "@/features/employers/components/EmployerSettingsForm";
import { getCurrentEmployerDetails } from "@/features/employers/employerQueries";
import { EmployerProfileData } from "@/features/employers/employerSchema";
import { redirect } from "next/navigation";

const EmployerSettingsPage = async () => {

  const currentEmployer = await getCurrentEmployerDetails();

  if (!currentEmployer) {
    return redirect("/login");
  }

  console.log("Current Employer:", currentEmployer);

  return (
    <div  className='container mx-auto py-6'>
      <h1 className='text-2xl font-bold mb-6'>Finish setting up your profile!</h1>
      <EmployerSettingsForm initialData={
        {
          name: currentEmployer.employerDetails.name,
          description: currentEmployer.employerDetails.description,
          organizationType: currentEmployer.employerDetails.organizationType,
          teamSize: currentEmployer.employerDetails.teamSize,
          location: currentEmployer.employerDetails.location,
          websiteUrl: currentEmployer.employerDetails.websiteUrl,
          yearOfEstablishment: currentEmployer.employerDetails.yearOfEstablishment?.toString(),
          avatarUrl: currentEmployer.avatarUrl,
          bannerImageUrl:currentEmployer.employerDetails.bannerImageUrl
        } as EmployerProfileData
      } />
    </div>
  )
}

export default EmployerSettingsPage;