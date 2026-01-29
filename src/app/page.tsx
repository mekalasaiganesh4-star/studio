'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Search,
  UtensilsCrossed,
  ChefHat,
  ShoppingBasket,
  Truck,
  Sparkles,
  Heart,
  Beef,
} from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FoodCard } from '@/components/food-card';
import { mockFoodItems } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <FeaturedItemsSection />
        <ForHostsSection />
        <AnimalFeedSection />
        <AISuggestionSection />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/food?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/food');
    }
  };

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] text-primary-foreground">
      <div className="absolute inset-0 bg-black/50 z-10" />
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
          Save Food, Save Money, Save the Planet.
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl">
          Get delicious leftover meals from your favorite local spots at a
          fraction of the price.
        </p>
        <div className="mt-8 w-full max-w-2xl bg-background/90 p-4 rounded-lg shadow-lg text-foreground">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-2"
          >
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for meals, e.g. 'Biryani'"
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Search className="mr-2 h-4 w-4" />
              Find Food
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      icon: <Search className="w-10 h-10 text-primary" />,
      title: 'Browse Meals',
      description:
        'Find delicious surplus food from local hotels, hostels, and kitchens.',
    },
    {
      icon: <ShoppingBasket className="w-10 h-10 text-primary" />,
      title: 'Place Your Order',
      description:
        'Reserve your meal through our simple and secure checkout process.',
    },
    {
      icon: <Truck className="w-10 h-10 text-primary" />,
      title: 'Enjoy Your Feast',
      description: 'Pick up your order or have it delivered right to your door.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            How It Works
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Getting affordable, delicious food is as easy as 1, 2, 3.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="text-center shadow-md hover:shadow-xl transition-shadow"
            >
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                  {step.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl font-headline">
                  {step.title}
                </CardTitle>
                <CardDescription className="mt-2">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedItemsSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Available Now
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Grab these delicious deals before they're gone!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockFoodItems.slice(0, 4).map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/food">View All Food</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ForHostsSection() {
  const hostImage = PlaceHolderImages.find((img) => img.id === 'kitchen-staff');
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Are You a Host?
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Join our mission to reduce food waste. Turn your surplus food
              into revenue and help the community.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start">
                <ChefHat className="w-6 h-6 text-primary mr-3 mt-1 shrink-0" />
                <span>
                  <strong>Sell Surplus:</strong> Easily list your unsold, fresh
                  food items.
                </span>
              </li>
              <li className="flex items-start">
                <UtensilsCrossed className="w-6 h-6 text-primary mr-3 mt-1 shrink-0" />
                <span>
                  <strong>Reduce Waste:</strong> Contribute to a sustainable
                  future and enhance your brand image.
                </span>
              </li>
              <li className="flex items-start">
                <Heart className="w-6 h-6 text-primary mr-3 mt-1 shrink-0" />
                <span>
                  <strong>Support Community:</strong> Provide affordable meals
                  to people in your area.
                </span>
              </li>
            </ul>
            <Button
              size="lg"
              className="mt-8 bg-primary text-primary-foreground"
            >
              Become a Host
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden shadow-2xl">
            {hostImage && (
              <Image
                src={hostImage.imageUrl}
                alt={hostImage.description}
                data-ai-hint={hostImage.imageHint}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimalFeedSection() {
  const animalImage = PlaceHolderImages.find(
    (img) => img.id === 'farm-animals'
  );
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden shadow-2xl md:order-2">
            {animalImage && (
              <Image
                src={animalImage.imageUrl}
                alt={animalImage.description}
                data-ai-hint={animalImage.imageHint}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            )}
          </div>
          <div className="md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Nourishing More Than People
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Food that's no longer for humans can still make a difference. We
              redirect surplus to animal feed.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start">
                <Beef className="w-6 h-6 text-primary mr-3 mt-1 shrink-0" />
                <span>
                  <strong>For Farmers & NGOs:</strong> Access low-cost or free
                  food for animal consumption.
                </span>
              </li>
              <li className="flex items-start">
                <Heart className="w-6 h-6 text-primary mr-3 mt-1 shrink-0" />
                <span>
                  <strong>Complete the Cycle:</strong> Ensure nothing goes to
                  waste, supporting local agriculture and animal welfare.
                </span>
              </li>
            </ul>
            <Button size="lg" variant="outline" className="mt-8" asChild>
              <Link href="/animal-feed">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AISuggestionSection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <Sparkles className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold font-headline">
          Personalized For You
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg">
          Our AI-powered suggestion tool helps you discover new meals based on
          your tastes and past orders. Never miss out on a great deal!
        </p>
        <Button size="lg" variant="secondary" className="mt-8">
          Get Your Suggestions
        </Button>
      </div>
    </section>
  );
}
