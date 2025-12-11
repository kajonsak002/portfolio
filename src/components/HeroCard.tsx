"use client";

import { motion } from "framer-motion";
import { BentoCard } from "./BentoGrid";
import { Profile } from "@/types/portfolio";

interface HeroCardProps {
    profile: Profile;
}

export function HeroCard({ profile }: HeroCardProps) {
    return (
        <BentoCard className="lg:col-span-2 lg:row-span-2 flex flex-col justify-between min-h-[400px] dots-pattern" delay={0}>
            <div>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-5xl lg:text-7xl font-bold tracking-tight mb-4"
                >
                    <span className="gradient-text">{profile.name}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    className="text-2xl lg:text-3xl font-semibold text-white/80 mb-4"
                >
                    {profile.title}
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-lg lg:text-xl text-white/60 max-w-md"
                >
                    {profile.bio}
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex gap-4 mt-8"
            >
                <motion.a
                    href="#projects"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-[#39FF14] text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-shadow cursor-pointer"
                >
                    View Projects
                </motion.a>
                <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 border border-white/20 text-white font-semibold rounded-full hover:border-[#39FF14] hover:text-[#39FF14] transition-colors cursor-pointer"
                >
                    Contact Me
                </motion.a>
            </motion.div>
        </BentoCard>
    );
}
