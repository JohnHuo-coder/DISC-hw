import { supabaseClient } from "../config/setup.ts";
import dotenv from 'dotenv';
import { createClient } from "@supabase/supabase-js"; 
dotenv.config()

function getSupabaseClientWithToken(accessToken){
    return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        },
        global:{
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
        }
    })
}

export const getAllPosts = async(req, res) => {
    try{
        const {data, error} = await supabaseClient.from("posts").select("*")
        if (error){
            return res.status(400).json({error: error.message})
        }
        res.status(200).json(data)
    }catch(e){
        res.status(500).json({ error: e.message });
    };
};

export const postNewPost = async(req, res) => {
    try{
        const authorId = req.user.id;
        console.log(authorId);
        const {title, content, imageUrl} = req.body;
        const accessToken = req.accessToken;
        const supabaseUserClient = getSupabaseClientWithToken(accessToken);
        const {data, error} = await supabaseUserClient.from("posts")
        .insert([{author_id: authorId, title: title, content: content, image_url: imageUrl}])
        .select()
        .single()
        if (error){
            console.error('Insert post RLS/DB Error:', error);
            return res.status(403).json({error: "Insert failed. Check your data or permissions."})
        }
        res.status(200).json(data);
    }catch(e){
        console.error('Controller Catch Error:', e);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const getPostById = async (req, res) => {
  const id = req.params.id;
  try{
    const {data, error} = await supabaseClient.from("posts").select("*").eq("id", id).single()
    if (error){
      return res.status(400).json({error: error.message})
    }
    res.status(200).json(data);
  }catch(e){
    res.status(500).json({ error: e.message });
  };
}