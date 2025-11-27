import React from 'react';
import { Search, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string;
    icon?: LucideIcon;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, containerClassName, icon: Icon, ...props }, ref) => {
        return (
            <div className={cn("relative flex items-center group", containerClassName)}>
                {Icon && (
                    <Icon className="absolute left-4 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                )}
                <input
                    ref={ref}
                    className={cn(
                        "flex h-12 w-full rounded-2xl border border-input bg-white/50 px-4 py-2 text-sm shadow-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-white hover:border-primary/30",
                        Icon ? "pl-12" : "pl-4",
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);
Input.displayName = 'Input';
