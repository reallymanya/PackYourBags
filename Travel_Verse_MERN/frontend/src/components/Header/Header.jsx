import React, { useContext, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UserIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { display: "Home", path: "/" },
    { display: "About", path: "/about" },
    { display: "Tours", path: "/tours" },
  ];

  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center gap-2 group no-underline hover:no-underline">
              <div className="bg-sky-500 rounded-full p-2 transition-transform group-hover:scale-110">
                <i className="ri-plane-fill text-white text-xl"></i> 
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                TravelVerse
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item, idx) => (
              <NavLink 
                key={idx}
                to={item.path} 
                className={({ isActive }) => 
                  `text-base font-semibold transition-colors duration-200 no-underline hover:no-underline ${isActive ? 'text-sky-500' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg'}`
                }
              >
                {item.display}
              </NavLink>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
             {user ? (
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-full transition-colors">
                        {user.profilePic ? (
                            <img src={user.profilePic} alt="Profile" className="h-9 w-9 rounded-full object-cover border border-gray-200" />
                        ) : (
                            <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
                                <UserIcon className="h-5 w-5 text-gray-500" />
                            </div>
                        )}
                        <span className="font-semibold text-gray-700 text-sm hidden lg:block">{user.username}</span>
                    </div>

                    <Link to="/my-bookings" className="text-sm font-semibold text-gray-700 hover:text-black no-underline hover:no-underline">
                        Bookings
                    </Link>

                    <button
                      onClick={logout}
                      className="bg-black text-white hover:bg-gray-800 px-5 py-2.5 rounded-full text-sm font-bold transition-all"
                    >
                      Sign out
                    </button>
                </div>
             ) : (
                <>
                    <Link to="/login" className="font-bold text-gray-900 hover:bg-gray-100 px-4 py-2.5 rounded-full transition-colors text-sm no-underline hover:no-underline">
                        Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="bg-black text-white hover:bg-gray-800 px-5 py-2.5 rounded-full text-sm font-bold transition-all no-underline hover:no-underline"
                    >
                      Register
                    </Link>
                </>
             )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-900 focus:outline-none p-2"
            >
                <i className={`ri-${isMenuOpen ? 'close-line' : 'menu-line'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-2">
                {navigation.map((item, idx) => (
                    <NavLink 
                        key={idx}
                        to={item.path}
                        className={({ isActive }) => 
                            `block px-4 py-3 rounded-lg text-base font-medium no-underline hover:no-underline ${isActive ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
                        }
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {item.display}
                    </NavLink>
                ))}
                 <div className="border-t border-gray-100 my-2 pt-2">
                    {user ? (
                         <>
                            <div className="px-4 py-2 font-semibold text-gray-900 flex items-center gap-2">
                                <UserIcon className="h-5 w-5" /> 
                                {user.username}
                            </div>
                            <Link to="/my-bookings" className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg no-underline hover:no-underline">My Bookings</Link>
                            <button onClick={logout} className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium">Sign out</button>
                         </>
                    ) : (
                         <div className="flex flex-col gap-2 p-2">
                            <Link to="/login" className="block text-center w-full border border-gray-900 text-gray-900 px-4 py-2.5 rounded-full font-bold no-underline hover:no-underline">Sign in</Link>
                            <Link to="/register" className="block text-center w-full bg-black text-white px-4 py-2.5 rounded-full font-bold">Register</Link>
                         </div>
                    )}
                 </div>
            </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
