import { supabaseClient } from '../config/setup.ts';

export const getAllUsers = async (req, res) => {
    try{
        const {data, error} = await supabaseClient.from("user_profiles").select("*")
        if (error){
            return res.status(400).json({error: error.message})
        }
        res.status(200).json(data);
    }catch(e){
        res.status(500).json({ error: e.message });
    };
}

export const getUserById = async (req, res) => {
  const id = req.params.id;
  try{
    const {data, error} = await supabaseClient.from("user_profiles").select("*").eq("id", id).single()
    if (error){
      return res.status(400).json({error: error.message})
    }
    res.status(200).json(data);
  }catch(e){
    res.status(500).json({ error: e.message });
  };
}