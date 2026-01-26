import ApplicantSidebar from "@/features/applicants/components/ApplicantSidebar";
import { getCurrentUser } from "@/features/auth/authQueries";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  console.log("user data:", user);

  if (!user) {
    return redirect("/login");
  }

  if (user.role !== "applicant") {
    return redirect("/employer-dashboard");
  }

  return (
    <div className="flex min-h-screen bg-background">
        <ApplicantSidebar/>
      <main className="container mx-auto mt-5 ml-70 mr-5">{children}</main>
    </div>
  );
}
