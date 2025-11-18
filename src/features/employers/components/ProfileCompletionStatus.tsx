import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation";
import { getCurrentEmployerDetails } from "../employerQueries";

export async function ProfileCompletionStatus() {

  const currentEmployer=await getCurrentEmployerDetails();

  if(!currentEmployer){
    return redirect("/login");
  }

  if(currentEmployer.isProfileCompleted){
    return null;
  }

  return (
    <Alert
      variant="destructive"
      className="flex items-center justify-between border border-destructive/40 bg-destructive/5">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 flex items-center justify-center rounded-md bg-destructive/15">
          <AlertTriangle className="h-5 w-5" />
        </div>

        <div className="flex flex-col gap-1">
          <AlertTitle className="text-lg font-semibold">
            Complete Your Profile
          </AlertTitle>
          <AlertDescription className="text-sm">
            You haven’t completed your employer profile. Complete it now to post
            jobs, manage applicants, and unlock all features.
          </AlertDescription>
        </div>
      </div>

      <Button variant="destructive" size="sm" className="w-fit" asChild>
        <Link href="/employer-dashboard/settings">Complete Profile</Link>
      </Button>
    </Alert>
  )
}
