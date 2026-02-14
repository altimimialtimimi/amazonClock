import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import type { Product } from './ProductCard';

interface ProductScrollerProps {
    title: string;
    products: Product[];
    link?: string;
    dealLabel?: string;
}

const ProductScroller: React.FC<ProductScrollerProps> = ({ title, products, dealLabel }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="bg-white p-4 rounded-sm">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-[#0f1111]">{title}</h2>
                    {dealLabel && <span className="deal-badge">{dealLabel}</span>}
                </div>
                <a href="/products" className="text-[#007185] text-sm hover:text-[#c7511f] hover:underline">
                    See all deals
                </a>
            </div>

            <div className="relative group">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-sm p-1 opacity-0 group-hover:opacity-100 transition-opacity border"
                >
                    <ChevronLeft size={30} className="text-[#555]" />
                </button>

                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {products.map((product) => (
                        <div key={product.id} className="min-w-[220px] max-w-[220px] flex-shrink-0">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-sm p-1 opacity-0 group-hover:opacity-100 transition-opacity border"
                >
                    <ChevronRight size={30} className="text-[#555]" />
                </button>
            </div>
        </div>
    );
};

export default ProductScroller;
