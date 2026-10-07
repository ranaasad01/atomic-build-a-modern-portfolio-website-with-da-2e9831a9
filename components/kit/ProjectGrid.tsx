// FIXED FILE (starter kit) — do not edit. Portfolio project grid (copy via props).
import type { BlockImage } from "@/components/blocks/shared";
import { BlockImg } from "@/components/blocks/shared";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ProjectCard = { title: string; category: string; description: string; image?: BlockImage };

const LAYOUTS = {
  a: { grid: "sm:grid-cols-2 lg:grid-cols-3", image: "aspect-[4/3]", overlay: false },
  b: { grid: "md:grid-cols-2", image: "aspect-[16/10]", overlay: true },
  c: { grid: "sm:grid-cols-2", image: "aspect-square", overlay: false },
} as const;

export default function ProjectGrid({ projects, variant }: { projects: ProjectCard[]; variant: keyof typeof LAYOUTS }) {
  const l = LAYOUTS[variant];
  return (
    <div className={cn("grid gap-6", l.grid)}>
      {projects.map((proj, i) => (
        <article key={i} className="group relative overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
          <div className={cn("overflow-hidden bg-muted", l.image)}>
            {proj.image && (
              <BlockImg image={proj.image} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
            )}
          </div>
          <div className={cn("p-5", l.overlay && "absolute inset-x-0 bottom-0 bg-background/90 backdrop-blur")}>
            <Badge variant="secondary">{proj.category}</Badge>
            <h3 className="mt-3 font-display text-lg font-semibold">{proj.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{proj.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
