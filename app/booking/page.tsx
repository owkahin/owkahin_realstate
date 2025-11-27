'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Navbar } from '@/components/ui/Navbar';
import { BottomNav } from '@/components/ui/BottomNav';
import { Calendar, Users, MessageSquare, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

function BookingContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const propertyId = searchParams.get('propertyId');

    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '1',
        message: ''
    });

    useEffect(() => {
        if (propertyId) {
            fetchProperty();
        }
    }, [propertyId]);

    const fetchProperty = async () => {
        try {
            const res = await fetch(`/api/properties/${propertyId}`);
            const data = await res.json();
            if (data.success) {
                setProperty(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch property', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Navigate to payment with booking details
        const params = new URLSearchParams({
            propertyId: propertyId || '',
            amount: property?.price || '',
            ...formData
        });
        router.push(`/payment?${params.toString()}`);
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!property) {
        return <div className="min-h-screen flex items-center justify-center">Property not found</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <Link href={`/property/${propertyId}`} className="inline-flex items-center text-gray-600 mb-6 hover:text-black">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Property
            </Link>

            <h1 className="text-3xl font-bold mb-8">Confirm Your Booking</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <div className="flex flex-col md:flex-row">
                    <div className="relative h-48 md:h-auto md:w-1/3">
                        <Image
                            src={property.image}
                            alt={property.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-6 md:w-2/3">
                        <h2 className="text-xl font-bold mb-2">{property.title}</h2>
                        <p className="text-gray-500 mb-4">{property.location}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="font-bold text-blue-600 text-lg">{property.price}</span>
                            <span className="bg-gray-100 px-2 py-1 rounded">{property.type}</span>
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <Input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <Input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <Input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+251 9..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
                        <div className="relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                required
                                type="number"
                                min="1"
                                value={formData.guests}
                                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                className="pl-10"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                required
                                type="date"
                                value={formData.checkIn}
                                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                required
                                type="date"
                                value={formData.checkOut}
                                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                                className="pl-10"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message to Owner (Optional)</label>
                    <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <textarea
                            className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5 min-h-[100px]"
                            placeholder="I'm interested in booking this property..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                    </div>
                </div>

                <Button type="submit" className="w-full py-4 text-lg">
                    Proceed to Payment
                </Button>
            </form>
        </div>
    );
}

export default function BookingPage() {
    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <Navbar />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
                <BookingContent />
            </Suspense>
            <BottomNav />
        </main>
    );
}
