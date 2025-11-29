import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import usersRouter from './routers/usersRouter.js';
import myProfileRouter from './routers/myProfileRouter.js';
import authRouter from "./routers/authRouter.js";
import postsRouter from "./routers/postsRouter.js"

dotenv.config();

const app = express();

const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const corsOptions = {
    origin: allowedOrigin, 
    credentials: true 
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json())
app.use(cookieParser());

app.use("/api/users", usersRouter)

app.use("/api/myprofile", myProfileRouter)

app.use("/api/auth", authRouter)

app.use("/api/posts", postsRouter)


// app.post('/api/user/profile', async (req, res) => {
//   const { email, password } = req.body;
//   const accessToken = res.cookie["my-access-token"]
//   const {data, err} = await supabaseClient.auth.signInWithPassword({email, password})
//   if (err) {
//   return res.status(401).json({ error: "Invalid email or password" });
//   }

//   res.cookie('my-access-token', data.session.access_token, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === 'production',
//   sameSite: 'lax',
//   });
//   res.cookie('my-refresh-token', data.session.refresh_token, {
//   httpOnly: true,
//   secure: true,
//   sameSite: 'lax',
//   });


//   res.status(200).json({
//     user: data.user,
//     profile: userProfile,
//     });

// });


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});