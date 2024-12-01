import React, { useEffect, useRef, useState } from 'react';
import "../comp/side.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import pic from "../../img/download.png"
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Side = () => {
  const dropdownRef = useRef(null);
  const path = window.location.pathname;
  const [current, setCurrent] = useState(null);
  const [show, setShow] = useState(false);
  const [showdrop, setshowdrop] = useState(false);
  const [link, setlink] = useState(pic);
  const [change, setchange] = useState(pic);
  const [dataFetched, setDataFetched] = useState(false);
  const handleClose = () => setShow(false);
  
  const handleShow = () => setShow(true);
  const handleShowdrop = () => setshowdrop(true);
  const navigate = useNavigate();
  
  axios.defaults.withCredentials = true;

const signout = async () => {
  try {
    await axios.get("https://x-sysytem-api.vercel.app/api/logout").then((res) => {
      if (res.data.status===true) {
      
        navigate("/login")
      }if(res.data.status===false){
        navigate("/login");
      }
    });
    // .then((data) => {console.log(data);});
  } catch (error) {}
};
const handleClickOutside = (event) => {
  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    setshowdrop(false);
  }
};


const upload = async (eo) => {
  eo.preventDefault();
  const formdata=new FormData()
  formdata.append("file",link)
  try {
    const response = await axios.post(
      "https://x-sysytem-api.vercel.app/api/upload",
      formdata
    );
    if(response.data.update){
      
      navigate("/")
      
    }
    if(response.data.status===false){
      navigate("/login")
    }
  
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  console.log(link);

}
const send = async () => {
  try {
    const response = await axios.get("https://x-sysytem-api.vercel.app/api/side");
    if (response.data.status) {
      setCurrent(response.data.userdata);
      setDataFetched(true)
    
    }
    if (response.data.status === false) {
      navigate("/login");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
useEffect(() => {
 if(!current){
    send();
 }
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
  
}, );

if(current){
  return (

    <>
  
  <div
  className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
  style={{ width: 280 }}
>
  <a
    href="/home"
    className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
  >
    <svg className="bi me-2" width={40} height={32}>
      <use xlinkHref="#bootstrap" />
    </svg>
    <span className="fs-4">Sidebar</span>
  </a>
  <hr />
  <ul className="nav nav-pills flex-column mb-auto">
    <li className="nav-item">
      <a href="/home" className={`nav-link text-white   ${path === "/home"? "active":null} `} aria-current="page">
        <svg className="bi me-2" width={16} height={16}>
          <use xlinkHref="#home" />
        </svg>
        Home
      </a>
    </li>

  
  
    <li>
      <a href="/addcustomers" className={`nav-link text-white ${path === "/addcustomers"? "active":null} }`}>
        <svg className="bi me-2" width={16} height={16}>
          <use xlinkHref="#people-circle" />
        </svg>
        add Customers
      </a>
    </li>
  </ul>
  <hr />
  <div ref={dropdownRef}  style={{ cursor:"pointer" }} className="dropdown">
    <a className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"  onClick={handleShowdrop}   >
      <img
        src={current.profileImage? current.profileImage: pic}
        alt=""
        width={32}
        height={32}
        className="rounded-circle me-2"
      />
      <strong>{current.username}</strong>
    </a>
  {showdrop &&  <ul
      className={`dropdownn   dropdown-menu-dark text-small shadow`}
      aria-labelledby="dropdownUser1"
    >
      <li>
        <a className="dropdown-item" href="!#">
          New project...
        </a>
      </li>
      <li>
        <a className="dropdown-item" href="!#">
          Settings
        </a>
      </li>
      <li>
      <button className="dropdown-item"  onClick={handleShow}>
          
            Profile
          
      </button >
      </li>
      <li>
        <hr className="dropdown-dividerr" />
      </li>
      <li >
        <a onClick={signout} className="dropdown-item"  >
          Sign out
        </a>
      </li>
    </ul>}
  </div>
</div>

<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>Change profile image</Modal.Title>
        </Modal.Header>
        <form enctype="multipart/form-data" onSubmit={upload}>
        <Modal.Body style={{ flexDirection:"column" }} className='d-flex  justify-content-between align-items-center '>
          <label className='btn btn-secondary' htmlFor="filein"> <FontAwesomeIcon style={{ marginRight:"5px" }} icon={faPlus} />upload image</label>
      <input name='ziad' className='d-none' id='filein' type="file" onChange={(eo) => {
      setlink(eo.target.files[0])
      setchange(URL.createObjectURL(eo.target.files[0]))
      }} />
      <img src={current.profileImage? current.profileImage: pic} alt="" width={150} height={150} style={{ borderRadius:"50%" }} />
        
        
          <Modal.Footer>
            <button className='btn btn-danger' type='button' onClick={handleClose}>
              Close
            </button>
            <button type='submit'className='btn btn-primary'>Save Change</button>
          </Modal.Footer>
          
        
        </Modal.Body>
        </form>
      </Modal>
      
</>

  );

}
if(!current){
  return <div>Loading...</div>;
}

}

export default Side;
