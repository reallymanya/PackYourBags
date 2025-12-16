import React, { useContext, useState } from 'react';
import Logo from '../../assets/images/logo4.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { UserIcon } from '@heroicons/react/24/outline'; // Import Heroicon for user

const Header = () => {
  const [state, setState] = useState(false);

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
    <>
      <nav className="sticky top-0 z-50 w-full transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-white/40 shadow-sm">
        <div className="items-center px-6 max-w-screen-xl mx-auto md:flex md:px-12">
          <div className="flex items-center justify-between py-3 md:py-5">
            <a href="/" className="text-2xl font-bold tracking-tight text-gray-700 hover:text-sky-400 transition-colors flex items-center gap-2">
              <span className="bg-sky-200 text-sky-600 rounded-full p-1.5 ">
                 <i className="ri-plane-fill"></i>
              </span>
              TravelVerse
            </a>
            <div className="md:hidden">
              <button className="text-gray-500 hover:text-sky-500 transition-colors" onClick={() => setState(!state)}>
                {state ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className={`flex-1 md:block md:pb-0 md:mt-0 transition-all duration-300 ${state ? 'block p-4 absolute top-16 left-0 right-0 bg-white shadow-lg rounded-b-3xl' : 'hidden'}`}>
            <ul className="justify-end items-center space-y-4 md:flex md:space-x-8 md:space-y-0">
              {navigation.map((item, idx) => (
                <li key={idx} className="font-medium">
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => 
                      `block px-4 py-2 rounded-full transition-all duration-300 hover:bg-sky-50 hover:text-sky-600 text-gray-600 ${isActive ? 'bg-sky-100 text-sky-700 font-semibold shadow-sm' : ''}`
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
              
              <div className="flex items-center gap-4 flex-col md:flex-row mt-4 md:mt-0">
                {user ? (
                  <>
                   <h5 className="flex items-center gap-2 text-gray-700 font-semibold bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                    {user.profilePic ? (
                        <img src={user.profilePic} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
                    ) : (
                        <UserIcon className="h-5 w-5 text-gray-400" />
                    )}
                    {user.username}
                   </h5>
                    <Link to="/my-bookings" className="text-sm font-semibold text-sky-600 hover:text-sky-700 hover:bg-sky-50 px-4 py-2 rounded-full transition-all">
                      My Bookings
                    </Link>
                    <button
                      className="text-sm font-semibold text-rose-500 hover:bg-rose-50 px-4 py-2 rounded-full transition-all"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-gray-600 hover:text-sky-600 font-semibold px-4 py-2">
                       Log in
                    </Link>
                    <Link
                      to="/register"
                      className="bg-sky-300 text-white hover:bg-sky-400 px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all font-semibold transform hover:-translate-y-0.5"
                    >
                      Sign up
                    </Link>
                  </>
                )}
                 {/* Hidden ThemeToggle as per soft aesthetic usually being light mode focused */}
                 <div className="hidden"> 
                    <ThemeToggle />
                 </div>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
