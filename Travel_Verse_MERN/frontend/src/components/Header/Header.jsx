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
      <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-gray-800/70 border-b border-gray-200 dark:border-gray-700 drop-shadow-xl">
        <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-4">
            <a href="/">
              <img src={Logo} width={120} height={40} alt="TravelVerse" className="dark:invert" /> {/* Logo adjusts for dark mode */}
            </a>
            <div className="md:hidden">
              <button className="hover:text-green-500" onClick={() => setState(!state)}>
                {state ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className={`flex-1 mt-8 md:block md:pb-0 md:mt-0 transition-all duration-300 ${state ? 'block' : 'hidden'}`}>
            <ul className="justify-end items-center pt-1 space-y-6 md:flex md:space-x-6 md:space-y-0">
              {navigation.map((item, idx) => (
                <li key={idx} className="hover:text-indigo-600 font-semibold px-2 dark:hover:text-indigo-400">
                  <NavLink to={item.path} className="block no-underline font-bold  text-gray-900 dark:invert hover:text-indigo-600 transition-colors duration-300">
                    {item.display}
                  </NavLink>
                </li>
              ))}
              <span className="hidden w-px h-6 bg-gray-500 md:block dark:bg-gray-600 "> </span>

              <div className="space-y-3 items-center gap-x-4 md:flex md:space-y-0">
                {user ? (
                  <>
                   <h5 className="flex-auto justify-items-center mx-4 flex items-center gap-2 text-black dark:invert">
  {user.profilePic ? (
    <img
      src={user.profilePic} // Assuming profilePic stores the Google profile image URL
      alt="User Profile"
      className="h-8 w-8 rounded-full"
    />
  ) : (
    <UserIcon className="h-6 w-6 text-black " />
  )}
  {user.username}
</h5>
                    <Link
                      to="/"
                      className="block py-2 px-3 font-medium text-center bg-red-600 hover:bg-red-500 active:bg-red-700 text-white no-underline rounded-lg shadow md:inline transition-colors duration-300"
                      onClick={logout}
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <li className="hidden md:block border-none">
                      <Link to="/login" className="block py-2 px-4 font-medium text-center bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white no-underline rounded-lg shadow md:inline transition-colors duration-300">
                        Log in
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="block py-2 px-4 font-medium text-center bg-green-600 hover:bg-green-500 active:bg-green-700 text-white no-underline rounded-lg shadow md:inline transition-colors duration-300"
                      >
                        Sign up
                      </Link>
                    </li>
                  </>
                )}
                <div className='rounded'>
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
