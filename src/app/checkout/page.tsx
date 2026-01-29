'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { OrderForm } from '@/components/order-form';
import { useCart } from '@/context/cart-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { IndianRupee } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';


export default function CheckoutPage() {
    const { cart, itemCount, totalPrice, clearCart } = useCart();
    const router = useRouter();
    const { toast } = useToast();

    if (itemCount === 0) {
        return (
            <div className="flex flex-col min-h-dvh bg-background">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
                        <p className="text-muted-foreground mt-2">Add items to your cart to proceed to checkout.</p>
                        <Button asChild className="mt-4">
                            <Link href="/food">Go Shopping</Link>
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
    
    const handleOrderPlaced = () => {
        // This is where you would normally call an API to place the order
        console.log('Order placed for', totalPrice.toFixed(2));
        
        toast({
          title: "Order Placed Successfully!",
          description: "Thank you for your purchase. You can track your order in the orders page.",
        });

        // For now, we'll just clear the cart and redirect.
        clearCart();
        router.push('/orders'); 
    };

    return (
        <div className="flex flex-col min-h-dvh bg-background">
            <Header />
            <main className="flex-1 py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">Checkout</h1>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Shipping Information</CardTitle>
                                    <CardDescription>Enter your delivery details below.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <OrderForm onOrderSubmit={handleOrderPlaced} />
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                           <Card className="sticky top-24">
                               <CardHeader>
                                   <CardTitle>Your Order</CardTitle>
                               </CardHeader>
                               <CardContent>
                                   <div className="space-y-4">
                                       {cart.map(cartItem => {
                                           const placeholder = PlaceHolderImages.find(p => p.id === cartItem.item.imageId);
                                           return (
                                               <div key={cartItem.item.id} className="flex items-center gap-4">
                                                   <div className="relative w-16 h-16 rounded-md overflow-hidden">
                                                        <Image
                                                            src={placeholder?.imageUrl ?? 'https://picsum.photos/seed/default/100/100'}
                                                            alt={cartItem.item.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center">
                                                            {cartItem.quantity}
                                                        </div>
                                                   </div>
                                                   <div className="flex-grow">
                                                       <p className="font-semibold">{cartItem.item.name}</p>
                                                   </div>
                                                   <div className="font-semibold flex items-center">
                                                        <IndianRupee className="w-4 h-4" />{(cartItem.item.discountedPrice * cartItem.quantity).toFixed(2)}
                                                   </div>
                                               </div>
                                           )
                                       })}
                                   </div>
                                   <Separator className="my-4" />
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="font-semibold flex items-center"><IndianRupee className="w-4 h-4" />{totalPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Delivery</span>
                                            <span className="font-semibold">FREE</span>
                                        </div>
                                        <Separator className="my-2"/>
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span className="flex items-center"><IndianRupee className="w-5 h-5" />{totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                               </CardContent>
                           </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
