import React, { useState } from 'react';
import { Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    imageUrl: string;
    category: string;
    rating?: number;
    reviewCount?: number;
    discount?: number;
    isPrime?: boolean;
    stock?: number;
}

interface ProductCardProps {
    product: Product;
}

const StarRating = ({ rating = 4, count = 0 }: { rating?: number; count?: number }) => {
    return (
        <div className="flex items-center gap-1">
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={14}
                        className={star <= rating ? 'text-[#de7921] fill-[#de7921]' : 'text-gray-300 fill-gray-300'}
                    />
                ))}
            </div>
            {count > 0 && (
                <span className="text-[#007185] text-[13px] hover:text-[#c7511f] hover:underline cursor-pointer">
                    {count.toLocaleString()}
                </span>
            )}
        </div>
    );
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);
    const discount = product.discount || (product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <div className="product-card bg-white p-4 rounded-sm cursor-pointer animate-fadeIn flex flex-col h-full">
            {/* Image */}
            <div className="relative flex items-center justify-center h-[200px] mb-3">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200?text=No+Image';
                    }}
                />
                {discount > 0 && (
                    <span className="deal-badge absolute top-0 left-0">
                        {discount}% off
                    </span>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col">
                <h3 className="text-[#0f1111] text-sm leading-5 line-clamp-2 hover:text-[#c7511f] cursor-pointer mb-1">
                    {product.name}
                </h3>

                <StarRating rating={product.rating || 4} count={product.reviewCount || Math.floor(Math.random() * 500 + 50)} />

                <p className="text-[13px] text-[#565959] mt-0.5">
                    {Math.floor(Math.random() * 5 + 1)}K+ bought in past month
                </p>

                <div className="mt-1">
                    {discount > 0 && (
                        <div className="flex items-baseline gap-1 mb-0.5">
                            <span className="text-[#cc0c39] text-[13px] font-medium">-{discount}%</span>
                            {product.originalPrice && (
                                <span className="text-[#565959] text-[13px] line-through">
                                    ${product.originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>
                    )}
                    <div className="flex items-baseline">
                        <span className="text-[13px] text-[#0f1111] relative -top-[5px]">$</span>
                        <span className="text-[28px] text-[#0f1111] font-light leading-none">
                            {Math.floor(product.price)}
                        </span>
                        <span className="text-[13px] text-[#0f1111] relative -top-[5px]">
                            {(product.price % 1).toFixed(2).slice(1)}
                        </span>
                    </div>
                </div>

                {(product.isPrime !== false) && (
                    <div className="flex items-center gap-1 mt-1">
                        <span className="text-[#007185] text-[12px] font-bold italic tracking-tight">
                            fresh<span className="text-[#f08804]">PRIME</span>
                        </span>
                        <span className="text-[#565959] text-[12px]">FREE delivery</span>
                    </div>
                )}

                {/* Add to Cart Button */}
                <button
                    className={`mt-3 text-[13px] rounded-full py-2 px-4 font-semibold transition-all duration-300 ${added
                            ? 'bg-[#067d62] text-white border border-[#067d62]'
                            : 'btn-amazon-primary'
                        }`}
                    onClick={handleAddToCart}
                >
                    {added ? (
                        <span className="flex items-center justify-center gap-1">
                            <Check size={16} /> Added
                        </span>
                    ) : (
                        'Add to Cart'
                    )}
                </button>
            </div>
        </div>
    );
};

export { StarRating };
export type { Product };
export default ProductCard;
