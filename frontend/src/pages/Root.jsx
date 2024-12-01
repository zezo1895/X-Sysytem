import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Fnav from "./comp/fnav";

const Root = () => {
const  [signnav,setsignnav]=useState(null)
const  [display,setdisplay]=useState(null)
const location = useLocation();
useEffect(() => {
  if(location.pathname==="/"||location.pathname==="/login"||location.pathname==="/signup"){
    setsignnav(true)
    setdisplay("block")
  }else{ 
    setsignnav(false)
    setdisplay("d-none")
  }
}, [location.pathname]);


  console.log(location.pathname);
  return ( 
    <div class={`cover-container d-flex w-100 h-100 p-3 mx-auto flex-column`}>
       {signnav&& <Fnav/>}
      <Outlet />
      <footer  class={`mt-auto text-white-50 ${display}`}>
        <p>Designed and developed by Ziad Adel© 2024</p>
      </footer>
    </div>
  );
};

export default Root;
