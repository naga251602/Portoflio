import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ResearchSection from "@/components/ResearchSection";
import SkillsSection from "@/components/SkillsSection";
import OthersSection from "@/components/OthersSection";
import ContactSection from "@/components/ContactSection";
import Drawer from "@/components/Drawer";
import { AboutModal, ProjectsModal, PublicationsModal, OthersModal } from "@/components/Modals";
import ScrollAnimationProvider from "@/components/ScrollAnimationProvider";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollAnimationProvider />
      <Header />
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 pt-32 pb-16 space-y-24">
        <HeroSection />
        <FeaturedSection />
        <ExperienceSection />
        <ProjectsSection />
        <ResearchSection />
        <SkillsSection />
        <OthersSection />
        <ContactSection />
      </main>
      <Drawer />
      <AboutModal />
      <ProjectsModal />
      <PublicationsModal />
      <OthersModal />
    </>
  );
}
