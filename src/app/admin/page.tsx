"use client";

import { useEffect, useState } from "react";
import { Profile, Project, Skill } from "@/types/portfolio";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        projects: 0,
        skills: 0,
        socials: 0,
    });
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                const [profileRes, skillsRes, projectsRes, socialsRes] = await Promise.all([
                    fetch("/api/profile"),
                    fetch("/api/skills"),
                    fetch("/api/projects"),
                    fetch("/api/socials"),
                ]);

                const profileData = await profileRes.json();
                const skillsData = await skillsRes.json();
                const projectsData = await projectsRes.json();
                const socialsData = await socialsRes.json();

                setProfile(profileData);
                setStats({
                    skills: skillsData.skills?.length || 0,
                    projects: projectsData.length || 0,
                    socials: socialsData.length || 0,
                });
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            }
        }

        fetchStats();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-white/60 mb-8">Manage your portfolio content</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6">
                    <div className="text-4xl font-bold text-[#39FF14] mb-2">{stats.projects}</div>
                    <div className="text-white/60">Projects</div>
                </div>
                <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6">
                    <div className="text-4xl font-bold text-[#39FF14] mb-2">{stats.skills}</div>
                    <div className="text-white/60">Skills</div>
                </div>
                <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6">
                    <div className="text-4xl font-bold text-[#39FF14] mb-2">{stats.socials}</div>
                    <div className="text-white/60">Social Links</div>
                </div>
            </div>

            {/* Profile Summary */}
            {profile && (
                <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-4">Profile Summary</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-white/40 text-sm mb-1">Name</div>
                            <div className="font-medium">{profile.name}</div>
                        </div>
                        <div>
                            <div className="text-white/40 text-sm mb-1">Title</div>
                            <div className="font-medium">{profile.title}</div>
                        </div>
                        <div>
                            <div className="text-white/40 text-sm mb-1">Location</div>
                            <div className="font-medium">{profile.location}</div>
                        </div>
                        <div>
                            <div className="text-white/40 text-sm mb-1">Email</div>
                            <div className="font-medium">{profile.email}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
