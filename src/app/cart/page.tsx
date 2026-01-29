'use client';

import { useCart } from '@/context/cart-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { IndianRupee, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { CartItem } from '@/lib/types';
import { Input } from '@/components/ui/input';

export default function CartPage() {
  const { cart, itemCount, totalPrice, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8" /> Your Cart
          </h1>
          {itemCount > 0 ? (
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              <div className="md:col-span-2">
                <div className="space-y-4">
                  {cart.map((cartItem) => (
                    <CartItemRow 
                      key={cartItem.item.id} 
                      cartItem={cartItem}
                      removeFromCart={removeFromCart}
                      updateQuantity={updateQuantity}
                    />
                  ))}
                </div>
              </div>
              <div className="md:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-2xl font-headline font-semibold">Order Summary</h2>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                      <span className="font-semibold flex items-center"><IndianRupee className="w-4 h-4" />{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span className="font-semibold">FREE</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className='flex items-center'><IndianRupee className="w-5 h-5" />{totalPrice.toFixed(2)}</span>
                    </div>
                    <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
              <h2 className="mt-6 text-2xl font-bold">Your cart is empty</h2>
              <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
              <Button asChild className="mt-6">
                <Link href="/food">Start Shopping</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function CartItemRow({ cartItem, removeFromCart, updateQuantity }: { cartItem: CartItem; removeFromCart: (id: string) => void; updateQuantity: (id: string, q: number) => void; }) {
  const placeholder = PlaceHolderImages.find(p => p.id === cartItem.item.imageId);
  return (
    <Card className="flex items-center p-4">
      <div className="relative w-24 h-24 rounded-md overflow-hidden mr-4">
        <Image 
          src={placeholder?.imageUrl ?? 'https://picsum.photos/seed/default/200/200'}
          alt={cartItem.item.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-grow">
        <Link href={`/food/${cartItem.item.id}`} className="font-semibold hover:underline">{cartItem.item.name}</Link>
        <p className="text-sm text-muted-foreground">{cartItem.item.source}</p>
        <div className="flex items-center mt-2">
          <span className="font-bold text-lg flex items-center"><IndianRupee className="w-4 h-4"/>{cartItem.item.discountedPrice}</span>
          <span className="line-through text-muted-foreground text-sm ml-2 flex items-center"><IndianRupee className="w-3 h-3" />{cartItem.item.originalPrice}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Input 
          type="number"
          min="1"
          value={cartItem.quantity}
          onChange={(e) => updateQuantity(cartItem.item.id, parseInt(e.target.value))}
          className="w-20"
        />
        <Button variant="ghost" size="icon" onClick={() => removeFromCart(cartItem.item.id)} aria-label="Remove item">
          <Trash2 className="h-5 w-5 text-destructive" />
        </Button>
      </div>
    </Card>
  )
}
