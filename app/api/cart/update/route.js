import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  await connectDB();

  try {
    const { userId, bookId, quantity } = await req.json();

    if (!userId || !bookId) {
      return NextResponse.json(
        { message: "Missing parameters" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const existingItemIndex = user.cart.findIndex(
      (item) => item.book.toString() === bookId
    );

    if (existingItemIndex > -1) {
      // Update quantity if book already in cart
      user.cart[existingItemIndex].quantity = quantity;
    } else {
      // Add new item
      user.cart.push({ book: bookId, quantity });
    }

    await user.save();

    return NextResponse.json(
      { message: "Cart updated", cart: user.cart },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cart update error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
