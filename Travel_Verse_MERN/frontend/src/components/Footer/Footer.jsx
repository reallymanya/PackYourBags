import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo4.png'
import { BASE_URL } from '../../utils/config';

const quickLinks = [
  { path: '/home', display: 'Home' },
  { path: '/about', display: 'About' },
  { path: '/tours', display: 'Tours' },
];

const legalLinks = [
  { path: '/privacy-policy', display: 'Privacy Policy' },
  { path: '/terms', display: 'Terms of Use' },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
        setMessage({ type: 'error', text: 'Please enter a valid email.' });
        return;
    }

    try {
        const res = await fetch(`${BASE_URL}/subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const result = await res.json();

        if (res.ok) {
            setMessage({ type: 'success', text: result.message });
            setEmail('');
        } else {
            setMessage({ type: 'error', text: result.message });
        }
    } catch (err) {
        setMessage({ type: 'error', text: 'Something went wrong. Try again.' });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-sky-50 to-white pt-16 pb-8 border-t border-sky-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="lg:w-1/3 space-y-4">
            <Link to="/" className="flex items-center gap-2 mb-4">
               <img src={logo} alt="logo" className="h-10" />
               <span className="text-xl font-bold text-gray-800">TravelVerse</span>
            </Link>
            <p className="text-gray-500 leading-relaxed font-medium max-w-sm">
              Crafting unforgettable journeys that inspire connection and respect for our beautiful planet.
            </p>
            
            <div className="flex gap-4 mt-6">
                <i className="ri-instagram-line bg-sky-100 text-sky-600 p-2 rounded-full hover:bg-sky-200 transition-colors cursor-pointer"></i>
                <i className="ri-twitter-x-line bg-sky-100 text-sky-600 p-2 rounded-full hover:bg-sky-200 transition-colors cursor-pointer"></i>
                <i className="ri-facebook-fill bg-sky-100 text-sky-600 p-2 rounded-full hover:bg-sky-200 transition-colors cursor-pointer"></i>
            </div>
          </div>
          
          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8 lg:w-1/3">
             <div>
                 <h5 className="font-bold text-gray-800 mb-6">Discovery</h5>
                 <ul className="space-y-3">
                     {quickLinks.map((item, index) => (
                         <li key={index}>
                             <Link to={item.path} className="text-gray-500 hover:text-sky-500 font-medium transition-colors no-underline">
                                 {item.display}
                             </Link>
                         </li>
                     ))}
                 </ul>
             </div>
             <div>
                 <h5 className="font-bold text-gray-800 mb-6">Support</h5>
                 <ul className="space-y-3">
                     <li><Link to="/contact" className="text-gray-500 hover:text-sky-500 font-medium transition-colors no-underline">Contact Us</Link></li>
                     <li><Link to="/faq" className="text-gray-500 hover:text-sky-500 font-medium transition-colors no-underline">FAQ</Link></li>
                 </ul>
             </div>
          </div>

          {/* Newsletter Section - Soft Card */}
          <div className="lg:w-1/3">
             <div className="bg-white p-8 rounded-[32px] shadow-lg border border-sky-50">
                <h5 className="font-bold text-gray-800 mb-2">Join our Newsletter</h5>
                <p className="text-gray-400 text-sm mb-6">Get travel inspiration & exclusive offers.</p>
                
                <div className="flex flex-col gap-3">
                    <input 
                        type="email" 
                        placeholder="Your email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-6 py-3 rounded-full bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all text-sm"
                    />
                    <button 
                        onClick={handleSubscribe}
                        className="w-full bg-sky-400 hover:bg-sky-500 text-white font-bold py-3 rounded-full shadow-sm transition-all transform hover:-translate-y-0.5"
                    >
                        Subscribe
                    </button>
                    {message && (
                        <p className={`text-sm mt-2 text-center font-medium ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                            {message.text}
                        </p>
                    )}
                </div>
             </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-sky-100 flex flex-col md:flex-row justify-between items-center bg-transparent gap-4">
            <p className="text-gray-400 text-sm font-medium">
                &copy; {year} TravelVerse. All rights reserved.
            </p>
            <div className="flex gap-6">
                 {legalLinks.map((item, index) => (
                     <Link key={index} to={item.path} className="text-gray-400 hover:text-sky-500 text-sm font-medium transition-colors">
                         {item.display}
                     </Link>
                 ))}
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
