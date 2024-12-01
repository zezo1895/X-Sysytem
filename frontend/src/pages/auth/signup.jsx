import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState(null);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [emailerror, setemailerror] = useState(null);
  const [passworderror, setpassworderror] = useState(null);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetch_page =async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/signup_page`);
      if(response.data.auth===true){
        navigate("/home")
      }
          
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetch_page()
  
    
  }, );

  const newsign = async (eo) => {
    eo.preventDefault();
    setemailerror(null);
    setpassworderror(null);
    try {
      const { data } = await axios
        .post(
          "http://localhost:5000/api/signup",
          {
            username,
            email,
            password,
          },
           {withCredentials: true}
        );
    
        if(data.used){
          setemailerror(data.used);
        }  if (data.vaildErr) {
          console.log(data.vaildErr.errors)

          data.vaildErr.errors.forEach(item => {

            if (item.path === "email") {
              setemailerror("please provide a valid email")
            }


            if (item.path === "password") {
            setpassworderror("Password must be at least 8 characters with 1 upper case letter and 1 number")
            }
            
          });
        }
        if(data.status){
          navigate('/home')
        }
      
        
        
        
    } catch (error) {
      console.log(error);
    }

    // await fetch("http://localhost:5000/api/signup", {
    //   method: "POST",
    //   body: JSON.stringify({
    //   username,email,password
    //   }),
    //   headers: { "Content-Type": "application/json",withCredentials:true },
    // },)
    // .then(async (res) => res.json())
    // .then((data) => {
    //   if (data.signup == "right") {
    //     console.log("goooooooooo");
    //     navigate("/home");
    //   }
    //   if(data.uesd){
    //     setemailerror(data.uesd)
    //   }

    // });
  };

  return (
    <>
      <main className="px-3">
        <h1>Sign up</h1>
        <form
          onSubmit={newsign}
          id="signupForm"
          action="/signup"
          method="post"
          className="text-start mx-auto mt-5"
          style={{ maxWidth: "22em" }}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputUsername" className="form-label">
              Username :
            </label>
            <input
              onChange={(eo) => {
                setusername(eo.target.value);
              }}
              type="text"
              className="form-control"
              id="exampleInputUsername"
              name="username"
              value={username} required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address :
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              onChange={(eo) => {
                setemail(eo.target.value);
              }}
              value={email}
              required
            />
            <p id="passerrr" value={emailerror}>
              {emailerror}
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password :
            </label>
            <input
             required
              onChange={(eo) => {
                setpassword(eo.target.value);
              }}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={password}
            />
            <p id="passerrr" value={passworderror} >{passworderror}</p>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
        </form>
      </main>
    </>
  );
};

export default Signup;
