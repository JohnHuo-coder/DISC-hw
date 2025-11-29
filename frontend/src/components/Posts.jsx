import { useEffect, useState} from "react";
import {Link} from 'react-router-dom';
 

export default function Posts(){
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState("");
    const [searchedId, setSearchedId] = useState("");
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
       const getAllPosts= async() => {
        setLoading(true);
        try{
            const res = await fetch(`${API_URL}/api/posts`);
            const data = await res.json();
            if (!res.ok){
              console.error("fail loading posts",data.error);
              throw new Error(data.error || 'fail loading posts');
            }
            setPosts(data);
        }catch(e){
            console.error("error getting posts", e);
        }finally{
          setLoading(false);
        }
       }
       getAllPosts();
    },[])

    useEffect(() => {
      if (!searchedId) return;
      const getPostByID = async() => {
        setLoading(true);
        try{
          const res = await fetch(`${API_URL}/api/posts/${searchedId}`);
          const data = await res.json();
          if (!res.ok){
            console.error("fail getting post", data.error);
            throw new Error(data.error || "fail getting post");
          }
          if (!data || !data.id) {
            alert("Post not found!");
            setPosts([]); 
            return;
          };
          setPosts([data]);
        }catch(e){
          console.error(`error getting user with id: ${searchedId}`, e);
        }finally{
          setLoading(false);
        }
      }
      getPostByID();
    },[searchedId])

    if (loading) return <div style={{textAlign: "center"}}><h1>loading</h1></div>

    return (
    <main className="discover-main">
        <div style={{position: 'fixed', left: 0, top: "3vw", display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <Link to="/posts/post" style={{margin: 10}}>Post</Link>
        </div>
        {/* <div style={{marginBottom: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>  */}
          {/* <input style={{width: "50%", height: "2rem", padding: 5, backgroundColor: "white", color: 'black', borderRadius: "5px"}} type="text" placeholder="Enter post ID" value={postId} onChange={(e) => setPostId(e.target.value)}/>
          <button style={{margin: 10, backgroundColor: "white", color: 'black'}} onClick={() => {setSearchedId(postId)}}>Search</button> */}
        <div className="d-flex justify-content-center mb-5" style={{ width: "100%" }}>
          <form className="d-flex" role="search" style={{ width: "100%", maxWidth: "700px" }} onSubmit={(e) => {e.preventDefault(); setSearchedId(postId)}}>
            <input className="form-control me-2" type="search" aria-label="Search" placeholder="Enter post ID" value={postId} onChange={(e) => setPostId(e.target.value)}/>
            <button className="btn btn-primary" type="submit">Search</button>
          </form>
        </div>
        
        <div style={{width: "100%", gap: 50, display: "flex", flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center'}}>
        {posts.map((post) => {
          return(
          <div key= {post.id} className = 'Profile-card'>
            {post.image_url ? <img src={post.image_url} alt="picture" /> : null}
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <Link to={`/posts/${post.id}`}>details</Link>
          </div>)
        })}
        </div>
    </main> )
}