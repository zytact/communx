'use client';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { TypewriterEffect } from '@/components/ui/TypeWriter';
import { WavyBackground } from '@/components/ui/wavy-background';
import { Home as HomeIcon, CircleHelp } from 'lucide-react';

export default function Home() {
    const navItems = [
        {
            name: 'Home',
            link: '/',
            icon: <HomeIcon />,
        },
        {
            name: 'About',
            link: '/about',
            icon: <CircleHelp />,
        },
    ];

    return (
        <main className="relative h-screen w-screen overflow-hidden">
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2"></div>
            <FloatingNav navItems={navItems} />
            <WavyBackground
                backgroundFill="#171717"
                colors={['#a61717', '#e53e17', '#ba3e17']}
            >
                <TypewriterEffect
                    words={[
                        { text: 'The' },
                        { text: 'best' },
                        { text: 'in' },
                        { text: 'the' },
                        { text: 'world' },
                    ]}
                    cursorClassName="bg-red-500"
                />
            </WavyBackground>
        </main>
    );
}
