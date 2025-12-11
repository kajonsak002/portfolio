"use client";

import { useEffect, useState } from "react";
import { Profile } from "@/types/portfolio";

export default function ProfilePage() {
    const [profile, setProfile] = useState<Profile>({
        name: "",
        title: "",
        bio: "",
        location: "",
        email: "",
        resumeUrl: "/Resume.pdf",
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch("/api/profile");
                const data = await res.json();
                setProfile(data);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        }
        fetchProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage("");

        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profile),
            });

            if (res.ok) {
                setMessage("Profile saved successfully!");
            } else {
                setMessage("Failed to save profile");
            }
        } catch (error) {
            setMessage("Error saving profile");
        }

        setSaving(false);
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Profile</h1>
            <p className="text-white/60 mb-8">Edit your profile information</p>

            <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Name</label>
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white focus:border-[#39FF14] focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Title</label>
                        <input
                            type="text"
                            value={profile.title}
                            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white focus:border-[#39FF14] focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Bio</label>
                        <textarea
                            value={profile.bio}
                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white focus:border-[#39FF14] focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Location</label>
                        <input
                            type="text"
                            value={profile.location}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white focus:border-[#39FF14] focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
                        <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white focus:border-[#39FF14] focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Resume URL */}
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Resume URL</label>
                        <input
                            type="text"
                            value={profile.resumeUrl}
                            onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white focus:border-[#39FF14] focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-3 bg-[#39FF14] text-black font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-shadow disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                        {message && (
                            <span className={message.includes("success") ? "text-[#39FF14]" : "text-red-400"}>
                                {message}
                            </span>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
