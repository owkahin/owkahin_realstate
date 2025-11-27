'use client';

import React, { useState } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryList } from '@/components/home/CategoryList';
import { PropertyFeed } from '@/components/home/PropertyFeed';
import { BottomNav } from '@/components/ui/BottomNav';
import { Navbar } from '@/components/ui/Navbar';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <main className="min-h-screen bg-white pb-20 relative">
      <Navbar />
      <div className="max-w-7xl mx-auto w-full">
        <HeroSection />
        <CategoryList
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <PropertyFeed selectedCategory={selectedCategory} />
      </div>
      <BottomNav />
    </main>
  );
}
