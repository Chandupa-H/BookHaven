// app/api/auth/google/callback/route.js
import axios from "axios";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response(JSON.stringify({ error: "No code provided" }), {
      status: 400,
    });
  }

  await connectDB();

  try {
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      grant_type: "authorization_code",
    });

    const { access_token } = data;

    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const { sub, email, name } = profile;

    let user = await User.findOne({ googleId: sub });

    if (!user) {
      const userCount = await User.countDocuments();

      user = new User({
        userId: userCount + 1,
        username: name,
        email,
        googleId: sub,
        provider: "google",
      });

      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Redirect to frontend with token (customize as needed)
    return Response.redirect(
      `http://localhost:3000/auth/success?token=${token}`
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "OAuth failed", details: err.message }),
      {
        status: 500,
      }
    );
  }
}
