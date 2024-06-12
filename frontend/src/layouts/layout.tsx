import { Footer } from "@/components/lib/Footer";
import { Header } from "@/components/lib/Header";
import { Hero } from "@/components/lib/Hero";
import React from "react";

type Props = {
  children: React.ReactNode;
  showHeroSection?: boolean;
};

export const Layout = ({ children, showHeroSection = true }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showHeroSection && <Hero />}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
};
