"use client";

import { Button } from "@/components/ui/button";
import { logoutUserAction } from "@/features/auth/authActions";
import { cn } from "@/lib/utils";
import { LayoutDashboard, User, Plus, Briefcase, Bookmark, CreditCard, Building, Settings, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { URLPattern } from "next/server";

const base = "/employer-dashboard";

const navigationItems = [
    { name: "Overview", icon: LayoutDashboard, href: base + "/" },
    { name: "Employers Profile", icon: User },
    { name: "Post a Job", icon: Plus, href: base + "/jobs/create"},
    { name: "My Jobs", icon: Briefcase, href: base + "/jobs" },
    { name: "Saved Candidate", icon: Bookmark },
    { name: "Plans & Billing", icon: CreditCard },
    { name: "All Companies", icon: Building },
    { name: "Settings", icon: Settings, href: base + "/settings" },
];

const EmployerSidebar = () => {
    const pathname = usePathname();

    function isLinkActive({
        href,
        pathname,
        base = "/",
    }: {
        href: string;
        pathname: string;
        base?: string;
    }) {
        const normalizedHref = href.replace(/\/$/, "") || "/";

        // URLPattern is a built-in browser API that lets you define URL matching patterns using a template-like syntax.
        const pattern = new URLPattern({
            pathname: normalizedHref === base ? base : `${normalizedHref}{/*}?`,
        });

        return pattern.test({ pathname });
    }

    return (
        <div className="w-64 bg-card border-r border-border fixed bottom-0 top-0">
            <div className="p-6">
                <h2 className="text-lg font-bold">
                    Employer's Dashboard
                </h2>
            </div>

            <nav className="px-3 space-y-1">
                {navigationItems.map((item) => {
                    const Icon = item.icon;

                    return <Link key={item.name} href={item.href || "#"}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                            isLinkActive({
                                href: item.href || "#",
                                pathname,
                                base: "/employer-dashboard",
                            }) && "text-secondary bg-primary"
                        )}>
                        <Icon />
                        {item.name}
                    </Link>;
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

export default EmployerSidebar;