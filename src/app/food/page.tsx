'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FoodCard } from '@/components/food-card';
import { mockFoodItems } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

function FoodSearchPage() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const filteredFoodItems = useMemo(() => {
    if (!searchTerm) return mockFoodItems;
    return mockFoodItems.filter((item) =>
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
            <h1 className="text-4xl md:text-5xl font-bold font-headline">
              Discover Delicious Deals
            </h1>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              Browse our full selection of surplus food from local partners. Find
              your next favorite meal and help reduce food waste.
            </p>
          </div>

          <div className="mb-12 max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for food items..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
          </div>

          <Separator className="mb-12" />

          {filteredFoodItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFoodItems.map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold">No Results Found</h2>
              <p className="text-muted-foreground mt-2">
                We couldn't find any food matching "{searchTerm}".
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function FoodPage() {
  return (
    <Suspense>
      <FoodSearchPage />
    </Suspense>
  );
}
