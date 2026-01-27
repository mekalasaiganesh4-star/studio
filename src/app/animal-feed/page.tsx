'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FoodCard } from '@/components/food-card';
import { mockFoodItems } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Search, Beef } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function AnimalFeedPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const animalFeedItems = useMemo(() => {
    const items = mockFoodItems.filter(
      (item) => item.condition === 'Only for Animal Feed'
    );
    if (!searchTerm) return items;
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline flex items-center justify-center gap-4">
              <Beef className="w-12 h-12" /> Animal Feed Supplies
            </h1>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              Surplus food that's perfect for animal consumption. Help reduce waste by providing feed for local farms and animals.
            </p>
          </div>

          <div className="mb-12 max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for animal feed..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
          </div>

          <Separator className="mb-12" />

          {animalFeedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {animalFeedItems.map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold">No Animal Feed Available</h2>
              <p className="text-muted-foreground mt-2">
                There are currently no items listed for animal feed.
                {searchTerm && ` We couldn't find anything matching "${searchTerm}".`}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
