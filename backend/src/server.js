import express from "express";
import cors from "cors";
import { pool } from "./db/index.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())

app.get("/api/users", async (req, res) => {
    try{
        const result = await pool.query("SELECT * FROM users;");
        res.json(result.rows);
    }catch(e){
        console.error('Error fetching all users:', e);
        res.status(500).json({ error: e.message });
    }
})

app.get("/api/users/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const result = await pool.query("SELECT * FROM users WHERE id = $1;", [id]);
        res.json(result.rows[0]);
    }catch(e){
        console.error(`Error fetching user with id ${id}:`, e);
        res.status(500).json({ error: e.message });
    }
})

app.post("/api/users/signup", async (req, res) => {
    try{
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
    }
})


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

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});