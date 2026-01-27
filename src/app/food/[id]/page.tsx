import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockFoodItems } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import { Clock, CookingPot, IndianRupee, MapPin, ShieldCheck, ShoppingCart, Star, Tag } from 'lucide-react';
import { Countdown } from '@/components/countdown';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function FoodDetailPage({ params }: { params: { id: string } }) {
  const item = mockFoodItems.find((i) => i.id === params.id);

  if (!item) {
    notFound();
  }

  const placeholder = PlaceHolderImages.find((img) => img.id === item.imageId);

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <div className="aspect-w-16 aspect-h-9 relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src={placeholder?.imageUrl ?? 'https://picsum.photos/seed/default/600/400'}
                alt={placeholder?.description ?? item.name}
                data-ai-hint={placeholder?.imageHint ?? 'food item'}
                fill
                className="object-cover"
              />
               {item.verified && (
                <Badge variant="default" className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm text-primary-foreground">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    Verified
                </Badge>
            )}
            </div>

            <div>
              <Badge variant="secondary" className={item.type === 'Veg' ? 'bg-green-600/80 text-white' : 'bg-red-600/80 text-white'}>
                {item.type}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold font-headline mt-2">{item.name}</h1>
              <p className="text-lg text-muted-foreground mt-1 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> {item.source}
              </p>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-bold text-lg text-foreground">{item.rating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">/ 5.0</span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="text-sm text-muted-foreground">
                    Quantity: <strong>{item.quantity} available</strong>
                </div>
              </div>

              <Card className="mt-6 bg-secondary/30">
                <CardContent className="p-6">
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-primary flex items-center"><IndianRupee className="w-7 h-7" />{item.discountedPrice}</span>
                        <span className="text-xl line-through text-muted-foreground flex items-center"><IndianRupee className="w-4 h-4" />{item.originalPrice}</span>
                    </div>
                     <p className="text-green-600 font-semibold mt-1">
                        You save {Math.round(100 - (item.discountedPrice / item.originalPrice) * 100)}%
                    </p>

                    <div className="mt-4 text-sm">
                        <Countdown targetDate={item.expiryTime} />
                        <p className="text-xs text-muted-foreground mt-1">Time left to grab this deal!</p>
                    </div>

                    <Button size="lg" className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
                        <ShoppingCart className="mr-2" /> Place Order
                    </Button>
                </CardContent>
              </Card>

              <div className="mt-8 space-y-4 text-sm text-foreground">
                  <h3 className="text-lg font-semibold font-headline border-b pb-2">Item Details</h3>
                   <div className="flex items-center gap-3">
                        <Tag className="w-5 h-5 text-primary" />
                        <span>Condition: <strong>{item.condition}</strong></span>
                   </div>
                   <div className="flex items-center gap-3">
                        <CookingPot className="w-5 h-5 text-primary" />
                        <span suppressHydrationWarning>Prepared: <strong>{new Date(item.preparedTime).toLocaleString()}</strong></span>
                   </div>
                   <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-primary" />
                        <span suppressHydrationWarning>Expires: <strong>{new Date(item.expiryTime).toLocaleString()}</strong></span>
                   </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
