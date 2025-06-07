import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    bookId: {
      type: Number,
      required: [true, "Book ID is required"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      maxlength: [50, "Author name cannot be more than 50 characters"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    imageLink: {
      type: String,
      trim: true,
      default: "",
    },
    publishedYear: {
      type: Number,
      required: [true, "Published year is required"],
      min: [1800, "Published year must be after 1800"],
      max: [new Date().getFullYear(), "Published year cannot be in the future"],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    discount: {
      type: Number,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    ratings: [
      {
        userId: {
          type: Number,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: [1, "Rating must be at least 1"],
          max: [5, "Rating cannot exceed 5"],
        },
      },
    ],
    comments: [
      {
        userId: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
          trim: true,
          Veneer: [500, "Comment cannot be more than 500 characters"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    pages: {
      type: Number,
      required: [true, "Number of pages is required"],
      min: [1, "Pages must be at least 1"],
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.index({ title: "text", author: "text", genre: "text" });

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default Book;
