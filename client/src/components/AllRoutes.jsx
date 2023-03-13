import React from 'react'
import { Routes, Route } from "react-router-dom";

import Auth from './Pages/Auth/Auth';
import Home from './Pages/Home/Home';
import CreatePost from './Pages/Community/CreatePost/CreatePost';
import Questions from './Pages/Questions/Questions';
import AskQuestion from './Pages/AskQuestion/AskQuestion';
import DisplayQuestions from './Pages/Questions/DisplayQuestions';
import Tags from './Pages/Tags/Tags';
import Users from './Pages/Users/Users';
import UserProfile from './Pages/UserProfile/UserProfile';
import Community from './Pages/Community/Community';
import FindPage from './Pages/Community/Find Friend/FindPage';
import MyFriends from './Pages/Community/My friends/MyFriends';

const AllRoutes = () => {
  return (
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/Community" element={<Community/>} />
    <Route path="Community/CreatePost" element={<CreatePost/>} />
     <Route path="Community/MyFriends" element={<MyFriends/>} />
    <Route path="/FindPage" element={<FindPage/>} />
    <Route path="/Auth" element={<Auth/>} />
    <Route path="/Questions" element={<Questions/>} />
    <Route path="/AskQuestion" element={<AskQuestion/>} />
    <Route path="/Questions/:id" element={<DisplayQuestions/>} />
    <Route path="/Tags" element={<Tags/>} />
    <Route path="/Users" element={<Users/>} />
    <Route path="/Users/:id" element={<UserProfile/>} />
   </Routes>
  )
}

export default AllRoutes;
