import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';

const RegisterPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const res = await client.post('/auth/register', { fullName, email, password });
            login(res.data.token, res.data.user);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
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

            {/* Register Card */}
            <div className="w-[350px] border border-[#ddd] rounded-lg p-6 mb-4">
                <h1 className="text-[28px] font-normal text-[#111] mb-4">Create account</h1>

                {error && (
                    <div className="bg-[#fff5f5] border border-[#d00] rounded p-3 mb-4 text-sm text-[#c40000] flex items-start gap-2">
                        <span className="text-[#c40000] font-bold">!</span>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="text-[13px] font-bold text-[#111] block mb-1">Your name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="First and last name"
                            className="w-full px-3 py-[6px] border border-[#a6a6a6] rounded-[3px] text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
                            required
                        />
                    </div>

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

                    <div className="mb-3">
                        <label className="text-[13px] font-bold text-[#111] block mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="At least 6 characters"
                            className="w-full px-3 py-[6px] border border-[#a6a6a6] rounded-[3px] text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
                            required
                        />
                        <p className="text-[12px] text-[#2b2b2b] mt-1">ℹ Passwords must be at least 6 characters.</p>
                    </div>

                    <div className="mb-4">
                        <label className="text-[13px] font-bold text-[#111] block mb-1">Re-enter password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-[6px] border border-[#a6a6a6] rounded-[3px] text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-amazon-primary py-2 text-[13px] mb-4"
                    >
                        Create your FreshMarket account
                    </button>
                </form>

                <p className="text-[12px] text-[#111] mb-4">
                    By creating an account, you agree to FreshMarket's{' '}
                    <a href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Conditions of Use</a>{' '}
                    and{' '}
                    <a href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Privacy Notice</a>.
                </p>

                <div className="border-t pt-4">
                    <p className="text-[13px] text-[#111]">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>

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

export default RegisterPage;
