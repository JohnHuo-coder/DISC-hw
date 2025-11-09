import express from "express";
import cors from "cors";
import { pool } from "./db/index.js";
import dotenv from 'dotenv';
import { supabase } from "supabase-client";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())

function getSupabaseClientWithToken(accessToken) {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}

app.get("/api/discover/users", async (req, res) => {
  const {data, error} = await supabase.from("users_profile").select("*")
  if (error){
    return res.status(500).json({message: error.message})
  }
  res.status(200).json(data);
})

app.get("/api/discover/users/:id", async (req, res) => {
  const id = req.params.id;
  const {data, error} = await supabase.from("users_profile").select("*").eq("id", id).single()
    if (error){
      return res.status(500).json({message: error.message})
    }
  res.status(200).json(data);
})

app.get("/api/myprofile/:id", async (req, res) => {
  const id = req.params.id;
  const accessToken = req.cookies["my-access-token"];
  if (!accessToken){
    return res.status(401).json({message: "Not authenticated, please log in first"})
  }
  const supabaseUserClient = getSupabaseClientWithToken(accessToken);
  const {data, error} = await supabaseUserClient.from("user_profiles").select("*").eq("id", id).single()
  if (error){
    res.status(401).json({message: error.message})
  }
  res.status(200).json(data);
})

app.put("/api/myprofile/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, bio, major, graduationYear, profilePicture } = req.body;
  const accessToken = req.cookies["my-access-token"];
  if (!accessToken){
    return res.status(401).json({message: "Not authenticated, please log in first"})
  }
  const supabaseUserClient = getSupabaseClientWithToken(accessToken);
  const {data, error} = await supabaseUserClient.from("user_profiles")
  .update({first_name:firstName, last_name: lastName, bio: bio, major: major, graduation_year: graduationYear, profile_picture: profilePicture })
  .eq("id", id)
  .select()
  .single()
  if (error){
    return res.status(401).json({message: error.message})
  }
  res.status(200).json(data);
})



app.post("/api/auth/signup", async (req, res) => {
  const { email, password} = req.body;
  const { data, error } = await supabase.auth.signUp({email: email, password: password});
  if (error){
    console.error('Error creating user:', error);
    return res.status(500).json({ error: error.message });
  }
  const user = data.user;
  res.status(200).json(user);
})
    /*try{
        const { userName, password, firstName, lastName, email, bio, major, graduationYear, profilePicture } = req.body;
        if (!userName || !password || !firstName || !lastName || !email || !bio || !major || !graduationYear || !profilePicture) {
        return res.status(400).json({
            error: 'Losing one or more fields, all fields are required!'
        });
        }
        const q = `
        INSERT INTO users(username, password, first_name, last_Name, email, bio, major, graduation_year, profile_picture)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;`;
        const result = await pool.query(q, [userName, password, firstName, lastName, email, bio, major, graduationYear, profilePicture]);
        res.status(200).json(result.rows[0]);
    }catch(e){
        if (e.code === '23505') {
        return res.status(400).json({ error: 'Username already exists' });
        }
        console.error('Error creating user:', e);
        res.status(500).json({ error: e.message });
    }*/


/*
app.post('/api/users/signin', async (req, res) => {
  const { userName, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1;', [userName]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    res.status(200).json(user);
  } catch (e) {
    console.error('Login error:', e);
    res.status(500).json({ error: e.message });
  }
});
*/

app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;
  const {data, error} = await supabase.auth.signInWithPassword({email, password})
  if (error) {
  return res.status(401).json({ error: "Invalid email or password" });
  }
  

  res.cookie('my-access-token', data.session.access_token, {
  httpOnly: process.env.NODE_ENV === 'production',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  });
  res.cookie('my-refresh-token', data.session.refresh_token, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  });
  res.status(200).json(data.user);
});


app.post('/api/user/profile', async (req, res) => {
  const { email, password } = req.body;
  const accessToken = res.cookie["my-access-token"]
  const {data, err} = await supabase.auth.signInWithPassword({email, password})
  if (err) {
  return res.status(401).json({ error: "Invalid email or password" });
  }

  res.cookie('my-access-token', data.session.access_token, {
  httpOnly: process.env.NODE_ENV === 'production',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  });
  res.cookie('my-refresh-token', data.session.refresh_token, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  });


  res.status(200).json({
    user: data.user,
    profile: userProfile,
    });

});


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});