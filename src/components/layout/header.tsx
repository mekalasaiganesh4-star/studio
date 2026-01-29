"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Leaf, ShoppingCart } from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useCart } from "@/context/cart-context";
import { Badge } from "@/components/ui/badge";

const navLinks = [
  { href: "/food", label: "Browse Food" },
  { href: "#", label: "For Hosts" },
  { href: "/animal-feed", label: "Animal Feed" },
  { href: "#", label: "AI Suggestions" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartButton = (
    <Button asChild variant="ghost" size="icon" className={cn(isScrolled ? "text-foreground" : "text-background hover:bg-white/10 hover:text-white")}>
      <Link href="/cart" className="relative">
        <ShoppingCart className="h-6 w-6" />
        {itemCount > 0 && (
          <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-1 text-xs">{itemCount}</Badge>
        )}
        <span className="sr-only">View Cart</span>
      </Link>
    </Button>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-sm border-b"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isScrolled ? "text-foreground" : "text-background"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          {cartButton}
          <Button variant="ghost" className={cn(isScrolled ? "text-foreground" : "text-background hover:bg-white/10 hover:text-white")}>
            Log in
          </Button>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Sign up</Button>
        </div>
        <div className="md:hidden flex items-center gap-2">
          {cartButton}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(isScrolled ? "text-foreground" : "text-background hover:bg-white/10 hover:text-white")}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Logo />
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-lg font-medium text-foreground hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-2">
                   <Button variant="outline">Log in</Button>
                   <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Sign up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
