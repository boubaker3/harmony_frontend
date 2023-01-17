import './App.css';
import React, { useEffect } from 'react';
import Welcome from './components/Welcome';
import ChooseUser from './components/ChooseUser';
import RegisterTab from './components/RegisterTab';
import UploadPicture from './components/UploadPicture';
import Main from './components/Main';
import Login from './components/Login';
import Signup from './components/Signup'
import HomePage from "./components/Home";
import ChefHomePage from "./components/ChefHomePage";
import AddProduct from "./components/AddProduct";
import SearchPage from './components/Search'
import NotificationsPage from './components/Notifications';
import ChefNotificationsPage from './components/ChefNotifications';
import ShipperNotificationsPage from './components/ShipperNotifications';
import ShipperProfilePage from './components/ShipperProfile';
import ChefProfilePage from './components/ChefProfile';
import ProfilePage from './components/Profile';
import ChatPage from './components/Chat';
import ProductDetails from './components/ProductDetails';
import {  Routes , Route } from 'react-router-dom';
import { useNavigate,useLocation } from 'react-router-dom';
 function App() { 
   const user=JSON.parse(sessionStorage.getItem("user"));
   const navigate=useNavigate();
  useEffect(()=>{
    if(user==null){
      navigate("/welcome");
     }
  },[]);
  const query = new URLSearchParams(useLocation().search);
  const userid = query.get('userid');
   return (
    < >
  
    <Routes>
      {
        user!==null&&(
          <Route path='/' element={ <Main/>} >

          <Route path='/' element={user.type=="client"?<HomePage/>:<ChefHomePage/>} />
         <Route path='/search' element={<SearchPage/>} />
         <Route path='/addProduct' element={<AddProduct/>} />
         <Route path='/notifications' element={user.type=="chef"?<ChefNotificationsPage/>:<ShipperNotificationsPage/>} />
         <Route path='/orders' element={<NotificationsPage/>} />
          <Route path='/clientProfile' element={<ProfilePage/>} />
         <Route path='/shipperProfile' element={ <ShipperProfilePage/> } />
        <Route path="/chefProfile" element={ <ChefProfilePage/>}/>;
         <Route path='/chat' element={<ChatPage/>} />
         <Route path='/productDetails' element={<ProductDetails/>} />
         
             </Route>
        )
        
      }
 
    <Route path='/welcome' element={<Welcome/>} />
    <Route path='/chooseAccount' element={<ChooseUser/>} />
      <Route  path='registration' element={<RegisterTab/>} >
      <Route path='login' element={<Login/>} />
      <Route path='signup' element={<Signup/>} /> 

      </Route>
      <Route path='/uploadPicture' element={<UploadPicture/>} />

    </Routes>
      
    </ >
  );
}

export default App;
