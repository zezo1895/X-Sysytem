import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";;


const Login = () => {

  const navigate = useNavigate();
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [emailerrr, setemailerrr] = useState(null);
  const [passrrr,setpasserrr] = useState(null);
  axios.defaults.withCredentials = true;

  const login = async (eo) => {
  
    eo.preventDefault();
    setemailerrr(null)
    setpasserrr(null)

try{
    const {data}=await axios.post("https://x-sysytem-api.vercel.app/api/login",{
    email,password
      },{withCredentials: true});
      if(data.emailerr){
        setemailerrr(data.emailerr);
      }else if(data.passerr){
        setpasserrr(data.passerr);
      }
      else{
        navigate("/home")
      };
      
    } catch (error) {
      console.log(error);
    }
  
  
  };
  useEffect(() => {
    const fetch_page =async () => {
      try {
        const response = await axios.get(`https://x-sysytem-api.vercel.app/api/login_page`);
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
      <main className="px-3">
        <h1>Log in</h1>
        <form
          onSubmit={login}
          id="signupForm"
          className="text-start mx-auto mt-5"
          style={{ maxWidth: "22em" }}
        >
          <div className="mb-3 " >
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input

              onChange={(eo) => {
                setemail(eo.target.value);
              }}
              name="email"
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email} required
            />
            <p id="emailerrr" value={emailerrr} >{emailerrr}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label" >
              Password
            </label>
            <input required
              onChange={(eo) => {
                setpassword(eo.target.value);
              }}
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
            />

            <p id="passerrr" value={passrrr} >{passrrr}</p>
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
            Log in
          </button>
        </form>
      </main>
    </>
  );
};

export default Login;
