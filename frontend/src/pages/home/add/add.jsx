import React, { useEffect, useState } from "react";
import Theme from "../../comp/theme";
import Side from "../../comp/side";

import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const Add = () => {
  const [firstName,setfirstName]=useState(null)
  const [lastName,setlastName]=useState(null)
  const [email,setemail]=useState(null)
  const [phone,setphone]=useState(null)
  const [age,setage]=useState(null)
  const [country,setcountry]=useState(null)
  const [gender,setgender]=useState(null)
  const navigate = useNavigate();


  
  const check= async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get("https://x-sysytem-api.vercel.app/api/add");
      if (response.data.status===false) {
          navigate("/login")
      } 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const submit = async (eo) => {
  
    eo.preventDefault();
    
    axios.defaults.withCredentials = true;
try{
    const response=await axios.post("https://x-sysytem-api.vercel.app/api/newCust",{
    firstName,lastName,email,age,gender,country,phone
      });
      if(response.data.status===true){
        navigate("/home")
      }if(response.data.status===false){
        navigate("/login")
      }
    
       
    } catch (error) {
      console.log(error);
    }

  };


  useEffect(() => {
    check();
  }, );
  return (
    <>
      <Theme />
      <main className="d-flex flex-nowrap h-100">
        <Side />
        <section className="w-100">
          
          <form
            method="post"
            onSubmit={submit}
            className="mx-0 row gx-3 gy-4 mt-3"
          >
            <div className="col-md-6">
              <label htmlFor="inputfirstName4" className="form-label">
                First Name:
              </label>
              <input onChange={(eo) => {
                setfirstName(eo.target.value)
              }}
                placeholder="Ali..."
                type="text"
                className="form-control"
                id="inputfirstName4"
                name="firstName"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputlastName4" className="form-label">
                Last Name:  
              </label>
              <input onChange={(eo) => {
                setlastName(eo.target.value)
              }}
                placeholder="Hassan..."
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
              <input onChange={(eo) => {
                setemail(eo.target.value)
              }}
                placeholder="ali@gmail.com"
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
              <input onChange={(eo) => {
                setphone(eo.target.value)
              }}
                placeholder={"011987899"}
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
                <input onChange={(eo) => {
                setage(eo.target.value)
              }}
                  placeholder="Your Age: ..."
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
                <select value={country} onChange={(eo) => {
                setcountry(eo.target.value)
              }}
                  id="inputCountry"
                  className="form-select"
                  name="country"
                >
                  <option  selected="" hidden="" disabled="">
                    Choose here ...
                  </option>
                  {country_list.map((item) => {
                  return(  <option>{item}</option>)
                  })} ;
                </select>
              </div>
            </div>
            <div>
              <div className="col-md-6">
                <label htmlFor="inputGender" className="form-label">
                  Gender:
                </label>
                <select value={gender} onChange={(eo) => {
                setgender(eo.target.value)
              }} id="inputGender" className="form-select " name="gender">
                  <option selected="" hidden="" disabled="">
                    Choose here ...
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default Add;
