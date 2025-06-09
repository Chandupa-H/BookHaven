"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "@/store/slices/bookSlice";
import { useRouter } from "next/navigation";
import { setCart } from "@/store/slices/cartSlice";

// Dynamically import components that might cause hydration issues
const Navbar = dynamic(() => import("../Components/Navbar"), {
  ssr: false,
});
const Footer = dynamic(() => import("../Components/Footer"), {
  ssr: false,
});

const ProductCard = ({ book, onAddToWishlist }) => {
  const { user, token, isAuthenticated } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleBookClick = () => {
    router.push(`/Product/${book.bookId}`);
  };
  const onAddToCart = async () => {
    const res = await fetch("/api/cart/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Optional if you add auth
      },
      body: JSON.stringify({
        userId: user.id,
        bookId: book._id,
        quantity: 1,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      dispatch(setCart(data.cart));
      alert("Book added to cart!");
    } else {
      alert(data.message || "Error adding to cart");
    }
  };

  const handleAddToCart = (e) => {
    isAuthenticated ? onAddToCart(book) : router.push("/auth");
  };
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden">
      <div className="relative" onClick={handleBookClick}>
        <img
          src={book.imageLink}
          alt={book.title}
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {book.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{book.discount}%
          </div>
        )}
        <button
          onClick={() => onAddToWishlist(book)}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
        >
          <span className="text-red-500 text-lg">♡</span>
        </button>
      </div>

      <div className="p-5">
        <div onClick={handleBookClick} className="cursor-pointer">
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400 text-sm">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${i < (book.rating || 4) ? "★" : "☆"}`}
                >
                  {i < (book.rating || 4) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <span className="text-gray-500 text-sm ml-2">
              ({book.reviews || 0})
            </span>
          </div>

          <h3 className="font-bold text-gray-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">{book.author}</p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">
                Rs. {book.price}
              </span>
              {book.originalPrice && (
                <span className="text-gray-400 line-through text-sm">
                  Rs. {book.originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => handleAddToCart(book)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Main Homepage Component
const BookstoreHomepage = () => {
  const [cartItems, setCartItems] = useState(3);
  const [wishlistItems, setWishlistItems] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // New state for search and filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const dispatch = useDispatch();
  const books_ = useSelector((state) => state.books.data);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Filter books based on search query and category
  useEffect(() => {
    if (!books_ || books_.length === 0) {
      setFilteredBooks([]);
      return;
    }

    let filtered = [...books_];

    // Apply category filter
    if (selectedCategory && selectedCategory !== "") {
      filtered = filtered.filter((book) => book.genre === selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (book) =>
          book.title?.toLowerCase().includes(query) ||
          book.author?.toLowerCase().includes(query) ||
          book.genre?.toLowerCase().includes(query) ||
          book.description?.toLowerCase().includes(query)
      );
      setIsSearchActive(true);
    } else {
      setIsSearchActive(false);
    }

    setFilteredBooks(filtered);
  }, [books_, searchQuery, selectedCategory]);

  // Handle search from navbar
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle category filter from navbar
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  // Use filtered books or original books based on search/filter state
  const booksToUse =
    isSearchActive || selectedCategory ? filteredBooks : books_;

  // Extract unique genres from books data
  const getUniqueGenres = () => {
    if (!books_ || books_.length === 0) return [];
    const genres = books_.map((book) => book.genre).filter(Boolean);
    return [...new Set(genres)];
  };

  const categoryImages = [
    {
      genre: "Biography",
      image:
        "https://i.pinimg.com/736x/8c/4f/55/8c4f554ad7cd0333df8955fd2865527b.jpg",
    },
    {
      genre: "Business",
      image:
        "https://i.pinimg.com/736x/78/e7/93/78e79334e50d6a6ca07f6dc3f64711f7.jpg",
    },
    {
      genre: "Self-Help",
      image:
        "https://i.pinimg.com/736x/4a/60/03/4a600315785530d74ac56d4f71576b0d.jpg",
    },
    {
      genre: "Children’s",
      image:
        "https://i.pinimg.com/736x/eb/88/c4/eb88c4e151ad7de99b21b56c209e7519.jpg",
    },
  ];

  // Get genre counts and match image from categoryImages
  const getGenreWithCounts = () => {
    if (!books_ || books_.length === 0) return [];

    const genreCounts = {};
    books_.forEach((book) => {
      if (book.genre) {
        genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
      }
    });

    return Object.entries(genreCounts)
      .map(([genre, count]) => {
        // Find the matching category image by genre
        const category = categoryImages.find((cat) => cat.genre === genre);
        return {
          name: genre,
          image: category ? category.image : null,
          count: `${count} book${count !== 1 ? "s" : ""}`,
        };
      })
      .slice(0, 4);
  };

  // Get books by category (using filtered books if search/filter is active)
  const getBestSellers = () => {
    if (!booksToUse || booksToUse.length === 0) return [];
    return [...booksToUse]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, Math.min(4, booksToUse.length));
  };

  const getNewArrivals = () => {
    if (!booksToUse || booksToUse.length === 0) return [];
    return [...booksToUse]
      .sort((a, b) => (b.bookId || b.id || 0) - (a.bookId || a.id || 0))
      .slice(0, Math.min(4, booksToUse.length));
  };

  const getDiscountedBooks = () => {
    if (!booksToUse || booksToUse.length === 0) return [];
    return [...booksToUse]
      .map((book) => {
        const bookId = book.bookId || book.id || 0;
        const discountSeed = bookId % 30;
        return {
          ...book,
          discount: 20 + discountSeed,
          originalPrice: book.originalPrice || (book.price * 1.3).toFixed(2),
        };
      })
      .slice(0, Math.min(4, booksToUse.length));
  };

  // Get all filtered books for search results
  const getAllFilteredBooks = () => {
    return booksToUse || [];
  };

  const featuredCategories = getGenreWithCounts();

  const handleAddToCart = (book) => {
    setCartItems((prev) => prev + 1);
  };

  const handleAddToWishlist = (book) => {
    setWishlistItems((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error loading books: {error}</p>
          <button
            onClick={() => dispatch(fetchBooks())}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Navbar with search and category props */}
      <Navbar
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        selectedCategory={selectedCategory}
      />

      {/* Search Results Section - Show when search is active */}
      {isSearchActive && (
        <section className="py-8 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Search Results for "{searchQuery}"
              </h2>
              <p className="text-gray-600">
                Found {filteredBooks.length} book
                {filteredBooks.length !== 1 ? "s" : ""}
                {selectedCategory && ` in ${selectedCategory}`}
              </p>
            </div>

            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredBooks.map((book) => (
                  <ProductCard
                    key={book.bookId || book.id}
                    book={book}
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No books found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search terms or browse our categories
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View All Books
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Category Filter Results - Show when category is selected but no search */}
      {!isSearchActive && selectedCategory && (
        <section className="py-8 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedCategory} Books
              </h2>
              <p className="text-gray-600">
                {filteredBooks.length} book
                {filteredBooks.length !== 1 ? "s" : ""} in this category
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <ProductCard
                  key={book.bookId || book.id}
                  book={book}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Show default sections only when no search/filter is active */}
      {!isSearchActive && !selectedCategory && (
        <>
          {/* Hero Banner */}
          <section className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                    Discover Your Next
                    <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      Great Read
                    </span>
                  </h1>
                  <p className="text-xl text-gray-200 leading-relaxed">
                    Explore {books_?.length || 0} books across all genres. From
                    bestsellers to hidden gems, find your perfect match at
                    unbeatable prices.
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        // Scroll down 100 pixels smoothly
                        window.scrollBy({ top: 800, behavior: "smooth" });
                      }}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-xl"
                    >
                      Shop Now
                    </button>
                    <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200">
                      Learn More
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl transform rotate-6 opacity-20"></div>
                  <img
                    src="https://i.pinimg.com/736x/35/21/e7/3521e7c885028cb60fee4a8208a779be.jpg"
                    alt="Featured Books"
                    className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Featured Categories */}
          {featuredCategories.length > 0 && (
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Featured Categories
                  </h2>
                  <p className="text-xl text-gray-600">
                    Explore our most popular book categories
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {featuredCategories.map((category, index) => (
                    <div
                      key={index}
                      onClick={() => handleCategoryFilter(category.name)}
                      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold mb-1">
                          {category.name}
                        </h3>
                        <p className="text-sm opacity-90">{category.count}</p>
                      </div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-2xl">→</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Best Sellers */}
          {getBestSellers().length > 0 && (
            <section className="py-16 bg-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      Best Sellers
                    </h2>
                    <p className="text-xl text-gray-600">
                      Most popular books this month
                    </p>
                  </div>
                  {/* <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2">
                    <span>View All</span>
                    <span className="text-lg">→</span>
                  </button> */}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {getBestSellers().map((book) => (
                    <ProductCard
                      key={book.bookId || book.id}
                      book={book}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* New Arrivals */}
          {getNewArrivals().length > 0 && (
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      New Arrivals
                    </h2>
                    <p className="text-xl text-gray-600">
                      Fresh books just added to our collection
                    </p>
                  </div>
                  {/* <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2">
                    <span>View All</span>
                    <span className="text-lg">→</span>
                  </button> */}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {getNewArrivals().map((book) => (
                    <ProductCard
                      key={book.bookId || book.id + "new"}
                      book={{ ...book, isNew: true }}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Discount Items */}
          {getDiscountedBooks().length > 0 && (
            <section className="py-16 bg-gradient-to-r from-red-50 to-pink-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      Special Discounts
                    </h2>
                    <p className="text-xl text-gray-600">
                      Limited time offers on selected books
                    </p>
                  </div>
                  {/* <button className="text-red-600 hover:text-red-700 font-semibold flex items-center space-x-2">
                    <span>View All Deals</span>
                    <span className="text-lg">→</span>
                  </button> */}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {getDiscountedBooks().map((book) => (
                    <ProductCard
                      key={book.bookId || book.id + "discount"}
                      book={book}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BookstoreHomepage;
