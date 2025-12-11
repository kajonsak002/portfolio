"use client";

import { useEffect, useState } from "react";
import { Skill, TechCategory } from "@/types/portfolio";

export default function SkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [techStack, setTechStack] = useState<TechCategory[]>([]);
    const [newSkill, setNewSkill] = useState({ name: "", icon: "" });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchSkills();
    }, []);

    async function fetchSkills() {
        try {
            const res = await fetch("/api/skills");
            const data = await res.json();
            setSkills(data.skills || []);
            setTechStack(data.techStack || []);
        } catch (error) {
            console.error("Failed to fetch skills:", error);
        }
    }

    const handleAddSkill = () => {
        if (!newSkill.name || !newSkill.icon) return;

        const skill: Skill = {
            id: Date.now().toString(),
            name: newSkill.name,
            icon: newSkill.icon,
        };

        setSkills([...skills, skill]);
        setNewSkill({ name: "", icon: "" });
    };

    const handleDeleteSkill = (id: string) => {
        setSkills(skills.filter((s) => s.id !== id));
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage("");

        try {
            const res = await fetch("/api/skills", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ skills, techStack }),
            });

            if (res.ok) {
                setMessage("Skills saved successfully!");
            } else {
                setMessage("Failed to save skills");
            }
        } catch (error) {
            setMessage("Error saving skills");
        }

        setSaving(false);
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Skills</h1>
            <p className="text-white/60 mb-8">Manage your skills and tech stack</p>

            {/* Add New Skill */}
            <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Add New Skill</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Icon (emoji)"
                        value={newSkill.icon}
                        onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
                        className="w-24 px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white focus:border-[#39FF14] focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Skill name"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white focus:border-[#39FF14] focus:outline-none"
                    />
                    <button
                        onClick={handleAddSkill}
                        className="px-6 py-3 bg-[#39FF14] text-black font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-shadow"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Skills List */}
            <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Skills List</h2>
                <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                        <div
                            key={skill.id}
                            className="flex items-center gap-2 px-4 py-2 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-full text-[#39FF14]"
                        >
                            <span>{skill.icon}</span>
                            <span>{skill.name}</span>
                            <button
                                onClick={() => handleDeleteSkill(skill.id)}
                                className="ml-2 text-white/40 hover:text-red-400"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Tech Stack</h2>
                <div className="space-y-4">
                    {techStack.map((tech, index) => (
                        <div key={tech.id} className="flex gap-4 items-center">
                            <input
                                type="text"
                                value={tech.name}
                                onChange={(e) => {
                                    const updated = [...techStack];
                                    updated[index].name = e.target.value;
                                    setTechStack(updated);
                                }}
                                className="w-32 px-4 py-2 bg-[#0a0a0a] border border-[#262626] rounded-xl text-[#39FF14] focus:border-[#39FF14] focus:outline-none"
                            />
                            <input
                                type="text"
                                value={tech.items.join(", ")}
                                onChange={(e) => {
                                    const updated = [...techStack];
                                    updated[index].items = e.target.value.split(", ");
                                    setTechStack(updated);
                                }}
                                className="flex-1 px-4 py-2 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white focus:border-[#39FF14] focus:outline-none"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-4">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-3 bg-[#39FF14] text-black font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-shadow disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save All Changes"}
                </button>
                {message && (
                    <span className={message.includes("success") ? "text-[#39FF14]" : "text-red-400"}>
                        {message}
                    </span>
                )}
            </div>
        </div>
    );
}
