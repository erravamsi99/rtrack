
import Home from "./pages/Home/Home";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import React from "react";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./ProtectedRoute";
import Student from "./pages/Student/Student";
import {SubjectComponent} from "./pages/Subject/SubjectComponent";
import Testing from "./pages/Testing/Testing";
import {Topic} from "./pages/Topic/Topic";
import {SubTopic} from "./pages/SubTopic/SubTopic";
import {Login} from "./pages/Login/Login";
import About from "./pages/About/About";
import {Practice} from "./components/Practice";
import {PracticeDetail} from "./components/PracticeDetail";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/home" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
     
      <Route path="/profile" element={<Profile />} />
      <Route path="/subject" element={<Student />} />
      <Route path="/subject/:code" element={<SubjectComponent />} />
      
      <Route path="/subject/:code/topic/:topic" element={<Topic />} />
      <Route path="/subject/:code/topic/:topic/subtopic/:subtopic" element={<SubTopic />} />
      <Route path="/practice/:id" element={<PracticeDetail />} />
      
      <Route path="/testing" element={<Testing />} />
    </Routes>
  </Router>
);

export default AppRoutes;
