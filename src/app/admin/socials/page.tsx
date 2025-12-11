"use client";

import { useEffect, useState } from "react";
import { Social } from "@/types/portfolio";

export default function SocialsPage() {
    const [socials, setSocials] = useState<Social[]>([]);
    const [newSocial, setNewSocial] = useState({ name: "", url: "", icon: "" });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchSocials();
    }, []);

    async function fetchSocials() {
        try {
            const res = await fetch("/api/socials");
            const data = await res.json();
            setSocials(data);
        } catch (error) {
            console.error("Failed to fetch socials:", error);
        }
    }

    const handleAdd = async () => {
        if (!newSocial.name || !newSocial.url) return;
        setSaving(true);

        try {
            const res = await fetch("/api/socials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newSocial),
            });

            if (res.ok) {
                await fetchSocials();
                setNewSocial({ name: "", url: "", icon: "" });
                setMessage("Social link added!");
            }
        } catch (error) {
            setMessage("Failed to add social");
        }

        setSaving(false);
        setTimeout(() => setMessage(""), 3000);
    };

    const handleUpdate = async (social: Social) => {
        try {
            await fetch("/api/socials", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(social),
            });
            setMessage("Updated!");
            setTimeout(() => setMessage(""), 2000);
        } catch (error) {
            console.error("Failed to update:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this social link?")) return;

        try {
            const res = await fetch(`/api/socials?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                await fetchSocials();
                setMessage("Deleted!");
                setTimeout(() => setMessage(""), 3000);
            }
        } catch (error) {
            console.error("Failed to delete:", error);
        }
    };

    const iconOptions = [
        { value: "github", label: "GitHub" },
        { value: "linkedin", label: "LinkedIn" },
        { value: "twitter", label: "Twitter/X" },
        { value: "dribbble", label: "Dribbble" },
        { value: "instagram", label: "Instagram" },
        { value: "facebook", label: "Facebook" },
        { value: "youtube", label: "YouTube" },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Social Links</h1>
            <p className="text-white/60 mb-8">Manage your social media links</p>

            {message && (
                <div className="mb-4 p-4 rounded-xl bg-[#39FF14]/10 text-[#39FF14]">
                    {message}
                </div>
            )}

            {/* Add New Social */}
            <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Add New Link</h2>
                <div className="flex gap-4 flex-wrap">
                    <select
                        value={newSocial.icon}
                        onChange={(e) => setNewSocial({ ...newSocial, icon: e.target.value, name: e.target.options[e.target.selectedIndex].text })}
                        className="px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white focus:border-[#39FF14] focus:outline-none"
                    >
                        <option value="">Select Platform</option>
                        {iconOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="URL"
                        value={newSocial.url}
                        onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                        className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white focus:border-[#39FF14] focus:outline-none"
                    />
                    <button
                        onClick={handleAdd}
                        disabled={saving}
                        className="px-6 py-3 bg-[#39FF14] text-black font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-shadow disabled:opacity-50"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Socials List */}
            <div className="space-y-4">
                {socials.map((social, index) => (
                    <div
                        key={social.id}
                        className="bg-[#141414] border border-[#262626] rounded-2xl p-6 flex gap-4 items-center"
                    >
                        <div className="w-12 h-12 rounded-xl bg-[#39FF14]/20 flex items-center justify-center text-[#39FF14] font-bold">
                            {social.name[0]}
                        </div>
                        <div className="flex-1">
                            <input
                                type="text"
                                value={social.name}
                                onChange={(e) => {
                                    const updated = [...socials];
                                    updated[index].name = e.target.value;
                                    setSocials(updated);
                                }}
                                onBlur={() => handleUpdate(socials[index])}
                                className="w-full mb-2 px-4 py-2 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white focus:border-[#39FF14] focus:outline-none"
                            />
                            <input
                                type="text"
                                value={social.url}
                                onChange={(e) => {
                                    const updated = [...socials];
                                    updated[index].url = e.target.value;
                                    setSocials(updated);
                                }}
                                onBlur={() => handleUpdate(socials[index])}
                                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white/60 focus:border-[#39FF14] focus:outline-none"
                            />
                        </div>
                        <button
                            onClick={() => handleDelete(social.id)}
                            className="px-4 py-2 text-sm border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/10 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
