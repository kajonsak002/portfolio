"use client";

import { motion } from "framer-motion";
import { BentoCard } from "./BentoGrid";
import { Profile } from "@/types/portfolio";

interface ContactCardProps {
    profile: Profile;
}

export function ContactCard({ profile }: ContactCardProps) {
    return (
        <BentoCard className="lg:col-span-2 relative overflow-hidden" delay={0.65}>
            {/* Background Glow */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-[#39FF14]/10 blur-3xl" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.75 }}
                        className="text-2xl lg:text-3xl font-bold mb-2"
                    >
                        Let&apos;s work <span className="text-[#39FF14]">together</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-white/50"
                    >
                        Have a project in mind? Let&apos;s create something amazing.
                    </motion.p>
                </div>

                <motion.a
                    href={`mailto:${profile.email}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.85 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-8 py-4 bg-[#39FF14] text-black font-semibold rounded-full hover:shadow-[0_0_40px_rgba(57,255,20,0.5)] transition-shadow whitespace-nowrap"
                >
                    <span>Get in Touch</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </motion.a>
            </div>
        </BentoCard>
    );
}

interface EmailCardProps {
    profile: Profile;
}

export function EmailCard({ profile }: EmailCardProps) {
    return (
        <BentoCard className="lg:col-span-1 flex flex-col justify-center" delay={0.7}>
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#39FF14]/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider">Email</p>
                    <p className="text-white font-medium">{profile.email}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider">Location</p>
                    <p className="text-white font-medium">{profile.location}</p>
                </div>
            </div>
        </BentoCard>
    );
}
