import React, { useEffect, useState } from 'react';
import Theme from '../../comp/theme';
import Side from '../../comp/side';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Moment from 'react-moment';

const View = () => {
  const [current, setCurrent] = useState(null);
  const navigate = useNavigate();
  let { id } = useParams();


  axios.defaults.withCredentials = true;

  const send = async () => {
    try {
      const response = await axios.get(`https://x-sysytem-api.vercel.app/api/home/view/${id}`);
      if (response.data.status) {
        setCurrent(response.data.info);
      } if(response.data.status==false) {
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
  }, []);






if(current){  return (
  <>
  <Theme />
  <main className="d-flex flex-nowrap h-100">
    <Side />
    <section className="w-100">
<table
  style={{ width: "88%" }}
  className="ms-1 table mt-5 table-striped table-bordered table-dark"
>
  <thead>
    <tr>
      <th scope="col">First Name</th>
      <th className="fw-normal" scope="col">
      {current.firstName}
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Last Name</th>
      <td>{current.lastName}</td>
    </tr>
    <tr>
      <th scope="row">Telephone</th>
      <td>{current.phone}</td>
    </tr>
    <tr>
      <th scope="row">Email</th>
      <td>{current.email}</td>
    </tr>
    <tr>
      <th scope="row">Gender</th>
      <td>{current.gender}</td>
    </tr>
    <tr>
      <th scope="row">Age</th>
      <td>{current.age}</td>
    </tr>
    <tr>
      <th scope="row">Country</th>
      <td>{current.country}</td>
    </tr>
    <tr>
      <th scope="row">Created on</th>
      <td><Moment format="D MMM YYYY">{current.createdAt}</Moment></td>
    </tr>
    <tr>
      <th scope="row">Last Update</th>
      <td><Moment format="D MMM YYYY">{current.updatedAt}</Moment></td>
    </tr>
  </tbody>
</table>
</section>


  </main>
</>
);}

  if(!current) {return(<div>Loading...</div>)};
}

export default View;
