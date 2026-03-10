import { getJobById } from '@/features/employers/jobQueries';
import { Building2, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import JobOverview from '@/features/applicants/components/JobOverview';

import { db } from "@/config/db";
import { jobApplications, resumes } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { getCurrentUser } from '@/features/auth/authQueries';
import { ApplyJobModal } from '@/features/applicants/components/ApplyJobModal';

interface JobDetailsPageProps {
  params: { jobId: string };
}

const jobDetailsPage = async ({ params }: JobDetailsPageProps) => {
  const jobId = parseInt(params.jobId);

  if (isNaN(jobId)) {
    return notFound();
  }

  const job = await getJobById(jobId);

  if (!job) {
    return notFound();
  }

  const user = await getCurrentUser();
  let hasApplied = false;
  let userResumes: { id: number; fileName: string }[] = [];

  if (user) {
    const existingApplication = await db.select().from(jobApplications).where(
      and(
        eq(jobApplications.jobId, jobId),
        eq(jobApplications.applicantId, user.id),
      )).limit(1);

    hasApplied = existingApplication.length > 0;

    userResumes = await db.select({
      id: resumes.id, fileName: resumes.fileName
    }).from(resumes).where(eq(resumes.applicantId, user.id));
  }

  return (
    <div className="container mx-auto max-w-6xl py-10 px-4 space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between border-b pb-8">
        <div className="flex gap-5">
          {/* Logo */}
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border bg-gray-50">
            {job.companyLogo ? (
              <Image
                src={job.companyLogo}
                alt={job.companyName || "Company"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-lg font-bold text-gray-400">
                {job.companyName?.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          {/* Title & Meta */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              About the selected Job!
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {job.companyName}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location || "Remote"}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Posted{" "}
                {formatDistanceToNow(new Date(job.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
          {user ? (
            <ApplyJobModal
              jobId={jobId}
              jobTitle={job.title}
              hasApplied={hasApplied}
              resumes={userResumes}
            />
          ) : (
            <Button
              size="lg"
              className="w-full md:w-auto font-semibold"
              asChild>
              <Link href="/login">Login to Apply</Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div
              className="prose prose-blue max-w-none text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </section>

          {/* Tags */}
          {job.tags && (
            <section className="pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.tags.split(/[,\s]+/).filter(Boolean).map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </section>
          )}
        </div>

        <JobOverview job={job} />
      </div>
    </div>
  )
}



export default jobDetailsPage;