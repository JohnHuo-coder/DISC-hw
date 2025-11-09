
import{useState, useEffect} from "react";
import { supabase } from "../../../backend/src/supabase-client";
import{Session} from "@supabase/supabase-js"

const [newPost, setNewPost] = useState({});
{session}: {session: Session}
const handlePost = async(e) => {
    e.preventDefault();
    const {error} = await supabase.from().insert({newPost, email: session.user.email}).single()
}