// "use client";
// import React, { useState } from "react";
// import {
//   Heart,
//   Star,
//   ChevronLeft,
//   ChevronRight,
//   Plus,
//   Minus,
//   ShoppingCart,
//   Eye,
//   Book,
//   Calendar,
//   Globe,
//   Building2,
//   Hash,
//   FileText,
// } from "lucide-react";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";

// const BookProductPage = () => {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [showFullDescription, setShowFullDescription] = useState(false);
//   const [activeTab, setActiveTab] = useState("description");

//   const bookImages = [
//     "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=700&fit=crop",
//     "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=700&fit=crop",
//     "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=700&fit=crop",
//   ];

//   const relatedBooks = [
//     {
//       id: 1,
//       title: "The Silent Observer",
//       author: "Emma Clarke",
//       price: 24.99,
//       image:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=280&fit=crop",
//       rating: 4.5,
//     },
//     {
//       id: 2,
//       title: "Digital Dreams",
//       author: "Alex Rivera",
//       price: 19.99,
//       image:
//         "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=280&fit=crop",
//       rating: 4.2,
//     },
//     {
//       id: 3,
//       title: "Ocean Whispers",
//       author: "Sarah Mitchell",
//       price: 22.99,
//       image:
//         "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=280&fit=crop",
//       rating: 4.7,
//     },
//     {
//       id: 4,
//       title: "Mountain Echoes",
//       author: "David Chen",
//       price: 26.99,
//       image:
//         "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=280&fit=crop",
//       rating: 4.3,
//     },
//   ];

//   const reviews = [
//     {
//       id: 1,
//       name: "Alice Johnson",
//       rating: 5,
//       comment:
//         "Absolutely captivating! Couldn't put it down. The character development is phenomenal.",
//       date: "2024-03-15",
//     },
//     {
//       id: 2,
//       name: "Michael Davis",
//       rating: 4,
//       comment:
//         "Great storytelling with unexpected twists. Highly recommend for mystery lovers.",
//       date: "2024-03-10",
//     },
//     {
//       id: 3,
//       name: "Sarah Wilson",
//       rating: 5,
//       comment:
//         "One of the best books I've read this year. The author's writing style is beautiful.",
//       date: "2024-03-08",
//     },
//   ];

//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, i) => (
//       <Star
//         key={i}
//         className={`w-4 h-4 ${
//           i < Math.floor(rating)
//             ? "fill-yellow-400 text-yellow-400"
//             : "text-gray-300"
//         }`}
//       />
//     ));
//   };

//   const handleQuantityChange = (change) => {
//     setQuantity(Math.max(1, quantity + change));
//   };

//   return (
//     <div className="w-screen">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         {/* Main Product Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
//           {/* Image Gallery */}
//           <div className="space-y-4">
//             <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
//               <img
//                 src={bookImages[selectedImage]}
//                 alt="Book Cover"
//                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//               />
//             </div>

//             <div className="flex gap-3 justify-center">
//               {bookImages.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
//                     selectedImage === index
//                       ? "border-blue-500 shadow-md"
//                       : "border-gray-200 hover:border-gray-300"
//                   }`}
//                 >
//                   <img
//                     src={image}
//                     alt={`View ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
//                 The Midnight Chronicles
//               </h1>
//               <p className="text-xl text-gray-600 mb-4">
//                 by{" "}
//                 <span className="font-semibold text-blue-600">
//                   Jennifer Martinez
//                 </span>
//               </p>

//               <div className="flex items-center gap-4 mb-4">
//                 <div className="flex items-center gap-1">
//                   {renderStars(4.6)}
//                   <span className="ml-2 text-sm text-gray-600">
//                     (324 reviews)
//                   </span>
//                 </div>
//                 <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//                   In Stock
//                 </span>
//               </div>

//               <div className="flex items-baseline gap-3">
//                 <span className="text-3xl font-bold text-gray-900">$29.99</span>
//                 <span className="text-lg text-gray-500 line-through">
//                   $34.99
//                 </span>
//                 <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">
//                   15% OFF
//                 </span>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="space-y-4">
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center border border-gray-300 rounded-lg">
//                   <button
//                     onClick={() => handleQuantityChange(-1)}
//                     className="p-2 hover:bg-gray-100 transition-colors"
//                   >
//                     <Minus className="w-4 h-4" />
//                   </button>
//                   <span className="px-4 py-2 font-medium">{quantity}</span>
//                   <button
//                     onClick={() => handleQuantityChange(1)}
//                     className="p-2 hover:bg-gray-100 transition-colors"
//                   >
//                     <Plus className="w-4 h-4" />
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => setIsWishlisted(!isWishlisted)}
//                   className={`p-3 rounded-lg border transition-all ${
//                     isWishlisted
//                       ? "bg-red-50 border-red-200 text-red-600"
//                       : "border-gray-300 text-gray-600 hover:bg-gray-50"
//                   }`}
//                 >
//                   <Heart
//                     className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
//                   />
//                 </button>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
//                   <ShoppingCart className="w-5 h-5" />
//                   Add to Cart
//                 </button>
//                 <button className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
//                   Buy Now
//                 </button>
//               </div>
//             </div>

//             {/* Book Metadata */}
//             <div className="bg-gray-50 rounded-xl p-6 space-y-3">
//               <h3 className="font-semibold text-gray-900 mb-4">Book Details</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
//                 <div className="flex items-center gap-2">
//                   <Hash className="w-4 h-4 text-gray-500" />
//                   <span className="text-gray-600">ISBN:</span>
//                   <span className="font-medium">978-0123456789</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Book className="w-4 h-4 text-gray-500" />
//                   <span className="text-gray-600">Format:</span>
//                   <span className="font-medium">Hardcover</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Globe className="w-4 h-4 text-gray-500" />
//                   <span className="text-gray-600">Language:</span>
//                   <span className="font-medium">English</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Building2 className="w-4 h-4 text-gray-500" />
//                   <span className="text-gray-600">Publisher:</span>
//                   <span className="font-medium">Stellar Books</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Calendar className="w-4 h-4 text-gray-500" />
//                   <span className="text-gray-600">Published:</span>
//                   <span className="font-medium">March 2024</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <FileText className="w-4 h-4 text-gray-500" />
//                   <span className="text-gray-600">Pages:</span>
//                   <span className="font-medium">342</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs Section */}
//         <div className="border-b border-gray-200 mb-8">
//           <nav className="flex space-x-8">
//             {["description", "reviews"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
//                   activeTab === tab
//                     ? "border-blue-500 text-blue-600"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </nav>
//         </div>

//         {/* Description Tab */}
//         {activeTab === "description" && (
//           <div className="mb-12">
//             <div className="prose max-w-none">
//               <p className="text-gray-700 leading-relaxed mb-4">
//                 In the heart of Victorian London, where gaslight flickers
//                 against cobblestone streets and shadows hold secrets, detective
//                 Eleanor Blackwood faces her most challenging case yet. When a
//                 series of mysterious disappearances plague the city's elite, she
//                 must navigate through a web of deception, supernatural
//                 occurrences, and her own haunted past.
//               </p>

//               {showFullDescription && (
//                 <>
//                   <p className="text-gray-700 leading-relaxed mb-4">
//                     As Eleanor delves deeper into the investigation, she
//                     discovers that the missing persons are all connected by a
//                     secret society that has been operating in the shadows for
//                     centuries. With each clue she uncovers, the danger grows
//                     closer to home, and she realizes that she might be the next
//                     target.
//                   </p>
//                   <p className="text-gray-700 leading-relaxed mb-4">
//                     Combining elements of mystery, supernatural thriller, and
//                     historical fiction, "The Midnight Chronicles" is a gripping
//                     tale that will keep readers on the edge of their seats.
//                     Jennifer Martinez weaves a masterful narrative that explores
//                     themes of justice, redemption, and the power of truth in the
//                     face of overwhelming darkness.
//                   </p>
//                 </>
//               )}

//               <button
//                 onClick={() => setShowFullDescription(!showFullDescription)}
//                 className="text-blue-600 hover:text-blue-800 font-medium"
//               >
//                 {showFullDescription ? "Show Less" : "Read More"}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Reviews Tab */}
//         {activeTab === "reviews" && (
//           <div className="mb-12">
//             <div className="mb-8">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="text-4xl font-bold text-gray-900">4.6</div>
//                 <div>
//                   <div className="flex items-center gap-1 mb-1">
//                     {renderStars(4.6)}
//                   </div>
//                   <p className="text-gray-600">Based on 324 reviews</p>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-6">
//               {reviews.map((review) => (
//                 <div
//                   key={review.id}
//                   className="bg-white border border-gray-200 rounded-lg p-6"
//                 >
//                   <div className="flex items-start justify-between mb-3">
//                     <div>
//                       <h4 className="font-semibold text-gray-900">
//                         {review.name}
//                       </h4>
//                       <div className="flex items-center gap-1 mt-1">
//                         {renderStars(review.rating)}
//                       </div>
//                     </div>
//                     <span className="text-sm text-gray-500">{review.date}</span>
//                   </div>
//                   <p className="text-gray-700">{review.comment}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Related Products */}
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">
//             You May Also Like
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {relatedBooks.map((book) => (
//               <div key={book.id} className="group cursor-pointer">
//                 <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-shadow">
//                   <img
//                     src={book.image}
//                     alt={book.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
//                 <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
//                   {book.title}
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-2">{book.author}</p>
//                 <div className="flex items-center justify-between">
//                   <span className="font-bold text-gray-900">${book.price}</span>
//                   <div className="flex items-center gap-1">
//                     <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                     <span className="text-xs text-gray-600">{book.rating}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default BookProductPage;
"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import {
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  ShoppingCart,
  Eye,
  Book,
  Calendar,
  Globe,
  Building2,
  Hash,
  FileText,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const BookProductPage = () => {
  const { bookId } = useParams(); // Get bookId from URL params
  const router = useRouter();
  const books = useSelector((state) => state.books.data);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [currentBook, setCurrentBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);

  // Find current book and related books
  useEffect(() => {
    if (books && books.length > 0 && bookId) {
      const book = books.find((b) => b.bookId === parseInt(bookId));
      setCurrentBook(book);

      if (book) {
        // Get related books from same genre (excluding current book)
        const related = books
          .filter((b) => b.genre === book.genre && b.bookId !== book.bookId)
          .slice(0, 4);
        setRelatedBooks(related);
      }
    }
  }, [books, bookId]);

  // If book not found, show loading or redirect
  if (!currentBook) {
    return (
      <div className="w-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Book not found
            </h1>
            <button
              onClick={() => router.back()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Go Back
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate average rating
  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + (rating.rating || 0), 0);
    return (sum / ratings.length).toFixed(1);
  };

  const averageRating = calculateAverageRating(currentBook.ratings);

  // Book images - use the main image from book data and add some placeholder images
  const bookImages = [
    currentBook.imageLink,
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=700&fit=crop",
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=700&fit=crop",
  ];

  const renderStars = (rating) => {
    const numRating = parseFloat(rating) || 0;
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(numRating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= currentBook.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleBookCardClick = (bookId) => {
    router.push(`/book/${bookId}`);
  };

  const formatPrice = (price) => {
    return (price / 100).toFixed(2); // Assuming price is in cents
  };

  const calculateDiscountedPrice = (price, discount) => {
    const originalPrice = price / 100;
    const discountedPrice = originalPrice * (1 - discount / 100);
    return discountedPrice.toFixed(2);
  };

  return (
    <div className="w-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={bookImages[selectedImage]}
                alt={currentBook.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex gap-3 justify-center">
              {bookImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-blue-500 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {currentBook.title}
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                by{" "}
                <span className="font-semibold text-blue-600">
                  {currentBook.author}
                </span>
              </p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(averageRating)}
                  <span className="ml-2 text-sm text-gray-600">
                    ({currentBook.ratings?.length || 0} reviews)
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentBook.stock > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {currentBook.stock > 0
                    ? `${currentBook.stock} In Stock`
                    : "Out of Stock"}
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  $
                  {calculateDiscountedPrice(
                    currentBook.price,
                    currentBook.discount
                  )}
                </span>
                {currentBook.discount > 0 && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ${formatPrice(currentBook.price)}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">
                      {currentBook.discount}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= currentBook.stock}
                    className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-lg border transition-all ${
                    isWishlisted
                      ? "bg-red-50 border-red-200 text-red-600"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  disabled={currentBook.stock === 0}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  disabled={currentBook.stock === 0}
                  className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Book Metadata */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-3">
              <h3 className="font-semibold text-gray-900 mb-4">Book Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Book ID:</span>
                  <span className="font-medium">{currentBook.bookId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Genre:</span>
                  <span className="font-medium">{currentBook.genre}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Language:</span>
                  <span className="font-medium">English</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Publisher:</span>
                  <span className="font-medium">Booxworm</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Published:</span>
                  <span className="font-medium">
                    {currentBook.publishedYear}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Pages:</span>
                  <span className="font-medium">{currentBook.pages}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {["description", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Description Tab */}
        {activeTab === "description" && (
          <div className="mb-12">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                {showFullDescription
                  ? currentBook.description
                  : `${currentBook.description.substring(0, 200)}...`}
              </p>

              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {showFullDescription ? "Show Less" : "Read More"}
              </button>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="mb-12">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl font-bold text-gray-900">
                  {averageRating}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {renderStars(averageRating)}
                  </div>
                  <p className="text-gray-600">
                    Based on {currentBook.ratings?.length || 0} reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {currentBook.ratings &&
                currentBook.ratings.map((rating, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {rating.userName || `User ${index + 1}`}
                        </h4>
                        <div className="flex items-center gap-1 mt-1">
                          {renderStars(rating.rating)}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {rating.date || new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">
                      {rating.comment || "Great book!"}
                    </p>
                  </div>
                ))}
              {(!currentBook.ratings || currentBook.ratings.length === 0) && (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No reviews yet. Be the first to review this book!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedBooks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedBooks.map((book) => (
                <div
                  key={book.bookId}
                  className="group cursor-pointer"
                  onClick={() => handleBookCardClick(book.bookId)}
                >
                  <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                    <img
                      src={book.imageLink}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">
                      ${calculateDiscountedPrice(book.price, book.discount)}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">
                        {calculateAverageRating(book.ratings)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BookProductPage;
