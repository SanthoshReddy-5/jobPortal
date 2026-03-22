import Link from "next/link";
import { Briefcase, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutUserAction } from "@/features/auth/authActions";
import { getCurrentUser } from "@/features/auth/authQueries";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-primary">
          <Briefcase className="w-6 h-6" />
          JobPortal
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            HOME
          </Link>
          <Link href="/jobs" className="hover:text-blue-600 transition-colors">
            FIND JOB
          </Link>
          <Link href="/" className="hover:text-blue-600 transition-colors">
            EMPLOYERS
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Post a Job</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="outline" className="hover:bg-primary hover:text-secondary">
                <Link
                  href={
                    user.role === "employer"
                      ? "/employer-dashboard"
                      : "/dashboard/settings"
                  }>
                  Dashboard
                </Link>
              </Button>

              <form action={logoutUserAction}>
                <Button
                  type="submit"
                  size="icon"
                  className="hover:bg-red-500 cursor-pointer">
                  <LogOut className="w-5 h-5 text-secondary" />
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </header>
  );
}