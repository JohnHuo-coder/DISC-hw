import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Post(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const { user, loading } = useAuth();
    useEffect(() => {
        if (!loading && !user) {
            navigate('/login', { replace: true });
        }
    }, [user, loading]);

    const postNewPost = async(e) => {
        e.preventDefault();
        try{
            const res = await fetch(`${API_URL}/api/posts/post`, {
                        method: "POST", 
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            title: title,
                            content: description,
                            imageUrl: picture
                        }),
                        credentials: 'include'
                    });
            const data = await res.json();
            if(!res.ok){
                setError(data.error || "post failed");
                return;
            }
            console.log("post successfully", data)
            navigate("/posts");
        }catch(e){
            setError("Network Error!");
        };
    };
    return(
        <main className="login-main">
            <div style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
                <form onSubmit={postNewPost} className="signup-form">
                    {error ? <p style={{ color: "red" }}>{error}</p> : null}
                    <label>Image Url: <input type="text" placeholder="Enter image url" value={picture} onChange={(e) => setPicture(e.target.value)}/></label>
                    <label>Title: <input type="text" placeholder="Enter your post title" value={title} onChange={(e) => setTitle(e.target.value)}/></label>
                    <label>Cotent: <input type="text" placeholder="Share something interesting" value={description} onChange={(e) => setDescription(e.target.value)}/></label>
                    <button type="submit" style={{alignSelf: "center"}}>confirm</button>
                </form>
            </div>
        </main>
    )
}

