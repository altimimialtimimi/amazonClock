import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
    {
        title: 'Fresh Vegetables',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400',
        link: '/products?cat=vegetables',
    },
    {
        title: 'Organic Produce',
        image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=400',
        link: '/products?cat=organic',
    },
    {
        title: 'Fresh Fruits',
        image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=400',
        link: '/products?cat=fruits',
    },
    {
        title: 'Herbs & Spices',
        image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=400',
        link: '/products?cat=herbs',
    },
    {
        title: 'Salad Mixes',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400',
        link: '/products?cat=salads',
    },
    {
        title: 'Root Vegetables',
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400',
        link: '/products?cat=root',
    },
    {
        title: 'Leafy Greens',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400',
        link: '/products?cat=leafy',
    },
    {
        title: 'Frozen Products',
        image: 'https://images.unsplash.com/photo-1580910527160-6be37131038e?auto=format&fit=crop&q=80&w=400',
        link: '/products?cat=frozen',
    },
];

const CategoryGrid = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1500px] mx-auto px-4 -mt-[80px] relative z-20">
            {categories.map((cat) => (
                <Link
                    key={cat.title}
                    to={cat.link}
                    className="bg-white p-4 hover:shadow-md transition-shadow rounded-sm animate-fadeIn"
                >
                    <h3 className="text-base font-bold text-[#0f1111] mb-2">{cat.title}</h3>
                    <div className="h-[160px] overflow-hidden rounded-sm mb-2">
                        <img
                            src={cat.image}
                            alt={cat.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=' + cat.title;
                            }}
                        />
                    </div>
                    <span className="text-[#007185] text-sm hover:text-[#c7511f] hover:underline">
                        Shop now
                    </span>
                </Link>
            ))}
        </div>
    );
};

export default CategoryGrid;
