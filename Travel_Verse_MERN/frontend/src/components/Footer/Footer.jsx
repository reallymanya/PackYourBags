import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo4.png'
import { BASE_URL } from '../../utils/config';

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
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
               <img src={logo} alt="logo" className="h-12" />
               <span className="text-2xl font-bold text-gray-800">TravelVerse</span>
            </Link>
            <p className="text-gray-500 leading-relaxed font-medium max-w-md mx-auto lg:mx-0">
              Crafting unforgettable journeys that inspire connection and respect for our beautiful planet. Your adventure awaits!
            </p>
          </div>

          {/* Newsletter Section - Expanded */}
          <div className="lg:w-1/2 w-full max-w-lg">
             <div className="bg-white p-8 rounded-3xl shadow-xl border border-sky-100">
                <div className="flex items-center gap-3 mb-3">
                  <i className="ri-mail-send-line text-2xl text-sky-500"></i>
                  <h5 className="font-bold text-xl text-gray-800">Join our Newsletter</h5>
                </div>
                <p className="text-gray-500 mb-6">Get travel inspiration, exclusive offers, and trip ideas delivered to your inbox.</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                        type="email" 
                        placeholder="Enter your email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-5 py-3 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all"
                    />
                    <button 
                        onClick={handleSubscribe}
                        className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-3 rounded-full shadow-md transition-all transform hover:-translate-y-0.5 hover:shadow-lg"
                    >
                        Subscribe
                    </button>
                </div>
                {message && (
                    <p className={`text-sm mt-3 text-center font-medium ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                        {message.text}
                    </p>
                )}
             </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-sky-100 flex justify-center items-center">
            <p className="text-gray-400 text-sm font-medium">
                &copy; {year} TravelVerse. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
