import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo4.png'

const quickLinks = [
  { path: '/home', display: 'Home' },
  { path: '/about', display: 'About' },
  { path: '/tours', display: 'Tours' },
  { path: '/gallery', display: 'Gallery' },
  { path: '/login', display: 'Login' },
  { path: '/register', display: 'Register' },
];

const legalLinks = [
  { path: '/disclaimer', display: 'Disclaimer' },
  { path: '/terms', display: 'Terms of Use' },
  { path: '/privacy-policy', display: 'Privacy Policy' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 border-t-4 dark:border-t-black dark:bg-gray-800 text-black dark:text-white pt-8 pb-4 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          <div>
            <img src={logo} alt="logo" className='dark:invert'/>
            <h5 className="text-lg font-semibold mb-4 dark:text-white">About Us</h5>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Stay updated with the latest travel tips, exclusive offers, and destination guides. Join our community of travelers and never miss out on exciting adventures!
            </p>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold mb-4 dark:text-white">Quick Links</h5>
            <ul>
              {quickLinks.map((item, index) => (
                <li key={index} className="mb-2">
                  <Link to={item.path} className="hover:text-green-500 transition-all duration-200">
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold mb-4 dark:text-white">Contact</h5>
            <ul>
              <li className="mb-2 flex items-center gap-3 dark:text-white">
                <i className="ri-mail-line"></i>
                <span >Email: siddhant33@gmail.com</span>
              </li>
              <li className="mb-2 flex items-center gap-3 dark:text-white">
                <i className="ri-phone-line"></i>
                <span>Phone: +12345678</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="bg-gray-300 dark:bg-gray-700 p-6 rounded-lg shadow-md transition-colors duration-300">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Subscribe for Travel Updates
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Get the latest travel news, exclusive offers, and destination guides straight to your inbox!
            </p>
            <div className="flex gap-4 mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-2/3 p-3 rounded-lg border border-gray-400 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
              />
              <button className="bg-blue-400 dark:bg-orange-400 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-500 pt-4 text-center text-sm">
          <p className="mb-2">
            {legalLinks.map((item, index) => (
              <Link key={index} to={item.path} className="hover:text-green-500 transition-all duration-200 mx-2">
                {item.display}
              </Link>
            ))}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            &copy; {year}, Designed and Developed by <strong>Siddhant Gaikwad</strong>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
