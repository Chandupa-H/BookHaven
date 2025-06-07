import { connectDB } from "@/lib/db";
import User from "@/models/User";
// import jwt from 'jsonwebtoken';
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, email, password } = req.body;

  await connectDB();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const userCount = await User.countDocuments();

    const newUser = new User({
      userId: userCount + 1,
      username,
      email,
      password,
      provider: "manual",
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: { username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
}
