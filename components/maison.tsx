import Image from "next/image";
import { cn } from "@/lib/utils";

const productPositions = ["0% center", "25% center", "50% center", "75% center", "100% center"] as const;

export const collectionVisuals = [
  { name: "Ruby Edit", slot: 0 },
  { name: "Pearl Risen", slot: 1 },
  { name: "Eternal Solitaire", slot: 2 },
  { name: "Silver Statement", slot: 3 },
  { name: "Heritage Gold", slot: 4 },
] as const;

export function MaisonProductImage({
  slot = 0,
  className,
  priority = false,
  alt = "Editorial jewelry product photography",
}: {
  slot?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
}) {
  const position = productPositions[Math.abs(slot) % productPositions.length];

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <Image
        src="/brand/jewelry-collection-strip.png"
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, 20vw"
        priority={priority}
        unoptimized
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}

export function MaisonHeroImage({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-stone-200", className)}>
      <Image
        src="/brand/maison-hero.png"
        alt="Ruby pendant and silver rings on stone and pearl fabric"
        fill
        priority
        unoptimized
        sizes="(max-width: 768px) 100vw, 80vw"
        className="object-cover"
      />
    </div>
  );
}
