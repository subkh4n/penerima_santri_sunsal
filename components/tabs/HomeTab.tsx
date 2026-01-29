import React from "react";
import Hero from "../Hero";
import QuickActions from "../QuickActions";
import InfoSection from "../InfoSection";
import StatsSection from "../StatsSection";
import Footer from "../Footer";

const HomeTab: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <Hero />
      <QuickActions />
      <InfoSection />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default HomeTab;
