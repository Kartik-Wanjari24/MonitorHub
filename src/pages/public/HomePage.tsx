import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';
import { Hero } from '../../components/landing/Hero';
import { PortalCards } from '../../components/landing/PortalCards';
import { FeaturesSection } from '../../components/landing/FeaturesSection';
import { PlatformIntro } from '../../components/landing/PlatformIntro';
import { CTASection } from '../../components/landing/CTASection';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PublicLayout className="!pt-0">
      <Hero
        onGetStarted={() => scrollToSection('portals')}
        onExploreServices={() => scrollToSection('services')}
      />
      <PortalCards onNavigateToLogin={(role) => navigate(`/login/${role}`)} />
      <FeaturesSection />
      <PlatformIntro />
      <CTASection
        onSelectPortal={() => navigate('/portal')}
        onOpenDocNotice={() => navigate('/about')}
      />
    </PublicLayout>
  );
};
