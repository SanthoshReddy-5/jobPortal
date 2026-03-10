import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getCurrentUser } from "@/features/auth/authQueries";
import { redirect } from "next/navigation";
import { getApplicantProfileData } from "../applicantQueries";

export async function ApplicantProfileStatus() {
  const user=await getCurrentUser();

  if(!user){
    return redirect("/login");
  }

  const profileData=await getApplicantProfileData(user.id);

  const isCompleted= !!(
    profileData?.location &&
    profileData?.biography &&
    profileData?.experience &&
    profileData?.resumeUrl
  );

  if(isCompleted){
    return null;
  }

  return (
    <Alert
      variant="destructive"
      className="flex items-center justify-between border border-destructive/40 bg-destructive/5 p-5">
      <div className="flex items-start gap-4">
        <div className="h-15 w-15 flex items-center justify-center rounded-md bg-destructive/15">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="flex flex-col gap-1">
          <AlertTitle className="text-lg font-semibold">
            Complete Your Profile
          </AlertTitle>
          <AlertDescription className="text-sm">
            You haven’t completed your applicant profile.
            Complete it now & build your custom Resume to get better job alerts.
          </AlertDescription>
        </div>
      </div>

      <Button variant="destructive" size="sm" className="w-fit" asChild>
        <Link href="/dashboard/settings">Complete Profile</Link>
      </Button>
    </Alert>
  );
}