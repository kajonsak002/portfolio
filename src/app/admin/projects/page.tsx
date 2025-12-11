"use client";

import { useEffect, useState } from "react";
import { Project } from "@/types/portfolio";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    const emptyProject: Project = {
        id: "",
        title: "",
        description: "",
        tags: [],
        link: "",
        featured: false,
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    async function fetchProjects() {
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        }
    }

    const handleSave = async () => {
        if (!editingProject) return;
        setSaving(true);
        setMessage("");

        try {
            const method = editingProject.id ? "PUT" : "POST";
            const res = await fetch("/api/projects", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingProject),
            });

            if (res.ok) {
                setMessage("Project saved!");
                await fetchProjects();
                setShowForm(false);
                setEditingProject(null);
            } else {
                setMessage("Failed to save project");
            }
        } catch (error) {
            setMessage("Error saving project");
        }

        setSaving(false);
        setTimeout(() => setMessage(""), 3000);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                await fetchProjects();
                setMessage("Project deleted!");
                setTimeout(() => setMessage(""), 3000);
            }
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Projects</h1>
                    <p className="text-white/60">Manage your portfolio projects</p>
                </div>
                <button
                    onClick={() => {
                        setEditingProject({ ...emptyProject });
                        setShowForm(true);
                    }}
                    className="px-6 py-3 bg-[#39FF14] text-black font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-shadow"
                >
                    + Add Project
                </button>
            </div>

            {message && (
                <div className={`mb-4 p-4 rounded-xl ${message.includes("success") || message.includes("saved") || message.includes("deleted") ? "bg-[#39FF14]/10 text-[#39FF14]" : "bg-red-500/10 text-red-400"}`}>
                    {message}
                </div>
            )}

            {/* Edit/Add Form */}
            {showForm && editingProject && (
                <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">
                        {editingProject.id ? "Edit Project" : "Add New Project"}
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Title</label>
                            <input
                                type="text"
                                value={editingProject.title}
                                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white focus:border-[#39FF14] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Description</label>
                            <textarea
                                value={editingProject.description}
                                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white focus:border-[#39FF14] focus:outline-none resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Tags (comma separated)</label>
                            <input
                                type="text"
                                value={editingProject.tags.join(", ")}
                                onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value.split(", ") })}
                                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white focus:border-[#39FF14] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Link</label>
                            <input
                                type="text"
                                value={editingProject.link}
                                onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })}
                                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white focus:border-[#39FF14] focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="featured"
                                checked={editingProject.featured}
                                onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                                className="w-5 h-5 accent-[#39FF14]"
                            />
                            <label htmlFor="featured" className="text-white/60">Featured Project</label>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-6 py-3 bg-[#39FF14] text-black font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-shadow disabled:opacity-50"
                            >
                                {saving ? "Saving..." : "Save"}
                            </button>
                            <button
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingProject(null);
                                }}
                                className="px-6 py-3 border border-white/20 text-white rounded-xl hover:border-white/40 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Projects List */}
            <div className="space-y-4">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-[#141414] border border-[#262626] rounded-2xl p-6 flex justify-between items-start"
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-bold">{project.title}</h3>
                                {project.featured && (
                                    <span className="px-2 py-1 text-xs bg-[#39FF14]/20 text-[#39FF14] rounded-full">
                                        Featured
                                    </span>
                                )}
                            </div>
                            <p className="text-white/50 mb-3">{project.description}</p>
                            <div className="flex gap-2">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 text-xs bg-white/5 text-white/60 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setEditingProject(project);
                                    setShowForm(true);
                                }}
                                className="px-4 py-2 text-sm border border-white/20 rounded-xl hover:border-[#39FF14] hover:text-[#39FF14] transition-colors"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(project.id)}
                                className="px-4 py-2 text-sm border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/10 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
