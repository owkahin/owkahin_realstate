'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { BottomNav } from '@/components/ui/BottomNav';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CreditCard, Wallet, CheckCircle, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

function PaymentContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const amount = searchParams.get('amount');

    const [selectedMethod, setSelectedMethod] = useState('telebirr');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        setProcessing(false);
        setSuccess(true);

        // Redirect to home after success
        setTimeout(() => {
            router.push('/');
        }, 3000);
    };

    if (success) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
                <p className="text-gray-500 mb-8">Your booking has been confirmed.</p>
                <Button onClick={() => router.push('/')}>Return Home</Button>
            </div>
        );
    }

    const paymentMethods = [
        { id: 'visa', name: 'Visa', icon: CreditCard, color: 'bg-blue-50 text-blue-600 border-blue-200' },
        { id: 'mastercard', name: 'MasterCard', icon: CreditCard, color: 'bg-orange-50 text-orange-600 border-orange-200' },
        { id: 'paypal', name: 'PayPal', icon: Wallet, color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
        { id: 'telebirr', name: 'Telebirr', icon: Wallet, color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
        { id: 'ebirr', name: 'E-birr', icon: Wallet, color: 'bg-green-50 text-green-600 border-green-200' },
        { id: 'sahay', name: 'Sahay', icon: Wallet, color: 'bg-purple-50 text-purple-600 border-purple-200' },
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <button onClick={() => router.back()} className="inline-flex items-center text-gray-600 mb-6 hover:text-black">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
            </button>

            <h1 className="text-3xl font-bold mb-2">Payment</h1>
            <p className="text-gray-500 mb-8">Complete your booking securely</p>

            <div className="bg-blue-50 p-6 rounded-2xl mb-8 flex justify-between items-center">
                <div>
                    <p className="text-sm text-blue-600 font-medium mb-1">Total Amount</p>
                    <p className="text-3xl font-bold text-blue-900">{amount}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {paymentMethods.map((method) => (
                    <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all ${selectedMethod === method.id
                                ? `${method.color} border-current`
                                : 'bg-white border-gray-100 hover:border-gray-200'
                            }`}
                    >
                        <method.icon className="w-6 h-6" />
                        <span className="font-semibold">{method.name}</span>
                    </button>
                ))}
            </div>

            <form onSubmit={handlePayment} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold mb-6">Enter Payment Details</h3>

                {(selectedMethod === 'visa' || selectedMethod === 'mastercard') && (
                    <div className="space-y-4">
                        <Input placeholder="Card Number" required />
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="MM/YY" required />
                            <Input placeholder="CVC" required />
                        </div>
                        <Input placeholder="Cardholder Name" required />
                    </div>
                )}

                {(selectedMethod === 'telebirr' || selectedMethod === 'ebirr' || selectedMethod === 'sahay') && (
                    <div className="space-y-4">
                        <Input placeholder="Mobile Number" type="tel" required />
                        <Input placeholder="PIN" type="password" required />
                    </div>
                )}

                {selectedMethod === 'paypal' && (
                    <div className="space-y-4">
                        <Input placeholder="PayPal Email" type="email" required />
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full mt-6 py-4 text-lg"
                    disabled={processing}
                >
                    {processing ? 'Processing...' : `Pay ${amount}`}
                </Button>
            </form>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <Navbar />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
                <PaymentContent />
            </Suspense>
            <BottomNav />
        </main>
    );
}
