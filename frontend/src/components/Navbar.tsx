import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, MapPin, ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const categories = [
    'All', 'Fresh Vegetables', 'Fruits', 'Organic', 'Herbs & Spices',
    'Frozen', 'Salad Mixes', 'Root Vegetables', 'Leafy Greens'
];

const navLinks = [
    { label: 'Today\'s Deals', href: '/deals' },
    { label: 'Fresh Arrivals', href: '/products' },
    { label: 'Organic', href: '/products?cat=organic' },
    { label: 'Best Sellers', href: '/products' },
    { label: 'Gift Cards', href: '#' },
    { label: 'Customer Service', href: '#' },
];

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { totalItems } = useCart();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/products?q=${searchQuery}`);
    };

    return (
        <header className="sticky top-0 z-50">
            {/* Main Nav Bar */}
            <div style={{ backgroundColor: '#131921' }} className="text-white">
                <div className="max-w-[1500px] mx-auto px-2 md:px-4 flex items-center h-[60px] gap-2 md:gap-4">

                    <button
                        className="md:hidden p-2 hover:outline hover:outline-1 hover:outline-white rounded-sm"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Menu size={24} />
                    </button>

                    <Link to="/" className="flex items-center flex-shrink-0 px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm">
                        <span className="text-xl md:text-2xl font-bold tracking-tight">
                            <span className="text-[#ff9900]">Fresh</span>Market
                        </span>
                        <span className="text-[#ff9900] text-[10px] ml-0.5 self-end mb-1">.iq</span>
                    </Link>

                    <div className="hidden lg:flex items-center px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm cursor-pointer flex-shrink-0">
                        <MapPin size={18} className="text-white mr-1" />
                        <div>
                            <span className="text-[#ccc] text-[11px] block leading-tight">Deliver to</span>
                            <span className="text-white text-sm font-bold leading-tight">Iraq</span>
                        </div>
                    </div>

                    <form onSubmit={handleSearch} className="flex-1 flex h-[40px] min-w-0">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="hidden md:block bg-[#e6e6e6] text-[#555] text-[12px] px-2 rounded-l-md border-none outline-none cursor-pointer hover:bg-[#d4d4d4] flex-shrink-0"
                            style={{ minWidth: '60px', maxWidth: '130px' }}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search Fresh Market"
                            className="flex-1 px-3 text-black text-sm outline-none border-none min-w-0 md:rounded-none rounded-l-md"
                        />
                        <button
                            type="submit"
                            className="bg-[#febd69] hover:bg-[#f3a847] px-3 md:px-4 rounded-r-md flex items-center justify-center flex-shrink-0"
                        >
                            <Search size={20} className="text-[#131921]" />
                        </button>
                    </form>

                    <div className="hidden md:flex flex-col px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm cursor-pointer flex-shrink-0">
                        {isAuthenticated ? (
                            <Link to="#" onClick={(e) => { e.preventDefault(); logout(); navigate('/login'); }}>
                                <span className="text-[#ccc] text-[11px] block leading-tight">Hello, {user?.fullName.split(' ')[0]}</span>
                                <span className="text-white text-sm font-bold leading-tight flex items-center">
                                    Account <ChevronDown size={12} className="ml-1" />
                                </span>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <span className="text-[#ccc] text-[11px] block leading-tight">Hello, sign in</span>
                                <span className="text-white text-sm font-bold leading-tight flex items-center">
                                    Account & Lists <ChevronDown size={12} className="ml-1" />
                                </span>
                            </Link>
                        )}
                    </div>

                    <Link to="#" className="hidden md:flex flex-col px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm flex-shrink-0">
                        <span className="text-[#ccc] text-[11px] block leading-tight">Returns</span>
                        <span className="text-white text-sm font-bold leading-tight">& Orders</span>
                    </Link>

                    {/* Cart with live count */}
                    <Link to="/cart" className="flex items-center px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm flex-shrink-0">
                        <div className="relative">
                            <ShoppingCart size={28} className="text-white" />
                            <span className={`absolute -top-1 left-3 text-[14px] font-bold px-1.5 rounded-full leading-tight ${totalItems > 0 ? 'bg-[#f08804] text-white' : 'bg-[#f08804] text-white'
                                }`}>
                                {totalItems}
                            </span>
                        </div>
                        <span className="hidden md:inline text-white text-sm font-bold ml-1">Cart</span>
                    </Link>
                </div>
            </div>

            {/* Secondary Nav */}
            <div style={{ backgroundColor: '#232f3e' }} className="text-white">
                <div className="max-w-[1500px] mx-auto px-2 md:px-4 flex items-center h-[39px] gap-0 overflow-x-auto no-scrollbar">
                    <button className="flex items-center gap-1 px-3 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm text-sm font-bold flex-shrink-0 mr-1">
                        <Menu size={18} /> All
                    </button>
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.href}
                            className="px-3 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm text-sm whitespace-nowrap flex-shrink-0"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMobileMenuOpen(false)} />
                    <div className="fixed top-0 left-0 w-[300px] h-full bg-white z-50 animate-slideIn overflow-y-auto">
                        <div style={{ backgroundColor: '#232f3e' }} className="px-4 py-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#eaeded] flex items-center justify-center">
                                <span className="text-[#232f3e] font-bold text-sm">
                                    {isAuthenticated ? user?.fullName[0] : '?'}
                                </span>
                            </div>
                            <span className="text-white font-bold text-lg">
                                Hello, {isAuthenticated ? user?.fullName.split(' ')[0] : 'Sign In'}
                            </span>
                            <button className="ml-auto text-white" onClick={() => setMobileMenuOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="py-2">
                            <p className="px-4 py-2 font-bold text-lg text-[#111]">Shop By Category</p>
                            {categories.slice(1).map(cat => (
                                <Link key={cat} to={`/products?cat=${cat}`} className="block px-4 py-2.5 text-[#111] hover:bg-[#eaeded] text-sm" onClick={() => setMobileMenuOpen(false)}>
                                    {cat}
                                </Link>
                            ))}
                            <div className="border-t my-2" />
                            {!isAuthenticated && (
                                <Link to="/login" className="block px-4 py-2.5 text-[#111] hover:bg-[#eaeded] font-bold" onClick={() => setMobileMenuOpen(false)}>
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </>
            )}
        </header>
    );
};

export default Navbar;
