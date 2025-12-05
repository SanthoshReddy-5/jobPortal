import EmployerSettingsForm from "@/features/employers/components/EmployerSettingsForm";
import { getCurrentEmployerDetails } from "@/features/employers/employerQueries";
import { redirect } from "next/navigation";

const EmployerSettingsPage = async () => {

  const currentEmployer = await getCurrentEmployerDetails();

  if (!currentEmployer) {
    return redirect("/login");
  }

  console.log("Current Employer:",currentEmployer);

  return (
    <div>
      <EmployerSettingsForm initialData={{
        name:currentEmployer.employerDetails.name,
        description:currentEmployer.employerDetails.description,
        organizationType:currentEmployer.employerDetails.organizationType,
        teamSize:currentEmployer.employerDetails.teamSize,
        location:currentEmployer.employerDetails.location,
        websiteUrl:currentEmployer.employerDetails.websiteUrl,
        yearOfEstablishment:currentEmployer.employerDetails.yearOfEstablishment?.toString()
      }}/>
    </div>
  )
}

export default EmployerSettingsPage;