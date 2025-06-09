"use client";
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Tag,
  X,
  ShoppingCart,
} from "lucide-react";
import { setCart } from "@/store/slices/cartSlice";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get cart items and books from Redux
  const cartItems = useSelector((state) => state.cart.items);

  const books = useSelector((state) => state.books.data || []); // Adjust based on your book slice structure
  const { user } = useSelector((state) => state.user);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [showPromoInput, setShowPromoInput] = useState(false);

  // Transform cart items to include book details
  const enrichedCartItems = useMemo(() => {
    return cartItems
      .map((cartItem) => {
        const book = books.find((b) => b._id === cartItem.book);
        if (!book) return null;

        return {
          id: book._id,
          title: book.title,
          author: book.author,
          price: book.price,
          originalPrice: book.originalPrice || book.price,
          quantity: cartItem.quantity,
          image: book.imageLink || book.coverImage,
          inStock: book.inStock !== false, // Default to true if not specified
        };
      })
      .filter(Boolean); // Remove null items (books not found)
  }, [cartItems, books]);

  const updateQuantity = (bookId, newQuantity) => {
    console.log(bookId, newQuantity, cartItems);

    if (newQuantity < 1) return;

    const updatedItems = cartItems.map((item) =>
      item.book === bookId ? { ...item, quantity: newQuantity } : item
    );

    dispatch(setCart(updatedItems));
  };

  const removeItem = (bookId) => {
    const updatedItems = cartItems.filter((item) => item.book !== bookId);
    dispatch(setCart(updatedItems));
  };

  const clearCart = async () => {
    try {
      const response = await axios.post("/api/cart/clear", {
        userId: user._id,
      });

      if (response.data.success) {
        dispatch(setCart([])); // clear Redux cart
      } else {
        console.error("Failed to clear cart:", response.data);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const addToCart = (bookId, quantity = 1) => {
    const existingItem = cartItems.find((item) => item.book === bookId);

    if (existingItem) {
      updateQuantity(bookId, existingItem.quantity + quantity);
    } else {
      const updatedItems = [...cartItems, { book: bookId, quantity }];
      dispatch(setCart(updatedItems));
    }
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo({
        code: "SAVE10",
        discount: 0.1,
        description: "10% off",
      });
      setShowPromoInput(false);
      setPromoCode("");
    } else if (promoCode.toLowerCase() === "freeship") {
      setAppliedPromo({
        code: "FREESHIP",
        discount: 0,
        description: "Free shipping",
        freeShipping: true,
      });
      setShowPromoInput(false);
      setPromoCode("");
    } else {
      // Handle invalid promo code
      alert("Invalid promo code. Try SAVE10 or FREESHIP");
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const subtotal = enrichedCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = appliedPromo ? subtotal * (appliedPromo.discount || 0) : 0;
  const shipping = appliedPromo?.freeShipping ? 0 : subtotal > 50 ? 0 : 5.99;
  const tax = (subtotal - discount) * 0.08; // 8% tax
  const total = subtotal - discount + shipping + tax;

  const totalItems = enrichedCartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (enrichedCartItems.length === 0) {
    return (
      <div className="w-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any books to your cart yet.
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Actions Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </button>

              {enrichedCartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 font-medium transition-colors"
                >
                  Clear Cart
                </button>
              )}
            </div>

            {/* Cart Items List */}
            <div className="space-y-4">
              {enrichedCartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Book Image */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-32 sm:w-20 sm:h-28 bg-gray-100 rounded-lg overflow-hidden mx-auto sm:mx-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop";
                          }}
                        />
                      </div>
                    </div>

                    {/* Book Details */}
                    <div className="flex-1 space-y-3">
                      <div className="text-center sm:text-left">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">by {item.author}</p>
                        {!item.inStock && (
                          <span className="inline-block mt-1 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Price */}
                        <div className="text-center sm:text-left">
                          <span className="text-lg font-bold text-gray-900">
                            Rs. {item.price?.toFixed(2)}
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              Rs. {item.originalPrice?.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-center sm:justify-start gap-4">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-2 hover:bg-gray-100 transition-colors"
                              disabled={!item.inStock}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Subtotal */}
                          <div className="text-right min-w-[4rem]">
                            <span className="font-semibold text-gray-900">
                              Rs. {(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Promo Code Section */}
              <div className="mb-6">
                {!appliedPromo && (
                  <>
                    {!showPromoInput ? (
                      <button
                        onClick={() => setShowPromoInput(true)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        <Tag className="w-4 h-4" />
                        Apply Promo Code
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            onKeyPress={(e) =>
                              e.key === "Enter" && applyPromoCode()
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={applyPromoCode}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            setShowPromoInput(false);
                            setPromoCode("");
                          }}
                          className="text-gray-500 hover:text-gray-700 text-sm"
                        >
                          Cancel
                        </button>
                        <div className="text-xs text-gray-500">
                          Try: SAVE10 or FREESHIP
                        </div>
                      </div>
                    )}
                  </>
                )}

                {appliedPromo && (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">
                        {appliedPromo.code} - {appliedPromo.description}
                      </span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-green-600 hover:text-green-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => router.push("/Checkout")}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mb-4"
              >
                <ShoppingBag className="w-5 h-5" />
                Proceed to Checkout
              </button>

              {/* Free Shipping Notice */}
              {subtotal < 50 && !appliedPromo?.freeShipping && (
                <div className="text-sm text-gray-600 text-center">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
