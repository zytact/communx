import { GlowEffect } from '@/components/ui/glow-effect';
import { ArrowRight } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { LocationDetector } from '@/components/ui/community-location';

export function GlowEffectButton() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="relative cursor-pointer">
                    <GlowEffect
                        colors={['#FF5733', '#33FF57', '#F1C40F']}
                        mode="colorShift"
                        blur="soft"
                        duration={3}
                        scale={0.9}
                    />
                    <button className="relative inline-flex items-center gap-1 rounded-md bg-zinc-950 px-2.5 py-1.5 text-sm text-zinc-50 outline-1 outline-[#fff2f21f]">
                        Find Communities <ArrowRight className="h4 w-4" />
                    </button>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4">
                <div className="space-y-2">
                    <h4 className="leading-none font-medium">Your Location</h4>
                    <p className="text-muted-foreground text-sm">
                        Detect your location to find nearby communities
                    </p>
                    <div className="pt-2">
                        <LocationDetector />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
