import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collectionVisuals, MaisonProductImage } from "@/components/maison";

const revenue = ["Rp 286,5jt", "Rp 214,8jt", "Rp 198,2jt", "Rp 174,4jt", "Rp 152,4jt"];
const counts = ["24 designs", "18 designs", "32 designs", "21 designs", "16 designs"];

export function FeaturedCollections() {
  return (
    <section className="rounded-lg border bg-card p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="maison-kicker">Featured collections</p>
          <h2 className="font-serif text-2xl font-semibold text-foreground">Maison edits in market</h2>
        </div>
        <Link href="/collections" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary">
          View all collections
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {collectionVisuals.map((item, index) => (
          <Link
            href="/collections"
            key={item.name}
            className="group overflow-hidden rounded-md border bg-background transition-colors hover:border-primary/40"
          >
            <MaisonProductImage
              alt={`${item.name} jewelry collection`}
              className="aspect-[4/3] transition-transform duration-300 group-hover:scale-[1.015]"
              priority={index < 2}
              slot={item.slot}
            />
            <div className="space-y-1 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground">{item.name}</p>
              <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>{counts[index]}</span>
                <span className="font-semibold tabular-nums text-foreground">{revenue[index]}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
