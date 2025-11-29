import dotenv from 'dotenv';
import { createClient } from "@supabase/supabase-js"; 

dotenv.config()

function getSupabaseClientWithToken(accessToken) {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
    auth: {
        autoRefreshToken: false, 
        persistSession: false,
     },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}

export const getMyProfile = async (req, res) => {
  const id = req.user.id;
  const accessToken = req.cookies["my-access-token"];
  const supabaseUserClient = getSupabaseClientWithToken(accessToken);
  try{
    const {data, error} = await supabaseUserClient.from("user_profiles").select("*").eq("id", id).single()
    if (error){
        console.error('Get Profile RLS/DB Error:', error);
        return res.status(403).json({error: "Access Forbidden or Profile not found."})
    }
    res.status(200).json(data);
  }catch(e){
    console.error('Controller Catch Error:', e);
    return res.status(500).json({error: "Internal Server Error"});
  }
}

export const editMyProfile = async (req, res) => {
    const id = req.user.id;
    const { firstName, lastName, bio, major, graduationYear, profilePicture } = req.body;
    const accessToken = req.cookies["my-access-token"];
    const supabaseUserClient = getSupabaseClientWithToken(accessToken);
    try{
        const {data, error} = await supabaseUserClient.from("user_profiles")
        .update([{first_name:firstName, last_name: lastName, bio: bio, major: major, graduation_year: graduationYear, profile_picture: profilePicture}])
        .eq("id", id)
        .select()
        .single()
        if (error){
            console.error('Update Profile RLS/DB Error:', error);
            return res.status(403).json({error: "Update failed. Check your data or permissions."})
        }
        res.status(200).json(data);
    }catch(e){
        console.error('Controller Catch Error:', e);
        res.status(500).json({error: "Internal Server Error"});
    }
}

