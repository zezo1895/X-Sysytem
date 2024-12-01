import React, { useEffect, useState } from 'react';
import Theme from '../../comp/theme';
import Side from '../../comp/side';
import {  useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../edit/edit.css"
import Snav from '../../comp/snav';



const country_list = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const Edit = () => {
  let { id } = useParams();

  // const [firstName,setfirstName]=useState('')
  // const [lastName,setlastName]=useState(null)
  // const [email,setemail]=useState(null)
  // const [phone,setphone]=useState(null)
  // const [age,setage]=useState(null)
  // const [country,setcountry]=useState(null)
  // const [gender,setgender]=useState(null)

  
  const [current, setCurrent] = useState({firstName:'',lastName:'',email:'',age:'',phone:'',gender:'',country:''});
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;




  useEffect(() => {
  
      fetch()
  
  
    
    
  }, []);
  const fetch =async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/edit/${id}`);
    
      if(response.data.status){setCurrent(response.data.info)}
      
        
       if(response.data.status===false) {
        navigate("/login")
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
const handelchange = (eo) => {
  const clone ={...current}

  clone[eo.target.name]=eo.target.value;
  console.log(clone);
  setCurrent(clone)
  
  
}



  





  const handelsubmit = async (eo) => {
  
    eo.preventDefault();
    
    axios.defaults.withCredentials = true;
    
try{
    const response=await axios.put(`http://localhost:5000/api/edit/data/${id}`,
    current
      );
      if(response.data.action===true){
        console.log("lasttttttttttttttttttttt");
        navigate("/home")
      }if(response.data.status===false){
        navigate("/login")
      }
      console.log(response.data);
    
      
    } catch (error) {
      console.log(error);
    }

  };

  










if(id){
  return (
    <>
    <Theme />
    <main className="d-flex flex-nowrap h-100">
      <Side />
      <>
  <section className="w-100">
  <Snav/>
    <form
      onSubmit={handelsubmit}
      
      className="mx-0 row gx-3 gy-4 mt-2"
    >
      <div className="col-md-6">
        <label htmlFor="inputfirstName4" className="form-label">
          First Name:
        </label>
        <input   
          value={current.firstName }
          onChange={handelchange}
          name="firstName"
          type="text"
          className="form-control"
          id="inputfirstName4"
        
      
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputlastName4" className="form-label">
          Last Name:
        </label>
        <input 
      value={current.lastName}
      onChange={handelchange}
          type="text"
          className="form-control"
          id="inputlastName4"
          name="lastName"
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputemail4" className="form-label">
          Email:
        </label>
        <input 
          value={current.email}
          onChange={handelchange}
          type="email"
          className="form-control"
          id="inputemail4"
          name="email"
      
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputtele4" className="form-label">
          Telephone:
        </label>
        <input  
        value={current.phone}
        onChange={handelchange}
          type="number"
          className="form-control"
          id="inputtele4"
          name="phone"
        />
      </div>
      <div>
        <div className="col-md-6">
          <label htmlFor="inputage4" className="form-label">
            Age:
          </label>
          <input 
          onChange={handelchange}
        
        value={current.age}
            type="number"
            className="form-control"
            id="inputage4"
            name="age"
          
          />
        </div>
      </div>
      <div>
        <div className="col-md-6">
          <label htmlFor="inputCountry" className="form-label">
            Country:
          </label>
          <select  
          onChange={handelchange}
                  id="inputCountry"
                  className="form-select"
                  name="country"
                  value={current.country}
                >
                  <option  selected hidden="" disabled="">
                    Choose here ...
                  </option>
                  {country_list.map((item) => {
                  return(  <option className= {` ${item===current.country? "selected":null}`}>{item}</option>)
                  })} ;
                </select>
        </div>
      </div>
      <div>
        <div className="col-md-6">
          <label htmlFor="inputGender" className="form-label">
            Gender:
          </label>
          <select 
          onChange={handelchange} value={current.gender} name="gender" id="inputGender" className="form-select">
            <option selected="" hidden="" disabled="">
              Choose here ...
            </option>
            <option className={`${current.gender ==="Male"? "selected":null}`}>Male</option>
            <option className={`${current.gender ==="Female"? "selected":null}`}>Female</option>
          </select>
        </div>
      </div>
      <div className="col-12">
    
          <button type='submit'  className="btn btn-primary">
            Update changes
          </button>
      
    
      </div>
    </form>
  
        <form onSubmit={async(eo) => {
                eo.preventDefault();
                try{
                  const response=await axios.delete(`http://localhost:5000/api/edit/${id}`,
                  
                    );
                    console.log(response.data);
                    if(response.data.deleteed
                      ===true){
                      
                      navigate("/home")
                    }if(response.data.status===false){
                      navigate("/login")
                    }
                  
                  
                    
                  } catch (error) {
                    console.log(error);
                  }
            }}>
            <button 
            
            
              type='submit'
              className="btn btn-danger m-3"
            
            >
              Delete Customer
            </button>
        </form >
  
  </section>
  {/* Modal */}
  

</>

    </main>
  </>
  );
  
}
if(!id){
  return(<div>loadingAnddel........</div>)
}
}


export default Edit;
