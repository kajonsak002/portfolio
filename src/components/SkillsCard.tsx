"use client";

import { motion } from "framer-motion";
import { BentoCard } from "./BentoGrid";
import { Skill, TechCategory } from "@/types/portfolio";

interface SkillsCardProps {
    skills: Skill[];
}

export function SkillsCard({ skills }: SkillsCardProps) {
    return (
        <BentoCard className="lg:col-span-1" delay={0.2}>
            <h2 className="text-2xl font-bold mb-6">Skills</h2>

            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <motion.span
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                        className="skill-pill flex items-center gap-2 cursor-default"
                    >
                        <span>{skill.icon}</span>
                        <span>{skill.name}</span>
                    </motion.span>
                ))}
            </div>
        </BentoCard>
    );
}

interface TechStackCardProps {
    techStack: TechCategory[];
}

export function TechStackCard({ techStack }: TechStackCardProps) {
    return (
        <BentoCard className="lg:col-span-1" delay={0.25}>
            <h2 className="text-xl font-bold mb-4">Tech Stack</h2>

            <div className="space-y-4">
                {techStack.map((tech, index) => (
                    <motion.div
                        key={tech.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + index * 0.1 }}
                    >
                        <span className="text-xs text-[#39FF14] uppercase tracking-wider">{tech.name}</span>
                        <p className="text-white/80 text-sm mt-1">{tech.items.join(" • ")}</p>
                    </motion.div>
                ))}
            </div>
        </BentoCard>
    );
}

interface ExperienceCardProps {
    projectCount: number;
}

export function ExperienceCard({ projectCount }: ExperienceCardProps) {
    return (
        <BentoCard className="lg:col-span-1 flex flex-col items-center justify-center text-center" delay={0.3}>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
                className="text-6xl font-bold gradient-text mb-2"
            >
                21
            </motion.div>
            <p className="text-white/60 text-sm">Years Young Developer</p>

            <div className="mt-4 grid grid-cols-2 gap-4 w-full">
                <div className="text-center">
                    <div className="text-2xl font-bold text-[#39FF14]">{projectCount}+</div>
                    <div className="text-xs text-white/40">Projects</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-[#39FF14]">🚀</div>
                    <div className="text-xs text-white/40">Always Learning</div>
                </div>
            </div>
        </BentoCard>
    );
}
