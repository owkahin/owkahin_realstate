import React from 'react';
import { cn } from '@/lib/utils';

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-3xl bg-card text-card-foreground border border-border/50 shadow-sm",
                    className
                )}
                {...props}
            />
        );
    }
);
Card.displayName = 'Card';
