"use client";

import { motion } from "framer-motion";
import { BentoCard } from "./BentoGrid";
import { Project } from "@/types/portfolio";

interface ProjectCardProps {
    project: Project;
    delay?: number;
}

export function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
    const CardContent = (
        <>
            {/* Project Preview */}
            <div className="relative w-full h-32 lg:h-40 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] mb-4 overflow-hidden border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0.5 }}
                        whileHover={{ opacity: 1, scale: 1.1 }}
                        className="w-16 h-16 rounded-2xl bg-[#39FF14]/20 flex items-center justify-center"
                    >
                        <svg className="w-8 h-8 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </motion.div>
                </div>
            </div>

            {/* Project Info */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#39FF14] transition-colors">{project.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/60">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <motion.div
                    className="project-arrow transition-all duration-300"
                >
                    <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                </motion.div>
            </div>
        </>
    );

    if (project.link) {
        return (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={project.featured ? "lg:col-span-2" : ""}>
                <BentoCard
                    className="project-card group cursor-pointer h-full"
                    delay={delay}
                >
                    {CardContent}
                </BentoCard>
            </a>
        );
    }

    return (
        <BentoCard
            className={`project-card group cursor-pointer ${project.featured ? "lg:col-span-2" : ""}`}
            delay={delay}
        >
            {CardContent}
        </BentoCard>
    );
}

export function FeaturedProjectsHeader() {
    return (
        <div className="lg:col-span-4 py-4" id="projects">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl lg:text-4xl font-bold"
            >
                Featured <span className="text-[#39FF14]">Projects</span>
            </motion.h2>
        </div>
    );
}
