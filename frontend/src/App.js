
import 'bootstrap/dist/css/bootstrap.min.css';
/* The following line can be included in a src/App.scss */

import {
  createBrowserRouter,
  createRoutesFromElements,


  
  Route,
  RouterProvider,
  
} from "react-router-dom"
import Root from './pages/Root';
import Welcome from './pages/welcome/welcome';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import Home from './pages/home/home';


import Add from './pages/home/add/add';
import View from './pages/home/view/view';
import Edit from './pages/home/edit/edit';






function App() {


  



  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} >
      <Route index element={<Welcome/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>;
       <Route path="/home" element={<Home/>} /> 
       <Route path="/addcustomers" element={<Add/>} /> 
       <Route path="/home/view/:id" element={<View/>} /> 
       <Route path="/edit/:id" element={<Edit/>} /> 
  
      </Route>
    )
  );


  return (
    <RouterProvider router={router} />
  );
}

export default App;
