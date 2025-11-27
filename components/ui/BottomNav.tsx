'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, MessageSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BottomNav = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-6 md:hidden">
            <div className="glass-dark flex items-center justify-between rounded-3xl px-6 py-4 shadow-2xl shadow-black/20">
                <Link href="/" className={cn("flex flex-col items-center justify-center gap-1 transition-colors group", isActive('/') ? "text-white" : "text-white/50 hover:text-white")}>
                    <div className={cn("rounded-full p-2.5 transition-all duration-300 group-active:scale-95", isActive('/') ? "bg-white/20 group-hover:bg-white/30" : "")}>
                        <Home className={cn("h-5 w-5", isActive('/') ? "text-white fill-white" : "")} />
                    </div>
                </Link>
                <Link href="/explore" className={cn("flex flex-col items-center justify-center gap-1 transition-colors group", isActive('/explore') ? "text-white" : "text-white/50 hover:text-white")}>
                    <div className={cn("p-2.5 transition-all duration-300 group-active:scale-95", isActive('/explore') ? "bg-white/20 rounded-full group-hover:bg-white/30" : "")}>
                        <Compass className={cn("h-6 w-6", isActive('/explore') ? "fill-white" : "")} />
                    </div>
                </Link>
                <Link href="/chat" className={cn("flex flex-col items-center justify-center gap-1 transition-colors group", isActive('/chat') ? "text-white" : "text-white/50 hover:text-white")}>
                    <div className={cn("p-2.5 transition-all duration-300 group-active:scale-95", isActive('/chat') ? "bg-white/20 rounded-full group-hover:bg-white/30" : "")}>
                        <MessageSquare className={cn("h-6 w-6", isActive('/chat') ? "fill-white" : "")} />
                    </div>
                </Link>
                <Link href="/profile" className={cn("flex flex-col items-center justify-center gap-1 transition-colors group", isActive('/profile') ? "text-white" : "text-white/50 hover:text-white")}>
                    <div className={cn("p-2.5 transition-all duration-300 group-active:scale-95", isActive('/profile') ? "bg-white/20 rounded-full group-hover:bg-white/30" : "")}>
                        <User className={cn("h-6 w-6", isActive('/profile') ? "fill-white" : "")} />
                    </div>
                </Link>
            </div>
        </div>
    );
};
