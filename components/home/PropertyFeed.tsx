import React, { useState, useEffect } from 'react';
import { PropertyCard } from './PropertyCard';

export const PropertyFeed = ({ selectedCategory = 'All' }: { selectedCategory?: string }) => {
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch('/api/properties');
                const data = await res.json();
                if (data.success) {
                    setProperties(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch properties', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const filteredProperties = selectedCategory === 'All'
        ? properties
        : properties.filter(property => property.type === selectedCategory);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    if (filteredProperties.length === 0) {
        return (
            <div className="text-center py-20 text-gray-500">
                No properties found in this category.
            </div>
        );
    }

    return (
        <div className="flex gap-6 overflow-x-auto px-6 pb-32 pt-4 no-scrollbar snap-x snap-mandatory scroll-smooth md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-20 md:px-0">
            {filteredProperties.map((property) => (
                <div key={property._id} className="min-w-[85%] sm:min-w-[300px] snap-center md:min-w-0">
                    <PropertyCard
                        id={property._id}
                        title={property.title}
                        price={property.price}
                        image={property.image}
                        location={property.location}
                        type={property.type}
                        rating={4.8} // Default rating for now
                        owner={property.owner}
                    />
                </div>
            ))}
        </div>
    );
};
