// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: [true, "User ID is required"],
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [
        function () {
          return !this.googleId; // Password required only if googleId is not present
        },
        "Password is required for non-Google accounts",
      ],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Prevents password from being returned in queries by default
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows null values for users without Google login
    },
    provider: {
      type: String,
      enum: ["manual", "google"],
      default: "manual",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    purchasedBooks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    cart: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          min: [1, "Quantity must be at least 1"],
          default: 1,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Index for better query performance
userSchema.index({ username: "text", email: "text", googleId: 1 });

// Pre-save hook to hash password for manual users
userSchema.pre("save", async function (next) {
  if (this.provider === "google" || !this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords for manual users
userSchema.methods.comparePassword = async function (candidatePassword) {
  return this.password
    ? await bcrypt.compare(candidatePassword, this.password)
    : false;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
