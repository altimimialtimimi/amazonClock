import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const { items, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
    const navigate = useNavigate();

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#eaeded' }}>
                <Navbar />
                <div className="flex-1 max-w-[1500px] mx-auto px-4 py-8 w-full">
                    <div className="bg-white p-8 rounded-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <ShoppingCart size={48} className="text-[#c7c7c7]" />
                            <div>
                                <h1 className="text-[28px] font-normal text-[#0f1111]">Your FreshMarket Cart is empty</h1>
                                <p className="text-sm text-[#565959] mt-1">
                                    Check your Saved for later items below or{' '}
                                    <Link to="/" className="text-[#007185] hover:text-[#c7511f] hover:underline">continue shopping</Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#eaeded' }}>
            <Navbar />
            <div className="flex-1 max-w-[1500px] mx-auto px-4 py-6 w-full">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Cart Items */}
                    <div className="flex-1">
                        <div className="bg-white p-6 rounded-sm">
                            <div className="flex items-center justify-between border-b pb-4 mb-4">
                                <h1 className="text-[28px] font-normal text-[#0f1111]">Shopping Cart</h1>
                                <button
                                    onClick={clearCart}
                                    className="text-[#007185] text-sm hover:text-[#c7511f] hover:underline"
                                >
                                    Deselect all items
                                </button>
                            </div>
                            <p className="text-right text-[#565959] text-sm mb-2">Price</p>

                            {items.map(({ product, quantity }) => (
                                <div key={product.id} className="flex gap-4 py-4 border-b last:border-b-0 animate-fadeIn">
                                    {/* Image */}
                                    <div className="w-[180px] h-[180px] flex-shrink-0 flex items-center justify-center">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1">
                                        <h3 className="text-lg text-[#0f1111] leading-6 hover:text-[#c7511f] cursor-pointer">
                                            {product.name}
                                        </h3>
                                        <p className="text-[#067d62] text-sm font-bold mt-1">In Stock</p>
                                        <p className="text-[12px] text-[#565959] mt-1">
                                            <span className="text-[#007185] font-bold italic text-[11px] tracking-tight">
                                                fresh<span className="text-[#f08804]">PRIME</span>
                                            </span>{' '}
                                            FREE delivery
                                        </p>

                                        {/* Quantity & Actions */}
                                        <div className="flex items-center gap-3 mt-3 flex-wrap">
                                            <div className="flex items-center border border-[#d5d9d9] rounded-lg overflow-hidden shadow-sm">
                                                <button
                                                    onClick={() => updateQuantity(product.id, quantity - 1)}
                                                    className="px-3 py-1.5 bg-[#f0f2f2] hover:bg-[#e3e6e6] transition border-r border-[#d5d9d9]"
                                                >
                                                    {quantity === 1 ? <Trash2 size={16} className="text-[#555]" /> : <Minus size={16} className="text-[#555]" />}
                                                </button>
                                                <span className="px-4 py-1.5 text-sm font-bold text-[#0f1111] bg-white min-w-[40px] text-center">
                                                    {quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(product.id, quantity + 1)}
                                                    className="px-3 py-1.5 bg-[#f0f2f2] hover:bg-[#e3e6e6] transition border-l border-[#d5d9d9]"
                                                >
                                                    <Plus size={16} className="text-[#555]" />
                                                </button>
                                            </div>

                                            <span className="text-[#d5d9d9]">|</span>
                                            <button
                                                onClick={() => removeFromCart(product.id)}
                                                className="text-[#007185] text-sm hover:text-[#c7511f] hover:underline"
                                            >
                                                Delete
                                            </button>
                                            <span className="text-[#d5d9d9]">|</span>
                                            <button className="text-[#007185] text-sm hover:text-[#c7511f] hover:underline">
                                                Save for later
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right flex-shrink-0">
                                        <span className="text-lg font-bold text-[#0f1111]">
                                            ${(product.price * quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            <div className="text-right pt-4">
                                <span className="text-lg text-[#0f1111]">
                                    Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):{' '}
                                    <span className="font-bold">${totalPrice.toFixed(2)}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="w-full lg:w-[300px]">
                        <div className="bg-white p-4 rounded-sm sticky top-[110px]">
                            <div className="flex items-start gap-2 mb-3">
                                <span className="text-[#067d62] text-sm mt-0.5">✓</span>
                                <p className="text-sm text-[#067d62]">
                                    Your order qualifies for <b>FREE delivery</b>. Choose this option at checkout.
                                </p>
                            </div>

                            <p className="text-lg text-[#0f1111] mb-4">
                                Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):{' '}
                                <span className="font-bold">${totalPrice.toFixed(2)}</span>
                            </p>

                            <button className="w-full btn-amazon-primary py-2.5 text-sm mb-2" onClick={() => navigate('/checkout')}>
                                Proceed to checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CartPage;
