"use client";
import React, { useEffect, useRef } from 'react';
class Ripple {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    speed: number;
    active: boolean;

    constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = 0;
        this.maxRadius = Math.max(width, height) * 0.7;
        this.speed = 1.1; // Slower, more deliberate motion
        this.active = true;
    }

    update() {
        this.radius += this.speed;
        if (this.radius > this.maxRadius) {
            this.active = false;
        }
    }
}

class Dot {
    originX: number;
    originY: number;
    x: number;
    y: number;
    size: number;
    baseColor: string;
    activeColor: string;
    currentColor: string;

    constructor(x: number, y: number) {
        this.originX = x;
        this.originY = y;
        this.x = x;
        this.y = y;
        this.size = 2; // Slightly larger for better visibility
        // Tri-Color Component 2: Non-active Cool Ash
        this.baseColor = 'rgba(200, 205, 210, 0.25)';
        // Tri-Color Component 3: Active Oxide Red
        this.activeColor = 'rgba(230, 57, 70, 0.9)';
        this.currentColor = this.baseColor;
    }

    update(ripples: Ripple[]) {
        let offsetX = 0;
        let offsetY = 0;
        let isActive = false;

        ripples.forEach(ripple => {
            const dx = this.originX - ripple.x;
            const dy = this.originY - ripple.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const rippleWidth = 120; // Increased width
            const diff = Math.abs(dist - ripple.radius);

            if (diff < rippleWidth) {
                const strength = 1 - (diff / rippleWidth);
                const angle = Math.atan2(dy, dx);
                const push = strength * 10; // Adjusted push strength

                offsetX += Math.cos(angle) * push;
                offsetY += Math.sin(angle) * push;
                isActive = true;
            }
        });

        this.x += (this.originX + offsetX - this.x) * 0.07;
        this.y += (this.originY + offsetY - this.y) * 0.07;

        this.currentColor = isActive ? this.activeColor : this.baseColor;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.currentColor;
        ctx.fill();
    }
}

export default function RippleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width: number, height: number;
        const spacing = 45;
        const rippleFrequency = 0.015;
        let animationFrameId: number;
        let isVisible = true;
        let isInView = true;

        let particles: Dot[] = [];
        let ripples: Ripple[] = [];

        function init() {
            if (!canvas) return;
            const parent = canvas.parentElement;
            if (!parent) return;

            width = canvas.width = parent.clientWidth || window.innerWidth;
            height = canvas.height = parent.clientHeight || window.innerHeight;

            particles = [];
            for (let x = spacing / 2; x < width; x += spacing) {
                for (let y = spacing / 2; y < height; y += spacing) {
                    particles.push(new Dot(x, y));
                }
            }
        }

        function animate() {
            if (!ctx || !canvas) return;
            if (!isVisible || !isInView) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            // Solid fill background to maintain color consistency
            ctx.fillStyle = '#0d0e10';
            ctx.fillRect(0, 0, width, height);

            if (Math.random() < rippleFrequency) {
                ripples.push(new Ripple(width, height));
            }

            ripples = ripples.filter(r => r.active);
            ripples.forEach(r => r.update());

            particles.forEach(p => {
                p.update(ripples);
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        }

        window.addEventListener('resize', init);

        const handleVisibilityChange = () => {
            isVisible = document.visibilityState === 'visible';
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                isInView = Boolean(entry?.isIntersecting);
            },
            { root: null, threshold: 0.1 }
        );
        intersectionObserver.observe(canvas);

        const resizeObserver = new ResizeObserver(() => {
            init();
        });
        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }

        init();
        animate();

        return () => {
            window.removeEventListener('resize', init);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            intersectionObserver.disconnect();
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none h-full w-full block"
        />
    );
}
