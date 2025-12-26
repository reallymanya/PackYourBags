import React, { useContext, useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UserIcon, MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigation = [
    { display: "Home", path: "/home", icon: "ri-home-4-line" },
    { display: "Tours", path: "/tours", icon: "ri-map-2-line" },
    { display: "About", path: "/about", icon: "ri-information-line" },
  ];

  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/home');
    setShowUserMenu(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50'
          : 'bg-white/80 backdrop-blur-sm border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section with Animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 flex items-center"
          >
            <Link to="/home" className="flex items-center gap-3 group no-underline hover:no-underline">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-sky-500 via-blue-500 to-purple-600 rounded-xl p-2.5 shadow-lg group-hover:shadow-xl transition-shadow">
                  <i className="ri-plane-fill text-white text-xl"></i>
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                  TravelVerse
                </span>
                <p className="text-xs text-gray-500 -mt-1">Explore the World</p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation with Icons */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 no-underline hover:no-underline group ${
                    isActive
                      ? 'text-sky-600 bg-sky-50'
                      : 'text-gray-600 hover:text-sky-600 hover:bg-gray-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2">
                      <i className={`${item.icon} text-lg`}></i>
                      <span>{item.display}</span>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-sky-50 rounded-lg -z-10"
                        initial={false}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {/* Search Icon */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-600 hover:text-sky-600 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => navigate('/tours')}
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </motion.button>

                {/* Notifications */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative p-2 text-gray-600 hover:text-sky-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <BellIcon className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </motion.button>

                {/* User Menu */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt="Profile"
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-sky-200"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                        {user.username?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="font-semibold text-gray-700 text-sm hidden lg:block">
                      {user.username}
                    </span>
                    <i className="ri-arrow-down-s-line text-gray-500"></i>
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                      >
                        <div className="py-2">
                          <Link
                            to="/my-bookings"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors no-underline hover:no-underline"
                          >
                            <i className="ri-calendar-check-line text-lg"></i>
                            <span>My Bookings</span>
                          </Link>
                          <Link
                            to="/itinerary-planner"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors no-underline hover:no-underline"
                          >
                            <i className="ri-map-pin-line text-lg"></i>
                            <span>Itinerary Planner</span>
                          </Link>
                          <Link
                            to="/budget-planner"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors no-underline hover:no-underline"
                          >
                            <i className="ri-wallet-3-line text-lg"></i>
                            <span>Budget Planner</span>
                          </Link>
                          {user.role === 'admin' && (
                            <Link
                              to="/admin"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-sky-600 hover:bg-sky-50 font-semibold transition-colors no-underline hover:no-underline border-t border-gray-100"
                            >
                              <i className="ri-admin-line text-lg"></i>
                              <span>Admin Panel</span>
                            </Link>
                          )}
                          <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                          >
                            <i className="ri-logout-box-line text-lg"></i>
                            <span>Sign out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-sky-600 hover:bg-gray-50 rounded-lg transition-all no-underline hover:no-underline"
                >
                  Sign in
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="inline-block px-5 py-2.5 bg-gradient-to-r from-sky-500 to-purple-600 text-white text-sm font-bold rounded-lg shadow-md hover:shadow-lg transition-all no-underline hover:no-underline"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {user && (
              <Link
                to="/tours"
                className="p-2 text-gray-600 hover:text-sky-600 rounded-full"
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </Link>
            )}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none rounded-lg hover:bg-gray-100"
            >
              <i className={`ri-${isMenuOpen ? 'close-line' : 'menu-line'} text-2xl`}></i>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navigation.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium no-underline hover:no-underline transition-colors ${
                        isActive
                          ? 'bg-sky-50 text-sky-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className={`${item.icon} text-xl`}></i>
                    <span>{item.display}</span>
                  </NavLink>
                </motion.div>
              ))}
              <div className="border-t border-gray-100 my-2 pt-2">
                {user ? (
                  <>
                    <div className="px-4 py-3 font-semibold text-gray-900 flex items-center gap-3">
                      {user.profilePic ? (
                        <img
                          src={user.profilePic}
                          alt="Profile"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {user.username?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div>{user.username}</div>
                        <div className="text-xs text-gray-500 font-normal">{user.email}</div>
                      </div>
                    </div>
                    <Link
                      to="/my-bookings"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg no-underline hover:no-underline"
                    >
                      <i className="ri-calendar-check-line text-xl"></i>
                      <span>My Bookings</span>
                    </Link>
                    <Link
                      to="/itinerary-planner"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg no-underline hover:no-underline"
                    >
                      <i className="ri-map-pin-line text-xl"></i>
                      <span>Itinerary Planner</span>
                    </Link>
                    <Link
                      to="/budget-planner"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg no-underline hover:no-underline"
                    >
                      <i className="ri-wallet-3-line text-xl"></i>
                      <span>Budget Planner</span>
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sky-600 hover:bg-sky-50 rounded-lg font-semibold no-underline hover:no-underline"
                      >
                        <i className="ri-admin-line text-xl"></i>
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium"
                    >
                      <i className="ri-logout-box-line text-xl"></i>
                      <span>Sign out</span>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 p-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-center w-full border-2 border-gray-900 text-gray-900 px-4 py-3 rounded-lg font-bold no-underline hover:no-underline hover:bg-gray-50 transition-colors"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-center w-full bg-gradient-to-r from-sky-500 to-purple-600 text-white px-4 py-3 rounded-lg font-bold no-underline hover:no-underline shadow-md"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Header;
