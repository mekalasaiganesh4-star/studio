import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/70 border-t border-border/50">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-muted-foreground max-w-sm">
              Connecting communities to reduce food waste and provide affordable meals.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" passHref>
                <Button variant="ghost" size="icon" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" passHref>
                <Button variant="ghost" size="icon" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" passHref>
                <Button variant="ghost" size="icon" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/food" className="text-muted-foreground hover:text-primary">Browse Food</Link></li>
              <li><Link href="/orders" className="text-muted-foreground hover:text-primary">My Orders</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">For Hosts</Link></li>
              <li><Link href="/animal-feed" className="text-muted-foreground hover:text-primary">Animal Feed</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Company</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-foreground">Stay Updated</h4>
            <p className="mt-4 text-muted-foreground">Subscribe to our newsletter for the latest deals.</p>
            <form className="mt-4 flex gap-2">
              <Input type="email" placeholder="Your email" className="flex-grow" />
              <Button type="submit" size="icon" aria-label="Subscribe">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="m22 2-11 11"></path></svg>
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p suppressHydrationWarning>&copy; {new Date().getFullYear()} WasteLess Feast. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
