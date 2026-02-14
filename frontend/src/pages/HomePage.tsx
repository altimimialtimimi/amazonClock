import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroCarousel from '../components/HeroCarousel';
import CategoryGrid from '../components/CategoryGrid';
import ProductScroller from '../components/ProductScroller';
import ProductCard from '../components/ProductCard';
import type { Product } from '../components/ProductCard';
import client from '../api/client';

const mockProducts: Product[] = [
    {
        id: '1', name: 'Organic Roma Tomatoes - Fresh from Farm, 2 lb Bag', description: 'Premium organic tomatoes',
        price: 4.99, originalPrice: 7.99, imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400',
        category: 'Vegetables', rating: 5, reviewCount: 1243, discount: 38, isPrime: true
    },
    {
        id: '2', name: 'Baby Spinach - Pre-Washed, Ready to Eat, 10 oz Package', description: 'Fresh baby spinach',
        price: 2.49, originalPrice: 4.29, imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400',
        category: 'Leafy Greens', rating: 4, reviewCount: 892, discount: 42, isPrime: true
    },
    {
        id: '3', name: 'Fresh Organic Carrots - Sweet & Crunchy, 3 lb Bag', description: 'Farm fresh organic carrots',
        price: 3.29, originalPrice: 5.49, imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400',
        category: 'Root Vegetables', rating: 5, reviewCount: 2105, discount: 40, isPrime: true
    },
    {
        id: '4', name: 'Crown Broccoli - Non-GMO, Farm Direct, per lb', description: 'Fresh crown broccoli',
        price: 2.99, originalPrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&q=80&w=400',
        category: 'Vegetables', rating: 4, reviewCount: 567, discount: 40, isPrime: true
    },
    {
        id: '5', name: 'Red Bell Peppers - Sweet & Crisp, 3 Pack', description: 'Fresh red bell peppers',
        price: 3.99, originalPrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&q=80&w=400',
        category: 'Vegetables', rating: 4, reviewCount: 334, discount: 33, isPrime: true
    },
    {
        id: '6', name: 'Fresh Avocados - Hass, Ready to Eat, 6 Count', description: 'Perfectly ripe avocados',
        price: 5.49, originalPrice: 8.99, imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=400',
        category: 'Fruits', rating: 5, reviewCount: 3421, discount: 39, isPrime: true
    },
    {
        id: '7', name: 'Mixed Salad Greens - Farm Fresh, 12 oz Container', description: 'Ready-to-eat salad mix',
        price: 3.79, originalPrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400',
        category: 'Salad Mixes', rating: 4, reviewCount: 721, discount: 37, isPrime: true
    },
    {
        id: '8', name: 'English Cucumber - Seedless, Extra Long, Each', description: 'Fresh English cucumber',
        price: 1.29, originalPrice: 2.49, imageUrl: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&q=80&w=400',
        category: 'Vegetables', rating: 4, reviewCount: 198, discount: 48, isPrime: true
    },
];

const bestSellers: Product[] = [
    {
        id: '9', name: 'Fresh Ginger Root - Organic, per lb', description: 'Aromatic fresh ginger',
        price: 3.49, imageUrl: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&q=80&w=400',
        category: 'Herbs', rating: 5, reviewCount: 1876, isPrime: true
    },
    {
        id: '10', name: 'Fresh Garlic Bulbs - Purple Skin, 3 Count', description: 'Premium garlic',
        price: 2.29, imageUrl: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2571?auto=format&fit=crop&q=80&w=400',
        category: 'Herbs', rating: 5, reviewCount: 4312, isPrime: true
    },
    {
        id: '11', name: 'Sweet Potatoes - Orange Flesh, 3 lb Bag', description: 'Sweet and nutritious',
        price: 4.49, imageUrl: 'https://images.unsplash.com/photo-1596097635121-14b63a7a6c14?auto=format&fit=crop&q=80&w=400',
        category: 'Root Vegetables', rating: 4, reviewCount: 987, isPrime: true
    },
    {
        id: '12', name: 'Fresh Basil - Living Herb Plant in Pot', description: 'Grow at home basil',
        price: 4.99, imageUrl: 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?auto=format&fit=crop&q=80&w=400',
        category: 'Herbs', rating: 4, reviewCount: 2134, isPrime: true
    },
    {
        id: '13', name: 'Kale - Curly Green, Organic, 1 Bunch', description: 'Nutrient rich kale',
        price: 2.99, imageUrl: 'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&q=80&w=400',
        category: 'Leafy Greens', rating: 4, reviewCount: 456, isPrime: true
    },
    {
        id: '14', name: 'Cherry Tomatoes - Sweet Grape Variety, 1 Pint', description: 'Sweet cherry tomatoes',
        price: 3.49, imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=400',
        category: 'Vegetables', rating: 5, reviewCount: 1567, isPrime: true
    },
];

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await client.get('/products');
                if (res.data.length > 0) {
                    setProducts(res.data);
                }
            } catch (err) {
                // Use mock data
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#eaeded' }}>
            <Navbar />

            {/* Hero Carousel */}
            <HeroCarousel />

            {/* Category Grid (overlapping carousel) */}
            <CategoryGrid />

            {/* Deal Section */}
            <div className="max-w-[1500px] mx-auto px-4 mt-6 w-full">
                <ProductScroller
                    title="Today's Deals"
                    products={products}
                    dealLabel="Limited time deal"
                />
            </div>

            {/* Sign in recommendation */}
            <div className="max-w-[1500px] mx-auto px-4 mt-4 w-full">
                <div className="bg-white p-4 rounded-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-[#0f1111]">Sign in for the best experience</h3>
                            <p className="text-sm text-[#565959] mt-1">Personalized deals, faster checkout, and order tracking.</p>
                        </div>
                        <a href="/login" className="btn-amazon-primary text-sm whitespace-nowrap">
                            Sign in securely
                        </a>
                    </div>
                </div>
            </div>

            {/* Best Sellers Grid */}
            <div className="max-w-[1500px] mx-auto px-4 mt-4 w-full">
                <div className="bg-white p-4 rounded-sm">
                    <h2 className="text-xl font-bold text-[#0f1111] mb-4">Best Sellers in Fresh Produce</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {bestSellers.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Deals Row */}
            <div className="max-w-[1500px] mx-auto px-4 mt-4 w-full">
                <ProductScroller
                    title="Popular in Your Area"
                    products={[...bestSellers, ...products.slice(0, 4)]}
                />
            </div>

            {/* Two-column promo row */}
            <div className="max-w-[1500px] mx-auto px-4 mt-4 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-sm">
                    <h2 className="text-xl font-bold text-[#0f1111] mb-3">Organic Pick of the Week</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {products.slice(0, 4).map((p) => (
                            <div key={p.id} className="cursor-pointer">
                                <div className="h-[120px] rounded-sm overflow-hidden mb-1">
                                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                                </div>
                                <p className="text-[13px] text-[#0f1111] line-clamp-1">{p.name.split('-')[0]}</p>
                            </div>
                        ))}
                    </div>
                    <a href="/products" className="text-[#007185] text-sm hover:text-[#c7511f] hover:underline mt-3 inline-block">
                        See more
                    </a>
                </div>
                <div className="bg-white p-4 rounded-sm">
                    <h2 className="text-xl font-bold text-[#0f1111] mb-3">Fresh Arrivals</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {products.slice(4, 8).map((p) => (
                            <div key={p.id} className="cursor-pointer">
                                <div className="h-[120px] rounded-sm overflow-hidden mb-1">
                                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                                </div>
                                <p className="text-[13px] text-[#0f1111] line-clamp-1">{p.name.split('-')[0]}</p>
                            </div>
                        ))}
                    </div>
                    <a href="/products" className="text-[#007185] text-sm hover:text-[#c7511f] hover:underline mt-3 inline-block">
                        See more
                    </a>
                </div>
            </div>

            {/* Recently viewed / More to explore */}
            <div className="max-w-[1500px] mx-auto px-4 mt-4 mb-8 w-full">
                <ProductScroller
                    title="Inspired by your shopping trends"
                    products={[...products].reverse()}
                />
            </div>

            <Footer />
        </div>
    );
};

export default HomePage;
