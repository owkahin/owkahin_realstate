import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Bookmark, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
    id: string;
    title: string;
    price: string;
    image: string;
    location?: string;
    rating?: number;
    type?: string;
    className?: string;
}

export const PropertyCard = ({ id, title, price, image, location, rating, type, owner, className }: PropertyCardProps & { owner?: any }) => {
    return (
        <Card className={cn("relative overflow-hidden h-[420px] w-full group border-0 shadow-xl shadow-black/5", className)}>
            <Link href={`/property/${id}`} className="absolute inset-0 z-0" aria-label={`View ${title}`} />

            <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 pointer-events-none" />

            {/* Quick Booking Link */}
            <div className="absolute top-4 right-4 z-10">
                <Link
                    href={`/booking?propertyId=${id}`}
                    className="h-10 px-4 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center hover:bg-blue-700 transition-all active:scale-95 cursor-pointer shadow-lg"
                >
                    Book Now
                </Link>
            </div>

            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
                {rating && (
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-3 py-1 w-fit">
                        <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-white text-xs font-bold">{rating}</span>
                    </div>
                )}
                {type && (
                    <div className="bg-primary/80 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 w-fit shadow-lg">
                        <span className="text-white text-xs font-bold uppercase tracking-wider">{type}</span>
                    </div>
                )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-4 pointer-events-none">
                <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2 leading-tight">
                        {title}
                    </h3>
                    {location && (
                        <div className="flex items-center gap-1.5 text-white/80 mb-2">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm font-medium">{location}</span>
                        </div>
                    )}
                    {owner && (
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1 w-fit">
                            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white">
                                {owner.name ? owner.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <span className="text-xs text-white/90">Added by {owner.name}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/20">
                    <span className="text-white font-display font-bold text-2xl">{price}</span>
                    <div className={cn("inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 h-9 px-6 text-sm bg-white text-black shadow-lg shadow-black/10")}>
                        View Details
                    </div>
                </div>
            </div>
        </Card>
    );
};
