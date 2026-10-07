// Contact — server component with real catalog copy inlined directly
// (dedicated h1 hero + contact form + social links + closing CTA).
import { Briefcase, Code2, Mail, MessageCircle, type LucideIcon } from 'lucide-react';
import CTA from "@/components/blocks/CTA";
import ContactForm from "@/components/blocks/ContactForm";
import { Section } from "@/components/blocks/shared";
import { list, pageData, type Detail } from "@/lib/content";
import { socialLinks } from "@/lib/data";
import { pageMetadata } from "@/lib/kit-meta";
import en from "@/messages/en.json";

export const metadata = pageMetadata("contact");

const LAYOUTS = { a: "split", b: "card", c: "simple" } as const;

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  github: Code2,
  linkedin: Briefcase,
  twitter: MessageCircle,
  x: MessageCircle,
};

export default function Page() {
  const copy = en.contact;
  const p = pageData("contact");

  return (
    <main>
      <Section compact>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">{copy.hero.eyebrow}</p>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">{copy.hero.title}</h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">{copy.hero.subtitle}</p>
        </div>
      </Section>
      <ContactForm
        id="contact"
        nameLabel={copy.form.nameLabel}
        emailLabel={copy.form.emailLabel}
        messageLabel={copy.form.messageLabel}
        submitLabel={copy.form.submitLabel}
        successMessage={copy.form.successMessage}
        details={list<Detail>(copy.form.details)}
        variant={LAYOUTS[p.variant]}
      />
      <Section className="bg-muted/40">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{copy.social.title}</h2>
          <p className="text-lg text-muted-foreground">{copy.social.subtitle}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
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
        </div>
      </Section>
      <CTA
        title={copy.cta.title}
        subtitle={copy.cta.subtitle}
        primaryCta={{ label: copy.cta.button, href: "/work" }}
        variant="banner"
      />
    </main>
  );
}
