import React from 'react';
import { Input } from '@/components/ui/Input';
import { LayoutGrid, Search } from 'lucide-react';

export const HeroSection = () => {
    return (
        <div className="px-6 pt-8 pb-6 md:pt-12 md:pb-10 md:px-0">


            <div className="md:text-center md:max-w-2xl md:mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-2 leading-tight md:mb-6">
                    Find The <br className="md:hidden" />
                    Perfect Home
                </h1>
                <p className="text-gray-500 text-sm md:text-lg mb-8 md:mb-12">
                    Discover the best home for you
                </p>
            </div>
        </div>
    );
};
