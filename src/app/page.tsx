import React from "react";
import { HeroHeader } from "@/components/header";
import { Separator } from "@/components/ui/separator";
import HeroSection from "@/components/hero";
import TechSection from "@/components/tech";
import TestimonialSection from "@/components/testimonial";
import ContentSection from "@/components/content";
import FAQSection from "@/components/faq";
import FooterSection from "@/components/footer";

export default function LandingPage() {
  return (
    <>
      <HeroHeader />

      <HeroSection />

      <Separator />

      <TechSection />

      <Separator />

      <TestimonialSection />

      <Separator />

      <ContentSection />

      <Separator />

      <FAQSection />

      <Separator />

      <FooterSection />
    </>
  );
}
