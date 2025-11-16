import { getCurrentUser } from "@/features/auth/authQueries";
import RegistrationForm from "@/features/auth/components/registrationForm";
import { redirect } from "next/navigation";

const RegistrationPage = async () => {
  const user = await getCurrentUser();

  if (user) {
    if (user.role === "applicant") {
      return redirect("/dashboard");
    }
    if (user.role === "employer") {
      return redirect("/employer-dashboard");
    }
  }

  return (
    <>
      <RegistrationForm />
    </>
  )
}

export default RegistrationPage;