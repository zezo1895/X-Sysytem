import React, { useEffect } from 'react';
import "./welcome.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Welcome = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetch_page =async () => {
      try {
        const response = await axios.get(`https://x-sysytem-api.vercel.app/api/wel_page`);
      if(response.data.auth===true){
        navigate("/home")
      }
          
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetch_page()
  
    
  }, );

  return (
    <>
    {/* <%- include('./auth/header.ejs', {currentPage: "welcome"}) %> */}

    <main class="px-3">
      <h1>Welcome to 
        <span class="fw-bold">X-system 👋</span>
      </h1>
      <p class="lead mt-4 mb-5">
        To help you with storing and organizing the data created and collected
        by an organization. The data management process aim to make sure the
        data in corporate systems is accurate, available and accessible.
      </p>
      <p class="lead">
        <a href="/home" class="btn btn-lg btn-light fw-bold border-white bg-white"
          >Dashboard</a>

          <a href="!#" class="btn btn-lg fw-bold" 
          >Contact sales</a>
      </p>
    </main>

    
  </>
  );
}

export default Welcome;
