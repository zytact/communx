'use client';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { GlowEffectButton } from '@/components/ui/GlowEffectButton';
import { TypewriterEffect } from '@/components/ui/TypeWriter';
import { WavyBackground } from '@/components/ui/wavy-background';
import { Home as HomeIcon, CircleHelp, Users as Community } from 'lucide-react';

export default function Home() {
    const navItems = [
        {
            name: 'Home',
            link: '/',
            icon: <HomeIcon />,
        },
        {
            name: 'Communities',
            link: '/communities',
            icon: <Community />,
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
                colors={['#2f3ed2', '#5a3ed2', '#093ed2']}
            >
                <div className="flex flex-col items-center justify-center">
                    <div className="mb-16">
                        <TypewriterEffect
                            words={[
                                { text: 'We' },
                                { text: 'Connect.' },
                                { text: 'We' },
                                { text: 'Build.' },
                                { text: 'We' },
                                { text: 'Welcome.' },
                            ]}
                            cursorClassName="bg-blue-500"
                        />
                    </div>

                    <div className="mt-8">
                        <GlowEffectButton />
                    </div>
                </div>
            </WavyBackground>
        </main>
    );
}
