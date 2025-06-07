// app/api/getBooks/route.js
import { NextResponse } from "next/server";
import Book from "@/models/Book";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    console.log("logging the database connection");

    const books = await Book.find({}).lean();
    console.log(books);

    return NextResponse.json({
      success: true,
      data: books,
      message: "Books fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
