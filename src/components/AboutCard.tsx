"use client";

import { motion } from "framer-motion";
import { BentoCard } from "./BentoGrid";
import { Profile } from "@/types/portfolio";

interface AboutCardProps {
    profile: Profile;
}

export function AboutCard({ profile }: AboutCardProps) {
    return (
        <BentoCard className="lg:col-span-1 flex flex-col justify-between" delay={0.1}>
            <div>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#39FF14] to-[#0a0a0a] mb-6 flex items-center justify-center overflow-hidden"
                >
                    <div className="w-16 h-16 rounded-xl bg-[#1a1a1a] flex items-center justify-center">
                        <span className="text-3xl">👨‍💻</span>
                    </div>
                </motion.div>

                <h2 className="text-2xl font-bold mb-3">About Me</h2>
                <p className="text-white/60 text-sm leading-relaxed">
                    {profile.bio}
                </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-[#39FF14]">
                <span className="text-sm font-medium">📍 {profile.location}</span>
            </div>
        </BentoCard>
    );
}
