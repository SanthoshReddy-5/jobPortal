"use client";

import { Button } from "@/components/ui/button";
import { logoutUserAction } from "@/features/auth/authActions";
import { cn, isActiveLink } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { applicantNavItems } from "@/config/constants";

const ApplicantSidebar = () => {
    const pathname = usePathname();
    console.log("pathname:", pathname);

    return (
        <div className="w-64 bg-card border-r border-border fixed bottom-0 top-0">
            <div className="p-6">
                <h2 className="text-lg font-bold">
                    Applicant's Dashboard
                </h2>
            </div>

            <nav className="px-3 space-y-1">
                {applicantNavItems.map((item) => {
                    const Icon = item.icon;
                    const active=isActiveLink(pathname,item.href,item.exact);
                    console.log("pathname: item.href",item.href);

                    return (
                        <Link key={item.name} href={item.href || "#"}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                                active?"text-secondary bg-primary":"text-muted-foreground hover:text-foreground hover:bg-accent"
                            )}>
                            <Icon className="w-4 h-4"/>
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="absolute bottom-6 left-3 right-3">
                <Button
                    onClick={logoutUserAction}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-secondary hover:bg-destructive rounded-lg transition-colors w-full hover:cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    LogOut
                </Button>
            </div>
        </div>
    )
}

export default ApplicantSidebar;