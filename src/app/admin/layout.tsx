"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

const menuItems = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "Profile", href: "/admin/profile", icon: "👤" },
    { name: "Skills", href: "/admin/skills", icon: "🛠️" },
    { name: "Projects", href: "/admin/projects", icon: "💼" },
    { name: "Socials", href: "/admin/socials", icon: "🔗" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/auth", { method: "DELETE" });
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#141414] border-r border-[#262626] p-6 flex flex-col">
                <div className="mb-8">
                    <Link href="/" className="text-xl font-bold">
                        <span className="text-[#39FF14]">.</span>admin
                    </Link>
                </div>

                <nav className="space-y-2 flex-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? "bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30"
                                        : "text-white/60 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="pt-4 border-t border-[#262626] space-y-2">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <span>🌐</span>
                        <span>View Site</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                        <span>🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
