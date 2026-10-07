"use client";

// KIT PAGE (portfolio) — FIXED FILE, do not edit. Copy: messages/<locale>.json "work.*";
// layout variant + images: content/pages.json "work".
import { useTranslations } from "next-intl";
import CTA from "@/components/blocks/CTA";
import { Section, SectionHeader } from "@/components/blocks/shared";
import ProjectGrid from "@/components/kit/ProjectGrid";
import { list, pageData, type Project } from "@/lib/content";
import { primaryCta } from "@/lib/data";

export default function WorkPage() {
  const t = useTranslations("work");
  const p = pageData("work");
  const projects = list<Project>(t.raw("projects")).map((proj, i) => ({
    ...proj,
    image: p.image(`projects.${i}`, proj.title),
  }));
  return (
    <main>
      <Section>
        <SectionHeader eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")} />
        <ProjectGrid projects={projects} variant={p.variant} />
      </Section>
      <CTA
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
        primaryCta={{ label: t("cta.button"), href: primaryCta.href }}
        variant={p.variant === "b" ? "card" : "banner"}
      />
    </main>
  );
}
