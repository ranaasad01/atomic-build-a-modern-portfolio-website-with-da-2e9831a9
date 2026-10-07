"use client";

// KIT PAGE (portfolio) — FIXED FILE, do not edit. Copy: messages/<locale>.json "home.*"
// (projects: "work.projects"); layout variant + images: content/pages.json "home" / "work".
import { useTranslations } from "next-intl";
import CTA from "@/components/blocks/CTA";
import FeatureGrid from "@/components/blocks/FeatureGrid";
import Hero from "@/components/blocks/Hero";
import { CtaButton, Section, SectionHeader } from "@/components/blocks/shared";
import Testimonials, { type TestimonialItem } from "@/components/blocks/Testimonials";
import ProjectGrid from "@/components/kit/ProjectGrid";
import { list, pageData, type Feature, type Project } from "@/lib/content";
import { primaryCta } from "@/lib/data";

const LAYOUTS = {
  a: { hero: "mesh", services: "minimal", testimonials: "single", cta: "gradient" },
  b: { hero: "centered", services: "glass", testimonials: "glass", cta: "card" },
  c: { hero: "background", services: "list", testimonials: "masonry", cta: "split" },
} as const;

export default function HomePage() {
  const t = useTranslations("home");
  const tWork = useTranslations("work");
  const p = pageData("home");
  const work = pageData("work");
  const l = LAYOUTS[p.variant];
  const heroImage = p.image("hero", t("hero.title"));
  const projects = list<Project>(tWork.raw("projects"))
    .slice(0, 3)
    .map((proj, i) => ({ ...proj, image: work.image(`projects.${i}`, proj.title) }));
  return (
    <main>
      <Hero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        primaryCta={{ label: t("hero.cta"), href: "/work" }}
        secondaryCta={{ label: t("hero.secondaryCta"), href: "/contact" }}
        image={heroImage}
        variant={l.hero}
      />
      <Section>
        <SectionHeader eyebrow={t("featured.eyebrow")} title={t("featured.title")} subtitle={t("featured.subtitle")} />
        <ProjectGrid projects={projects} variant={work.variant} />
        <div className="mt-10 text-center">
          <CtaButton cta={{ label: t("featured.cta"), href: "/work" }} variant="outline" />
        </div>
      </Section>
      <FeatureGrid
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        subtitle={t("services.subtitle")}
        items={list<Feature>(t.raw("services.items"))}
        variant={l.services}
      />
      <Testimonials
        eyebrow={t("testimonials.eyebrow")}
        title={t("testimonials.title")}
        subtitle={t("testimonials.subtitle")}
        items={list<TestimonialItem>(t.raw("testimonials.items"))}
        variant={l.testimonials}
      />
      <CTA
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
        primaryCta={{ label: t("cta.button"), href: primaryCta.href }}
        image={heroImage}
        variant={l.cta}
      />
    </main>
  );
}
