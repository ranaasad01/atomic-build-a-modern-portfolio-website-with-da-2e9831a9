// About — server component with real catalog copy inlined directly
// (hero h1 + bio story + principles grid + stats + resume/social links + CTA).
import { Briefcase, Code2, Mail, MessageCircle, type LucideIcon } from 'lucide-react';
import CTA from "@/components/blocks/CTA";
import FeatureGrid from "@/components/blocks/FeatureGrid";
import Hero from "@/components/blocks/Hero";
import { CtaButton, Section } from "@/components/blocks/shared";
import StatsBand, { type StatItem } from "@/components/blocks/StatsBand";
import { list, pageData, type Feature } from "@/lib/content";
import { primaryCta, socialLinks } from "@/lib/data";
import { pageMetadata } from "@/lib/kit-meta";
import en from "@/messages/en.json";

export const metadata = pageMetadata("about");

const LAYOUTS = {
  a: { hero: "mesh", values: "glass", stats: "plain", cta: "gradient" },
  b: { hero: "background", values: "minimal", stats: "primary", cta: "card" },
  c: { hero: "centered", values: "list", stats: "glass", cta: "split" },
} as const;

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  github: Code2,
  linkedin: Briefcase,
  twitter: MessageCircle,
  x: MessageCircle,
};

export default function Page() {
  const copy = en.about;
  const p = pageData("about");
  const l = LAYOUTS[p.variant];
  const heroImage = p.image("hero", copy.hero.title);
  const paragraphs = list<string>(copy.story.paragraphs);

  return (
    <main>
      <Hero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        subtitle={copy.hero.subtitle}
        image={heroImage}
        variant={l.hero}
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{copy.story.title}</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            {paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </div>
      </Section>
      <FeatureGrid
        eyebrow={copy.values.eyebrow}
        title={copy.values.title}
        subtitle={copy.values.subtitle}
        items={list<Feature>(copy.values.items)}
        variant={l.values}
      />
      <StatsBand items={list<StatItem>(copy.stats)} variant={l.stats} />
      <Section className="bg-muted/40">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{copy.connect.title}</h2>
          <p className="text-lg text-muted-foreground">{copy.connect.subtitle}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <CtaButton cta={{ label: copy.connect.resumeCta, href: "/contact" }} />
            {socialLinks.map((s) => {
              const Icon = SOCIAL_ICONS[s.platform.toLowerCase()] ?? Mail;
              return (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  className="rounded-md border border-border p-3 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground">{copy.connect.resumeHint}</p>
        </div>
      </Section>
      <CTA
        title={copy.cta.title}
        subtitle={copy.cta.subtitle}
        primaryCta={{ label: copy.cta.button, href: primaryCta.href }}
        image={heroImage}
        variant={l.cta}
      />
    </main>
  );
}
