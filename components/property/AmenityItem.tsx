import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AmenityItemProps {
    icon: LucideIcon;
    label: string;
    className?: string;
}

export const AmenityItem = ({ icon: Icon, label, className }: AmenityItemProps) => {
    return (
        <div className={cn("flex items-center gap-3 bg-muted/50 rounded-2xl px-4 py-3 border border-border/50 transition-colors hover:bg-muted hover:border-border", className)}>
            <Icon className="h-5 w-5 text-primary" />
            <span className="font-medium text-foreground text-sm">{label}</span>
        </div>
    );
};
