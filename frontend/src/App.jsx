import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './Signup';
import Appbar from './Appbar';
import Signin from './Signin';
import Addcourse from './Addcourse';
import Courses from './Courses';
import Course from './Course';

function App() {
  return (
    <Router>
      <div style={{
        backgroundColor:"#eeeeee",
        width:"100vw",
        height:"1000vh"
      }}>
        <Appbar></Appbar>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/addcourse" element={<Addcourse />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/course/:courseId" element={<Course />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
