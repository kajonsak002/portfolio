import { BentoGrid } from "@/components/BentoGrid";
import { HeroCard } from "@/components/HeroCard";
import { AboutCard } from "@/components/AboutCard";
import { SkillsCard, TechStackCard, ExperienceCard } from "@/components/SkillsCard";
import { ProjectCard, FeaturedProjectsHeader } from "@/components/ProjectCard";
import { SocialCard } from "@/components/SocialCard";
import { ContactCard, EmailCard } from "@/components/ContactCard";
import { getProfile, getSkills, getProjects, getSocials } from "@/lib/data";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const [profile, skillsData, projects, socials] = await Promise.all([
    getProfile(),
    getSkills(),
    getProjects(),
    getSocials(),
  ]);

  return (
    <main className="min-h-screen py-8 lg:py-16">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 lg:px-8 mb-8">
        <nav className="flex items-center justify-between">
          <div className="text-xl font-bold">
            <span className="text-[#39FF14]">.</span>{profile.name.toLowerCase()}
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm text-white/60 hover:text-white transition-colors">About</a>
            <a href="#projects" className="text-sm text-white/60 hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="text-sm text-white/60 hover:text-white transition-colors">Skills</a>
            <a href="#contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact</a>
          </div>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm border border-white/20 rounded-full hover:border-[#39FF14] hover:text-[#39FF14] transition-colors"
          >
            Resume
          </a>
        </nav>
      </header>

      {/* Bento Grid */}
      <BentoGrid>
        {/* Row 1 */}
        <HeroCard profile={profile} />
        <AboutCard profile={profile} />
        <SkillsCard skills={skillsData.skills} />

        {/* Row 2 */}
        <TechStackCard techStack={skillsData.techStack} />
        <ExperienceCard projectCount={projects.length} />

        {/* Projects Section */}
        <FeaturedProjectsHeader />

        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            delay={0.5 + index * 0.05}
          />
        ))}

        {/* Contact CTA */}
        <ContactCard profile={profile} />
      </BentoGrid>

      {/* Connect Section - Below grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8" id="contact">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <SocialCard socials={socials} />
          <EmailCard profile={profile} />
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 lg:px-8 mt-16 pb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© 2025 {profile.name}. All rights reserved.</p>
          <p>Designed & Built with 💚</p>
        </div>
      </footer>
    </main>
  );
}
