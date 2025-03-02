'use client';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface NavItem {
    name: string;
    link: string;
    icon?: React.ReactNode;
}

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: NavItem[];
    className?: string;
}) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 0,
                    y: -100,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    'fixed inset-x-0 top-10 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-10 rounded-full border border-transparent bg-white px-16 py-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-white/[0.2] dark:bg-black',
                    className
                )}
            >
                {navItems.map((navItem: NavItem, idx: number) => (
                    <Link
                        key={`link=${idx}`}
                        href={navItem.link}
                        className={cn(
                            'relative flex items-center space-x-2 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300'
                        )}
                    >
                        <span className="block text-lg sm:hidden">
                            {navItem.icon}
                        </span>
                        <span className="hidden text-base font-medium sm:block">
                            {navItem.name}
                        </span>
                    </Link>
                ))}
            </motion.div>
        </AnimatePresence>
    );
};
