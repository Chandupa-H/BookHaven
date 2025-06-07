"use client";
import React, { useState, useMemo } from "react";

const str =
  "https://w0.peakpx.com/wallpaper/782/815/HD-wallpaper-outrun-ultra-background-for-widescreen-ultrawide-laptop-multi-display-dual-triple-monitor-tablet-smartphone-2736x1824.jpg";

// Book Card Component
const BookCard = ({ book, onAddToCart, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden">
      <div className="relative">
        <img
          //change the image
          src={str}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {book.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{book.discount}%
          </div>
        )}
        {book.isNew && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            New
          </div>
        )}
        <button
          onClick={() => onViewDetails(book)}
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          <span className="bg-white text-gray-800 px-4 py-2 rounded-full font-semibold transform scale-90 group-hover:scale-100 transition-transform">
            Quick View
          </span>
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 text-sm">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${i < book.rating ? "★" : "☆"}`}
              >
                {i < book.rating ? "★" : "☆"}
              </span>
            ))}
          </div>
          <span className="text-gray-500 text-sm ml-2">({book.reviews})</span>
        </div>

        <h3 className="font-bold text-gray-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3">{book.author}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">
              ${book.price}
            </span>
            {book.originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                ${book.originalPrice}
              </span>
            )}
          </div>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {book.format}
          </span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onAddToCart(book)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm"
          >
            Add to Cart
          </button>
          <button
            onClick={() => onViewDetails(book)}
            className="px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
          >
            👁️
          </button>
        </div>
      </div>
    </div>
  );
};

// Price Range Slider Component
const PriceRangeSlider = ({ min, max, value, onChange }) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-gray-600">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => onChange([parseInt(e.target.value), value[1]])}
          className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => onChange([value[0], parseInt(e.target.value)])}
          className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

// Main Category Page Component
const CategoryPage = () => {
  const [filters, setFilters] = useState({
    priceRange: [0, 100],
    authors: [],
    minRating: 0,
    formats: [],
    publishers: [],
  });

  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 12;

  // Sample data
  const categoryInfo = {
    name: "Science Fiction",
    description:
      "Explore the future with our collection of mind-bending science fiction novels",
    banner: "/api/placeholder/1200/300",
  };

  const allBooks = [
    {
      id: 1,
      title: "Dune",
      author: "Frank Herbert",
      price: 24.99,
      originalPrice: 29.99,
      rating: 5,
      reviews: 1234,
      image: "/api/placeholder/300/400",
      format: "Paperback",
      publisher: "Ace Books",
      year: 2023,
      discount: 17,
      isNew: false,
    },
    {
      id: 2,
      title: "The Martian",
      author: "Andy Weir",
      price: 19.99,
      rating: 5,
      reviews: 892,
      image: "/api/placeholder/300/400",
      format: "Hardcover",
      publisher: "Crown",
      year: 2024,
      isNew: true,
    },
    {
      id: 3,
      title: "Foundation",
      author: "Isaac Asimov",
      price: 22.99,
      originalPrice: 27.99,
      rating: 4,
      reviews: 567,
      image: "/api/placeholder/300/400",
      format: "eBook",
      publisher: "Bantam",
      year: 2023,
      discount: 18,
    },
    {
      id: 4,
      title: "Neuromancer",
      author: "William Gibson",
      price: 18.99,
      rating: 4,
      reviews: 445,
      image: "/api/placeholder/300/400",
      format: "Paperback",
      publisher: "Ace Books",
      year: 2023,
    },
    {
      id: 5,
      title: "Ender's Game",
      author: "Orson Scott Card",
      price: 21.99,
      rating: 5,
      reviews: 1023,
      image: "/api/placeholder/300/400",
      format: "Hardcover",
      publisher: "Tor Books",
      year: 2024,
      isNew: true,
    },
    {
      id: 6,
      title: "The Left Hand of Darkness",
      author: "Ursula K. Le Guin",
      price: 16.99,
      originalPrice: 21.99,
      rating: 4,
      reviews: 334,
      image: "/api/placeholder/300/400",
      format: "Paperback",
      publisher: "Ace Books",
      year: 2023,
      discount: 23,
    },
    {
      id: 7,
      title: "Hyperion",
      author: "Dan Simmons",
      price: 25.99,
      rating: 5,
      reviews: 678,
      image: "/api/placeholder/300/400",
      format: "Hardcover",
      publisher: "Bantam",
      year: 2024,
    },
    {
      id: 8,
      title: "The Time Machine",
      author: "H.G. Wells",
      price: 14.99,
      rating: 4,
      reviews: 289,
      image: "/api/placeholder/300/400",
      format: "eBook",
      publisher: "Dover",
      year: 2023,
    },
  ];

  // Get unique values for filters
  const uniqueAuthors = [...new Set(allBooks.map((book) => book.author))];
  const uniqueFormats = [...new Set(allBooks.map((book) => book.format))];
  const uniquePublishers = [...new Set(allBooks.map((book) => book.publisher))];

  // Filter and sort books
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = allBooks.filter((book) => {
      const priceInRange =
        book.price >= filters.priceRange[0] &&
        book.price <= filters.priceRange[1];
      const authorMatch =
        filters.authors.length === 0 || filters.authors.includes(book.author);
      const ratingMatch = book.rating >= filters.minRating;
      const formatMatch =
        filters.formats.length === 0 || filters.formats.includes(book.format);
      const publisherMatch =
        filters.publishers.length === 0 ||
        filters.publishers.includes(book.publisher);

      return (
        priceInRange &&
        authorMatch &&
        ratingMatch &&
        formatMatch &&
        publisherMatch
      );
    });

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "popularity":
          return b.reviews - a.reviews;
        case "newest":
        default:
          return b.year - a.year;
      }
    });

    return filtered;
  }, [allBooks, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedBooks.length / itemsPerPage);
  const paginatedBooks = filteredAndSortedBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1);
  };

  const toggleFilter = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
    setCurrentPage(1);
  };

  const handleAddToCart = (book) => {
    console.log("Added to cart:", book);
  };

  const handleViewDetails = (book) => {
    console.log("View details:", book);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="relative bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <img
          src={str}
          alt={categoryInfo.name}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {categoryInfo.name}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              {categoryInfo.description}
            </p>
            <div className="mt-6 text-lg">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                {filteredAndSortedBooks.length} books found
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between font-semibold"
            >
              <span>Filters & Sort</span>
              <span>{showFilters ? "✕" : "☰"}</span>
            </button>
          </div>

          {/* Sidebar Filters */}
          <div
            className={`lg:w-80 space-y-6 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Filters</h3>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">
                  Price Range
                </h4>
                <PriceRangeSlider
                  min={0}
                  max={100}
                  value={filters.priceRange}
                  onChange={(value) => handleFilterChange("priceRange", value)}
                />
              </div>

              {/* Authors */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Authors</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {uniqueAuthors.map((author) => (
                    <label
                      key={author}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.authors.includes(author)}
                        onChange={() => toggleFilter("authors", author)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm text-gray-600">{author}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">
                  Minimum Rating
                </h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.minRating === rating}
                        onChange={() => handleFilterChange("minRating", rating)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">
                          {"★".repeat(rating)}
                          {"☆".repeat(5 - rating)}
                        </span>
                        <span className="text-sm text-gray-600">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Format */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Format</h4>
                <div className="space-y-2">
                  {uniqueFormats.map((format) => (
                    <label
                      key={format}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.formats.includes(format)}
                        onChange={() => toggleFilter("formats", format)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm text-gray-600">{format}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Publisher */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Publisher</h4>
                <div className="space-y-2">
                  {uniquePublishers.map((publisher) => (
                    <label
                      key={publisher}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.publishers.includes(publisher)}
                        onChange={() => toggleFilter("publishers", publisher)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm text-gray-600">{publisher}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setFilters({
                    priceRange: [0, 100],
                    authors: [],
                    minRating: 0,
                    formats: [],
                    publishers: [],
                  });
                  setCurrentPage(1);
                }}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Dropdown */}
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="text-gray-600">
                  Showing {paginatedBooks.length} of{" "}
                  {filteredAndSortedBooks.length} books
                </div>
                <div className="flex items-center space-x-3">
                  <label className="text-gray-700 font-semibold">
                    Sort by:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="popularity">Most Popular</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {paginatedBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredAndSortedBooks.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No books found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      priceRange: [0, 100],
                      authors: [],
                      minRating: 0,
                      formats: [],
                      publishers: [],
                    });
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                  <div className="text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      ← Previous
                    </button>

                    <div className="flex space-x-1">
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                              currentPage === pageNum
                                ? "bg-blue-600 text-white"
                                : "border border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
