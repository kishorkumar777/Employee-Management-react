import { Link } from "react-router-dom";
import { useState } from "react";
import { HiSun, HiMoon } from "react-icons/hi";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Toggle dark mode on html and body
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900"); // Dark background for body
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900"); // Light background for body
    }
    
  };

  return (
    <nav className={`bg-white dark:bg-gray-800 p-4 shadow-md`}>

      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-900 dark:text-white">
          <Link to="/">React Assignment</Link>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            {isDarkMode ? <HiSun size={24} /> : <HiMoon size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
