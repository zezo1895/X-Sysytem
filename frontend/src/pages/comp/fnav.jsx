import axios from "axios";
import React, { useEffect, useState } from "react";



const Fnav = () => {
  const path = window.location.pathname;
  const [current, setcurrent] = useState(null);
  
  axios.defaults.withCredentials = true;
  const send = async () => {
    try {
      await axios.get("http://localhost:5000/api/home").then((res) => {
        if (res.data.status) {
          setcurrent(true);
        } else {
          setcurrent(false);
        }
      });
    } catch (error) {}
  };


  useEffect(() => {
    if(!current){
      send();
   }
  });
  if (!current) {
    return (
      <>
        <header class="mb-auto">
          <div class="d-flex justify-content-between  align-items-center">
            <h3 class="float-md-start mb-0">
              <a class="btn fs-2 text-white fw-bold" href="/">
                X-system 👋
              </a>
            </h3>

            <nav class="nav nav-masthead justify-content-center float-md-end">
              {/* */}

              <>
                <a
                  class={`fw-bold btn  ${
                    path === "/login" ? "btn-light" : null
                  } `}
                  href="/login"
                >
                  Log in
                </a>

                <a
                  class={`fw-bold btn ${
                    path === "/signup" ? "btn-light" : null
                  }`}
                  href="/signup"
                >
                  Sign up
                </a>
              </>
            </nav>
          </div>
        </header>
      </>
    );
  }
  // if (current) {
  //   return (
  //     <>
  //       <header class="mb-auto">
  //         <div class="d-flex justify-content-between  align-items-center">
  //           <h3 class="float-md-start mb-0">
  //             <a class="btn fs-2 text-white fw-bold" href="/">
  //               X-system 👋
  //             </a>
  //           </h3>

  //           <nav class="nav nav-masthead justify-content-center float-md-end">
  //             {/* */}

  //             <>
  //               <a
  //                 class="fw-bold btn  
  //                  btn-light"
  //                  onClick={signout}
  //               >
  //                 Log out
  //               </a>
  //             </>
  //           </nav>
  //         </div>
  //       </header>
  //     </>
  //   );
  // }
};

export default Fnav;
