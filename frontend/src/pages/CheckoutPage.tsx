import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ChevronRight, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
    const { items, totalPrice, totalItems, clearCart } = useCart();
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const [shipping, setShipping] = useState({
        fullName: user?.fullName || '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
    });

    const [payment, setPayment] = useState({
        cardNumber: '',
        nameOnCard: '',
        expiry: '',
        cvv: '',
    });

    const deliveryFee = 0;
    const tax = +(totalPrice * 0.05).toFixed(2);
    const orderTotal = +(totalPrice + deliveryFee + tax).toFixed(2);

    const handlePlaceOrder = () => {
        setOrderPlaced(true);
        clearCart();
    };

    // Redirect if cart is empty and no order placed
    if (items.length === 0 && !orderPlaced) {
        return (
            <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#eaeded' }}>
                <Navbar />
                <div className="flex-1 max-w-[1000px] mx-auto px-4 py-12 w-full text-center">
                    <div className="bg-white p-8 rounded-sm">
                        <h1 className="text-2xl font-normal text-[#0f1111] mb-3">Your cart is empty</h1>
                        <p className="text-sm text-[#565959] mb-4">Add items to your cart before checking out.</p>
                        <Link to="/" className="btn-amazon-primary inline-block px-8 py-2 text-sm">Continue Shopping</Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Order confirmation
    if (orderPlaced) {
        return (
            <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#eaeded' }}>
                <Navbar />
                <div className="flex-1 max-w-[800px] mx-auto px-4 py-12 w-full">
                    <div className="bg-white p-8 rounded-sm text-center animate-fadeIn">
                        <div className="w-16 h-16 bg-[#067d62] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check size={32} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-normal text-[#067d62] mb-2">Order placed, thank you!</h1>
                        <p className="text-[#0f1111] text-lg mb-1">
                            Confirmation will be sent to <b>{shipping.fullName ? shipping.fullName : user?.email || 'your email'}</b>
                        </p>
                        <p className="text-sm text-[#565959] mb-6">
                            Order #{Math.random().toString(36).substring(2, 10).toUpperCase()} • Estimated delivery: 2–4 days
                        </p>
                        <div className="border-t pt-4 mb-6">
                            <p className="text-lg text-[#0f1111]">
                                Order Total: <b>${orderTotal}</b>
                            </p>
                        </div>
                        <Link
                            to="/"
                            className="btn-amazon-primary inline-block px-10 py-2.5 text-sm"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#eaeded' }}>
            {/* Checkout Header */}
            <div style={{ backgroundColor: '#f0f2f2' }} className="border-b shadow-sm">
                <div className="max-w-[1000px] mx-auto px-4 py-3 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold">
                        <span className="text-[#ff9900]">Fresh</span><span className="text-[#0f1111]">Market</span>
                    </Link>
                    <h1 className="text-[28px] font-normal text-[#0f1111]">
                        Checkout (<span className="text-[#007185]">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>)
                    </h1>
                    <Lock size={20} className="text-[#888]" />
                </div>
            </div>

            <div className="flex-1 max-w-[1000px] mx-auto px-4 py-6 w-full">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Main checkout form */}
                    <div className="flex-1">

                        {/* Step 1: Shipping */}
                        <div className={`bg-white rounded-sm mb-4 overflow-hidden ${step === 1 ? '' : 'opacity-90'}`}>
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#f7fafa]"
                                onClick={() => setStep(1)}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`text-lg font-bold ${step > 1 ? 'text-[#067d62]' : 'text-[#c45500]'}`}>1</span>
                                    <h2 className="text-lg font-bold text-[#0f1111]">Shipping address</h2>
                                </div>
                                {step > 1 && (
                                    <span className="text-[#007185] text-sm hover:text-[#c7511f] hover:underline">Change</span>
                                )}
                            </div>

                            {step === 1 && (
                                <div className="px-4 pb-4 border-t animate-fadeIn">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                        <div className="md:col-span-2">
                                            <label className="text-[13px] font-bold text-[#111] block mb-1">Full name</label>
                                            <input
                                                type="text"
                                                value={shipping.fullName}
                                                onChange={e => setShipping({ ...shipping, fullName: e.target.value })}
                                                className="w-full px-3 py-[6px] border border-[#a6a6a6] rounded-[3px] text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-[13px] font-bold text-[#111] block mb-1">Address</label>
                                            <input
                                                type="text"
                                                value={shipping.address}
                                                onChange={e => setShipping({ ...shipping, address: e.target.value })}
                                                placeholder="Street address or P.O. Box"
                                                className="w-full px-3 py-[6px] border border-[#a6a6a6] rounded-[3px] text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[13px] font-bold text-[#111] block mb-1">City</label>
                                            <input
                                                type="text"
                                                value={shipping.city}
                                                onChange={e => setShipping({ ...shipping, city: e.target.value })}
                                                className="w-full px-3 py-[6px] border border-[#a6a6a6] rounded-[3px] text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[13px] font-bold text-[#111] block mb-1">State / Province</label>
                                            <input
                                                type="text"
                                                value={shipping.state}
                                                onChange={e => setShipping({ ...shipping, state: e.target.value })}
                                                className="w-full px-3 py-[6px] border border-[#a6a6a6] rounded-[3px] text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[13px] font-bold text-[#111] block mb-1">ZIP Code</label>
                                            <input
                                                type="text"
                                                value={shipping.zip}
                                                onChange={e => setShipping({ ...shipping, zip: e.target.value })}
                                                className="w-full px-3 py-[6px] border border-[#a6a6a6] rounded-[3px] text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[13px] font-bold text-[#111] block mb-1">Phone number</label>
                                            <input
                                                type="tel"
                                                value={shipping.phone}
                                                onChange={e => setShipping({ ...shipping, phone: e.target.value })}
                                                className="w-full px-3 py-[6px] border border-[#a6a6a6] rounded-[3px] text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        className="btn-amazon-primary mt-4 px-8 py-2 text-sm"
                                        onClick={() => setStep(2)}
                                    >
                                        Use this address
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Step 2: Payment */}
                        <div className={`bg-white rounded-sm mb-4 overflow-hidden ${step < 2 ? 'opacity-50 pointer-events-none' : ''}`}>
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#f7fafa]"
                                onClick={() => step >= 2 && setStep(2)}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`text-lg font-bold ${step > 2 ? 'text-[#067d62]' : step === 2 ? 'text-[#c45500]' : 'text-[#888]'}`}>2</span>
                                    <h2 className="text-lg font-bold text-[#0f1111]">Payment method</h2>
                                </div>
                                {step > 2 && (
                                    <span className="text-[#007185] text-sm hover:text-[#c7511f] hover:underline">Change</span>
                                )}
                            </div>

                            {step === 2 && (
                                <div className="px-4 pb-4 border-t animate-fadeIn">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                        <div className="md:col-span-2">
                                            <label className="text-[13px] font-bold text-[#111] block mb-1">Card number</label>
                                            <input
                                                type="text"
                                                value={payment.cardNumber}
                                                onChange={e => setPayment({ ...payment, cardNumber: e.target.value })}
                                                placeholder="1234 5678 9012 3456"
                                                maxLength={19}
                                                className="w-full px-3 py-[6px] border border-[#a6a6a6] rounded-[3px] text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-[13px] font-bold text-[#111] block mb-1">Name on card</label>
                                            <input
                                                type="text"
                                                value={payment.nameOnCard}
                                                onChange={e => setPayment({ ...payment, nameOnCard: e.target.value })}
                                                className="w-full px-3 py-[6px] border border-[#a6a6a6] rounded-[3px] text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[13px] font-bold text-[#111] block mb-1">Expiration date</label>
                                            <input
                                                type="text"
                                                value={payment.expiry}
                                                onChange={e => setPayment({ ...payment, expiry: e.target.value })}
                                                placeholder="MM/YY"
                                                maxLength={5}
                                                className="w-full px-3 py-[6px] border border-[#a6a6a6] rounded-[3px] text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[13px] font-bold text-[#111] block mb-1">CVV</label>
                                            <input
                                                type="password"
                                                value={payment.cvv}
                                                onChange={e => setPayment({ ...payment, cvv: e.target.value })}
                                                maxLength={4}
                                                className="w-full px-3 py-[6px] border border-[#a6a6a6] rounded-[3px] text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        className="btn-amazon-primary mt-4 px-8 py-2 text-sm"
                                        onClick={() => setStep(3)}
                                    >
                                        Use this payment method
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Step 3: Review & Place Order */}
                        <div className={`bg-white rounded-sm mb-4 overflow-hidden ${step < 3 ? 'opacity-50 pointer-events-none' : ''}`}>
                            <div className="p-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`text-lg font-bold ${step === 3 ? 'text-[#c45500]' : 'text-[#888]'}`}>3</span>
                                    <h2 className="text-lg font-bold text-[#0f1111]">Review items and delivery</h2>
                                </div>

                                {step === 3 && (
                                    <div className="border-t pt-4 animate-fadeIn">
                                        <div className="bg-[#f0f2f2] rounded-sm p-3 mb-4">
                                            <p className="text-[#067d62] font-bold text-sm">
                                                Delivery: <span className="font-normal text-[#0f1111]">FREE — Estimated 2–4 business days</span>
                                            </p>
                                        </div>

                                        {items.map(({ product, quantity }) => (
                                            <div key={product.id} className="flex gap-3 py-3 border-b last:border-b-0">
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-contain flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-[#0f1111] line-clamp-1">{product.name}</p>
                                                    <p className="text-sm font-bold text-[#b12704]">${product.price.toFixed(2)}</p>
                                                    <p className="text-[12px] text-[#565959]">Qty: {quantity}</p>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="mt-4 pt-4 border-t">
                                            <button
                                                className="btn-amazon-primary w-full py-3 text-sm"
                                                onClick={handlePlaceOrder}
                                            >
                                                Place your order
                                            </button>
                                            <p className="text-[12px] text-[#565959] mt-2 text-center">
                                                By placing your order, you agree to FreshMarket's{' '}
                                                <a href="#" className="text-[#0066c0] hover:underline">privacy notice</a> and{' '}
                                                <a href="#" className="text-[#0066c0] hover:underline">conditions of use</a>.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="w-full lg:w-[300px]">
                        <div className="bg-white p-4 rounded-sm sticky top-4">
                            {step === 3 && (
                                <button
                                    className="btn-amazon-primary w-full py-2.5 text-sm mb-3"
                                    onClick={handlePlaceOrder}
                                >
                                    Place your order
                                </button>
                            )}

                            <h3 className="text-lg font-bold text-[#0f1111] mb-3 border-b pb-2">Order Summary</h3>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-[#565959]">Items ({totalItems}):</span>
                                    <span className="text-[#0f1111]">${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#565959]">Shipping & handling:</span>
                                    <span className="text-[#0f1111]">${deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-[#565959]">Estimated tax:</span>
                                    <span className="text-[#0f1111]">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between pt-1">
                                    <span className="text-lg font-bold text-[#b12704]">Order total:</span>
                                    <span className="text-lg font-bold text-[#b12704]">${orderTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
