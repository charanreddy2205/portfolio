import ParticleBackground from "@/components/ParticleBackground";
import DataStreamBackground from "@/components/DataStreamBackground";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import DashboardSection from "@/components/DashboardSection";
import TimelineSection from "@/components/TimelineSection";
import BlogSection from "@/components/BlogSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import AIAssistant from "@/components/AIAssistant";
import FocusMode from "@/components/FocusMode";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <DataStreamBackground />
      <ScrollProgress />
      <FocusMode />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <div className="gradient-divider" />
        <AboutSection />
        <div className="gradient-divider" />
        <SkillsSection />
        <div className="gradient-divider" />
        <ProjectsSection />
        <div className="gradient-divider" />
        <DashboardSection />
        <div className="gradient-divider" />
        <TimelineSection />
        <div className="gradient-divider" />
        <BlogSection />
        <div className="gradient-divider" />
        <AchievementsSection />
        <div className="gradient-divider" />
        <ContactSection />
      </main>
      <AIAssistant />
    </div>
  );
};

export default Index;
