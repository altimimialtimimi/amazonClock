import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        bgGradient: 'linear-gradient(135deg, #1a472a 0%, #2d5a27 50%, #4a7c32 100%)',
        title: 'Farm-Fresh Vegetables',
        subtitle: 'Delivered Daily to Your Door',
        cta: 'Shop Now',
        textColor: 'white',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=1000',
    },
    {
        id: 2,
        bgGradient: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)',
        title: 'Organic Collection',
        subtitle: 'Up to 40% Off This Week',
        cta: 'Explore Deals',
        textColor: 'white',
        image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=1000',
    },
    {
        id: 3,
        bgGradient: 'linear-gradient(135deg, #1a365d 0%, #2a4a7f 50%, #3b82f6 100%)',
        title: 'Weekly Specials',
        subtitle: 'Fresh Deals Every Thursday',
        cta: 'See All Deals',
        textColor: 'white',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000',
    },
    {
        id: 4,
        bgGradient: 'linear-gradient(135deg, #7c2d12 0%, #9a3412 50%, #ea580c 100%)',
        title: 'Valentine\'s Special 🌹',
        subtitle: 'Fresh Herb Gift Boxes Available',
        cta: 'Order Now',
        textColor: 'white',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=1000',
    },
];

const HeroCarousel = () => {
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
    }, []);

    const prev = useCallback(() => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    const slide = slides[current];

    return (
        <div className="relative w-full overflow-hidden" style={{ height: 'clamp(200px, 40vw, 600px)' }}>
            {/* Background */}
            <div
                className="absolute inset-0 transition-all duration-700 ease-out"
                style={{ background: slide.bgGradient }}
            />

            {/* Background Image */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover opacity-30 transition-all duration-700"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
                <div className="max-w-[1500px] mx-auto px-4 md:px-8 w-full">
                    <div className="max-w-xl animate-fadeIn" key={current}>
                        <h2 className="text-3xl md:text-5xl font-bold mb-3" style={{ color: slide.textColor }}>
                            {slide.title}
                        </h2>
                        <p className="text-lg md:text-xl mb-6 opacity-90" style={{ color: slide.textColor }}>
                            {slide.subtitle}
                        </p>
                        <button className="btn-amazon-primary text-base px-8 py-3">
                            {slide.cta}
                        </button>
                    </div>
                </div>
            </div>

            {/* Arrows */}
            <button
                onClick={prev}
                className="absolute left-0 top-0 h-full w-[60px] flex items-center justify-center text-white hover:bg-white/10 transition z-20"
            >
                <ChevronLeft size={40} strokeWidth={1} />
            </button>
            <button
                onClick={next}
                className="absolute right-0 top-0 h-full w-[60px] flex items-center justify-center text-white hover:bg-white/10 transition z-20"
            >
                <ChevronRight size={40} strokeWidth={1} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
                            }`}
                    />
                ))}
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#eaeded] to-transparent z-10" />
        </div>
    );
};

export default HeroCarousel;
