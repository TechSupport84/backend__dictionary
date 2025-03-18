import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://w-language.netlify.app",
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/set-ad-cookie", (req, res) => {
  res.cookie("ad_tracking", "enabled", {
    httpOnly: true,
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.send("Ad tracking cookie has been set!");
});

app.get("/get-ad-cookie", (req, res) => {
  console.log("Cookies received:", req.cookies);
  const adCookie = req.cookies.ad_tracking || "Not Found";
  res.send(`Ad Tracking Cookie: ${adCookie}`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
