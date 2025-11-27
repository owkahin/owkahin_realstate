import React from 'react';
import { Badge } from '@/components/ui/Badge';

const categories = ['All', 'Buy', 'Rent', 'Sell', 'New Projects'];

export const CategoryList = ({ selectedCategory, onSelectCategory }: { selectedCategory: string; onSelectCategory: (category: string) => void }) => {
    return (
        <div className="flex items-center gap-3 overflow-x-auto px-6 pb-6 no-scrollbar md:flex-wrap md:justify-center md:px-0 md:overflow-visible">
            {categories.map((category) => (
                <div key={category} onClick={() => onSelectCategory(category)}>
                    <Badge
                        variant={selectedCategory === category ? 'default' : 'glass'}
                        active={selectedCategory === category}
                        className="whitespace-nowrap h-10 px-6 text-sm cursor-pointer md:h-12 md:text-base md:px-8"
                    >
                        {category}
                    </Badge>
                </div>
            ))}
        </div>
    );
};
