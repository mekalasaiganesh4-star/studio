"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { FoodItem } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { IndianRupee, ShieldCheck, Star } from "lucide-react";
import { Countdown } from "./countdown";

type FoodCardProps = {
  item: FoodItem;
};

export function FoodCard({ item }: FoodCardProps) {
  const placeholder = PlaceHolderImages.find((img) => img.id === item.imageId);
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
      <CardHeader className="p-0 relative">
        <Link href={`/food/${item.id}`}>
          <div className="aspect-w-16 aspect-h-9">
            <Image
              src={placeholder?.imageUrl ?? 'https://picsum.photos/seed/default/600/400'}
              alt={placeholder?.description ?? item.name}
              data-ai-hint={placeholder?.imageHint ?? 'food item'}
              width={600}
              height={400}
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        <div className="absolute top-2 right-2 flex gap-2">
            {item.verified && (
                <Badge variant="default" className="bg-primary/80 backdrop-blur-sm text-primary-foreground">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    Verified
                </Badge>
            )}
            <Badge variant="secondary" className={cn(
                item.type === 'Veg' ? 'bg-green-600/80 text-white' : 'bg-red-600/80 text-white',
                'backdrop-blur-sm'
            )}>
                {item.type}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline leading-tight mb-1">
          <Link href={`/food/${item.id}`} className="hover:underline">
            {item.name}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{item.source}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <span className="flex items-center text-2xl font-bold text-primary"><IndianRupee className="w-5 h-5" />{item.discountedPrice}</span>
            <span className="flex items-center line-through text-muted-foreground text-sm"><IndianRupee className="w-3 h-3" />{item.originalPrice}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{item.rating.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start gap-4">
        <div className="w-full">
            <Countdown targetDate={item.expiryTime} />
        </div>
        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href={`/food/${item.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
