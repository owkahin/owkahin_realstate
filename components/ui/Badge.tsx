import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outline' | 'secondary' | 'glass';
    active?: boolean;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant = 'default', active = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    active
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "bg-white text-muted-foreground border border-border hover:border-primary/20 hover:bg-muted/50",
                    variant === 'glass' && "glass text-foreground border-white/20",
                    className
                )}
                {...props}
            />
        );
    }
);
Badge.displayName = 'Badge';
