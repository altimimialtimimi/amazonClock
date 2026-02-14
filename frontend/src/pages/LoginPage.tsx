import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await client.post('/auth/login', { email, password });
            login(res.data.token, res.data.user);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center pt-4" style={{ backgroundColor: '#fff' }}>
            {/* Logo */}
            <Link to="/" className="mb-4">
                <span className="text-3xl font-bold">
                    <span className="text-[#ff9900]">Fresh</span><span className="text-[#0f1111]">Market</span>
                </span>
            </Link>

            {/* Login Card */}
            <div className="w-[350px] border border-[#ddd] rounded-lg p-6 mb-4">
                <h1 className="text-[28px] font-normal text-[#111] mb-4">Sign in</h1>

                {error && (
                    <div className="bg-[#fff5f5] border border-[#d00] rounded p-3 mb-4 text-sm text-[#c40000] flex items-start gap-2">
                        <span className="text-[#c40000] font-bold">!</span>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="text-[13px] font-bold text-[#111] block mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-[6px] border border-[#a6a6a6] rounded-[3px] text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between mb-1">
                            <label className="text-[13px] font-bold text-[#111]">Password</label>
                            <a href="#" className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline">
                                Forgot password?
                            </a>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-[6px] border border-[#a6a6a6] rounded-[3px] text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-amazon-primary py-2 text-[13px] mb-4"
                    >
                        Sign in
                    </button>
                </form>

                <p className="text-[12px] text-[#111]">
                    By continuing, you agree to FreshMarket's{' '}
                    <a href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Conditions of Use</a>{' '}
                    and{' '}
                    <a href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Privacy Notice</a>.
                </p>
            </div>

            {/* Divider */}
            <div className="w-[350px] flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-[#e7e7e7]" />
                <span className="text-[12px] text-[#767676]">New to FreshMarket?</span>
                <div className="flex-1 h-px bg-[#e7e7e7]" />
            </div>

            {/* Create account */}
            <Link
                to="/register"
                className="w-[350px] block text-center py-2 bg-white border border-[#a2a6ac] rounded-lg text-[13px] text-[#0f1111] hover:bg-[#f7fafa] transition mb-8"
            >
                Create your FreshMarket account
            </Link>

            {/* Bottom footer */}
            <div className="w-full border-t bg-gradient-to-b from-[#f7f7f7] to-[#fff] pt-4 pb-8">
                <div className="flex justify-center gap-6 text-[11px] text-[#555]">
                    <a href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Conditions of Use</a>
                    <a href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Privacy Notice</a>
                    <a href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Help</a>
                </div>
                <p className="text-center text-[11px] text-[#555] mt-2">
                    © 1996-{new Date().getFullYear()}, FreshMarket.com, Inc. or its affiliates
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
