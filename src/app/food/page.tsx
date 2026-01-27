import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FoodCard } from '@/components/food-card';
import { mockFoodItems } from '@/lib/data';
import { Separator } from '@/components/ui/separator';

export default function FoodPage() {
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
              Browse our full selection of surplus food from local partners. Find your next favorite meal and help reduce food waste.
            </p>
          </div>
          <Separator className="mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockFoodItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
