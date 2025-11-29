import { useState, useEffect} from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import Friends from './components/Friends.jsx';
import Groups from './components/Groups.jsx';
import MyProfile from './components/MyProfile.jsx';
import Info from './components/Info.jsx';
import Settings from './components/Settings.jsx';
import Discover from './components/Discover.jsx';
import UserProfile from './components/UserProfile.jsx';
import Posts from './components/Posts.jsx';
import Post from './components/Post.jsx';
import SignUp from './components/SignUp.jsx';
import SignIn from './components/SignIn.jsx';
import { AuthProvider } from './components/AuthContext.jsx';

function App() {


  return(
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path="/discover">
            <Route index element={<Discover />} />  
            <Route path=":id" element={<UserProfile />} /> 
          </Route>
          <Route path="/posts">
            <Route index element={<Posts />} />  
            <Route path="post" element={<Post />} />
          </Route>
          <Route path='/friends' element={<Friends />}/>
          <Route path='/groups' element={<Groups />}/>
          <Route path='/myprofile'>
            <Route index element={<MyProfile />} />  
            <Route path="edit" element={<Info />} /> 
          </Route>

          <Route path='/settings' element={<Settings />}/>
          <Route path='/login' element={<SignIn />}/>
          <Route path="/signup" element={<SignUp />} /> 
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
