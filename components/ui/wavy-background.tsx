'use client';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, HTMLAttributes } from 'react';
import { createNoise3D } from 'simplex-noise';

export type WavyBackgroundProps = {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    colors?: string[];
    waveWidth?: number;
    backgroundFill?: string;
    blur?: number;
    speed?: 'slow' | 'fast';
    waveOpacity?: number;
} & HTMLAttributes<HTMLDivElement>;

export const WavyBackground = ({
    children,
    className,
    containerClassName,
    colors,
    waveWidth,
    backgroundFill,
    blur = 10,
    speed = 'fast',
    waveOpacity = 0.5,
    ...props
}: WavyBackgroundProps) => {
    const noise = createNoise3D();
    let w: number,
        h: number,
        nt: number,
        i: number,
        x: number,
        ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const getSpeed = () => {
        switch (speed) {
            case 'slow':
                return 0.001;
            case 'fast':
                return 0.002;
            default:
                return 0.001;
        }
    };

    const init = () => {
        canvas = canvasRef.current!;
        ctx = canvas.getContext('2d')!;
        w = ctx.canvas.width = window.innerWidth;
        h = ctx.canvas.height = window.innerHeight;
        ctx.filter = `blur(${blur}px)`;
        nt = 0;
        window.onresize = function () {
            w = ctx.canvas.width = window.innerWidth;
            h = ctx.canvas.height = window.innerHeight;
            ctx.filter = `blur(${blur}px)`;
        };
        render();
    };

    const waveColors = colors ?? [
        '#38bdf8',
        '#818cf8',
        '#c084fc',
        '#e879f9',
        '#22d3ee',
    ];
    const drawWave = (n: number) => {
        nt += getSpeed();
        for (i = 0; i < n; i++) {
            ctx.beginPath();
            ctx.lineWidth = waveWidth || 50;
            ctx.strokeStyle = waveColors[i % waveColors.length];
            for (x = 0; x < w; x += 5) {
                const y = noise(x / 800, 0.3 * i, nt) * 100;
                ctx.lineTo(x, y + h * 0.5); // adjust for height, currently at 50% of the container
            }
            ctx.stroke();
            ctx.closePath();
        }
    };

    let animationId: number = 0;
    const render = () => {
        // First clear the canvas with fully opaque background
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = backgroundFill || 'black';
        ctx.fillRect(0, 0, w, h);

        // Then draw the waves with the specified opacity
        ctx.globalAlpha = waveOpacity || 0.5;
        drawWave(5);
        animationId = requestAnimationFrame(render);
    };

    useEffect(() => {
        init();
        return () => {
            cancelAnimationFrame(animationId);
        };
        // We're intentionally not including animationId in the deps array
        // because it would cause an infinite loop as it changes on every render call
        // init is defined outside useEffect and doesn't depend on any props that change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={cn(
                'flex h-screen flex-col items-center justify-center',
                containerClassName
            )}
        >
            <canvas
                className="absolute inset-0 z-0"
                ref={canvasRef}
                id="canvas"
            ></canvas>
            <div className={cn('relative z-10', className)} {...props}>
                {children}
            </div>
        </div>
    );
};
