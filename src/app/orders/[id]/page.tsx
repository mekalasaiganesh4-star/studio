'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, CookingPot, Package, Truck } from 'lucide-react';
import { useParams } from 'next/navigation';

const OrderStatus = ({ icon, title, description, completed, isLast = false }: any) => (
    <div className="flex gap-4">
        <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {icon}
            </div>
            {!isLast && <div className={`flex-grow w-0.5 mt-2 ${completed ? 'bg-primary' : 'bg-muted'}`}></div>}
        </div>
        <div>
            <h3 className={`font-semibold ${completed ? 'text-foreground' : 'text-muted-foreground'}`}>{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    </div>
)

export default function OrderTrackingPage() {
    const params = useParams();
    const orderId = params.id;

    // Mock tracking data
    const trackingSteps = [
        {
            icon: <CheckCircle className="w-5 h-5"/>,
            title: 'Order Placed',
            description: 'We have received your order.',
            completed: true
        },
        {
            icon: <CookingPot className="w-5 h-5"/>,
            title: 'Order Confirmed',
            description: 'Your order has been confirmed by the host.',
            completed: true
        },
        {
            icon: <Package className="w-5 h-5"/>,
            title: 'Out for Delivery',
            description: 'Your feast is on its way!',
            completed: true
        },
        {
            icon: <Truck className="w-5 h-5"/>,
            title: 'Delivered',
            description: 'Enjoy your meal!',
            completed: false
        }
    ]


    return (
        <div className="flex flex-col min-h-dvh bg-background">
            <Header />
            <main className="flex-1 py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <Card className="max-w-2xl mx-auto">
                        <CardHeader>
                            <CardTitle className="text-center text-2xl font-headline">Track Order: {orderId}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                           <div className="space-y-0">
                               {trackingSteps.map((step, index) => (
                                   <OrderStatus 
                                        key={step.title}
                                        icon={step.icon}
                                        title={step.title}
                                        description={step.description}
                                        completed={step.completed}
                                        isLast={index === trackingSteps.length - 1}
                                   />
                               ))}
                           </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}
