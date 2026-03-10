import { getApplicantProfileData } from '@/features/applicants/applicantQueries';
import ApplicantSettingsForm from '@/features/applicants/components/ApplicantSettingsForm';
import { getCurrentUser } from '@/features/auth/authQueries';
import { redirect } from 'next/navigation';
import React from 'react';

const ApplicantSettingsPage = async () => {
  const user=await getCurrentUser();

  if(!user){
    redirect("/login");
  }

  const initialData=await getApplicantProfileData(user.id);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Profile Settings</h2>
        <p className="text-muted-foreground">
          Manage your personal information and professional profile.
        </p>
      </div>

      <ApplicantSettingsForm initialData={initialData} />
    </div>
  )
}

export default ApplicantSettingsPage;