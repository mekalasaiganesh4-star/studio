import Link from "next/link";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-xl font-bold font-headline", className)}>
      <div className="bg-primary p-1.5 rounded-md">
        <Leaf className="h-6 w-6 text-primary-foreground" />
      </div>
      <span>WasteLess Feast</span>
    </Link>
  );
}
