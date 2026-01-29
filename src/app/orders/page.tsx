'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package } from 'lucide-react';

// This is mock data. In a real app, you'd fetch this from a database.
const mockOrders = [
    {
        id: 'ORDER-12345',
        date: 'July 20, 2024',
        status: 'Delivered',
        total: 135.00,
        items: ['Veg Biryani', 'Parotta (2 pcs) with Kurma']
    },
    {
        id: 'ORDER-67890',
        date: 'July 21, 2024',
        status: 'Out for Delivery',
        total: 90.00,
        items: ['Gobi Fried Rice']
    }
]


export default function OrdersPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background">
            <Header />
            <main className="flex-1 py-12 md:py-20">
                <div className="container mx-auto px-4">
                     <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">Your Orders</h1>
                     {mockOrders.length > 0 ? (
                        <div className="space-y-6">
                            {mockOrders.map(order => (
                                <Card key={order.id}>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle>{order.id}</CardTitle>
                                            <CardDescription>Ordered on {order.date}</CardDescription>
                                        </div>
                                        <Button asChild>
                                            <Link href={`/orders/${order.id}`}>Track Order</Link>
                                        </Button>
                                    </CardHeader>
                                    <CardContent>
                                        <p><strong>Status:</strong> <span className="text-primary font-semibold">{order.status}</span></p>
                                        <p><strong>Items:</strong> {order.items.join(', ')}</p>
                                        <p><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                     ) : (
                        <div className="text-center py-16 border-2 border-dashed rounded-lg">
                            <Package className="mx-auto h-16 w-16 text-muted-foreground" />
                            <h2 className="mt-6 text-2xl font-bold">No orders yet</h2>
                            <p className="mt-2 text-muted-foreground">You haven't placed any orders.</p>
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
