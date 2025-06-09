"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import AuthButton from "./AuthButton";

const Navbar = ({ onSearch, onCategoryFilter, selectedCategory }) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [realCategories, setRealCategories] = useState([]);

  const books = useSelector((state) => state.books.data);
  const loading = useSelector((state) => state.books.loading);

  const cartItems_ = useSelector((state) => state.cart.items);
  const cartItems = cartItems_ ? cartItems_.length : 0;

  useEffect(() => {
    if (books && books.length > 0) {
      const genres = books
        .map((book) => book.genre)
        .filter(Boolean) // Remove null/undefined values
        .filter((genre, index, arr) => arr.indexOf(genre) === index) // Remove duplicates
        .sort(); // Sort alphabetically

      setRealCategories(["All", ...genres]); // Add "All" option at the beginning
    }
  }, [books]);

  // Handle search input
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Call the search function passed from parent component
    if (onSearch) {
      onSearch(query);
    }
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    if (onCategoryFilter) {
      onCategoryFilter(category === "All" ? "" : category);
    }
  };

  // Handle search submit (Enter key or search button)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <span className="text-white font-bold text-xl">📚</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BookHaven
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Navigation links can be added here if needed */}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-sm mx-8">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search for books, authors..."
                  className="w-full px-4 py-2 pl-10 pr-4 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-2.5 text-gray-400 text-lg hover:text-blue-600 transition-colors"
                >
                  🔍
                </button>
              </form>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <AuthButton />

              <button
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => router.push("/Cart")}
              >
                <span className="text-2xl">🛒</span>
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 text-2xl"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-1">
              <form onSubmit={handleSearchSubmit} className="relative mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search for books..."
                  className="w-full px-4 py-2 pl-10 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-2.5 text-gray-400 text-lg hover:text-blue-600 transition-colors"
                >
                  🔍
                </button>
              </form>
              <button
                onClick={() => router.push("/auth")}
                className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
              >
                Sign Up
              </button>
              <AuthButton />
            </div>
          </div>
        )}
      </nav>

      {/* Real Categories Bar */}
      <div className="bg-white border-gray-300 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex py-4">
              <div className="animate-pulse flex space-x-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 h-8 w-20 rounded-full"
                  ></div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex overflow-x-auto py-4 space-x-6 scrollbar-hide">
              {realCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(category)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full transition-colors flex-shrink-0 ${
                    (selectedCategory === "" && category === "All") ||
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 hover:bg-blue-100 hover:text-blue-600"
                  }`}
                >
                  {category}
                  {books && (
                    <span className="ml-2 text-xs opacity-70">
                      {category === "All"
                        ? books.length
                        : books.filter((book) => book.genre === category)
                            .length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
