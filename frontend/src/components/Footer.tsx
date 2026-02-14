import React from 'react';
import { Link } from 'react-router-dom';

const footerSections = [
    {
        title: 'Get to Know Us',
        links: ['Careers', 'Blog', 'About FreshMarket', 'Investor Relations', 'FreshMarket Devices'],
    },
    {
        title: 'Make Money with Us',
        links: ['Sell products on FreshMarket', 'Become an Affiliate', 'Advertise Your Products', 'Self-Publish', 'Host a FreshMarket Hub'],
    },
    {
        title: 'FreshMarket Payment',
        links: ['FreshMarket Visa', 'Shop with Points', 'Reload Your Balance', 'Currency Converter'],
    },
    {
        title: 'Let Us Help You',
        links: ['FreshMarket and COVID-19', 'Your Account', 'Your Orders', 'Shipping Rates & Policies', 'Returns & Replacements', 'Help'],
    },
];

const Footer = () => {
    return (
        <footer>
            {/* Back to top */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full py-3 text-white text-sm hover:bg-[#37475a] transition-colors"
                style={{ backgroundColor: '#37475a' }}
            >
                Back to top
            </button>

            {/* Main footer */}
            <div style={{ backgroundColor: '#232f3e' }} className="text-white">
                <div className="max-w-[1500px] mx-auto px-8 py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {footerSections.map((section) => (
                            <div key={section.title}>
                                <h4 className="font-bold text-base mb-3">{section.title}</h4>
                                <ul className="space-y-2">
                                    {section.links.map((link) => (
                                        <li key={link}>
                                            <Link to="#" className="text-[#ddd] text-sm hover:underline">
                                                {link}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#3a4553]" />

                {/* Logo section */}
                <div className="max-w-[1500px] mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-center gap-4">
                    <span className="text-xl font-bold">
                        <span className="text-[#ff9900]">Fresh</span>Market
                    </span>
                    <span className="text-[#999] text-sm">© {new Date().getFullYear()} FreshMarket. All rights reserved.</span>
                </div>
            </div>

            {/* Bottom bar */}
            <div style={{ backgroundColor: '#131a22' }} className="text-white py-3">
                <div className="max-w-[1500px] mx-auto px-8 flex flex-wrap justify-center gap-4 text-[12px] text-[#999]">
                    <Link to="#" className="hover:underline">Conditions of Use</Link>
                    <Link to="#" className="hover:underline">Privacy Notice</Link>
                    <Link to="#" className="hover:underline">Consumer Health Data Privacy Disclosure</Link>
                    <Link to="#" className="hover:underline">Your Ads Privacy Choices</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
