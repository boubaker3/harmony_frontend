import React from 'react'
import cover from './Assets/restauCover.jpg';
import logo from './Assets/restauLogo.jpeg';
import { TabContext, TabList,TabPanel } from '@mui/lab';
import { Avatar , Typography,Button , Grid,Input,Tab,Chip,Box,Divider  } from '@mui/material';
 import './Styles/Profile.css';
import { useState,useEffect } from 'react';
 import './Styles/RestaurentItem.css'; 
 import StarIcon from '@mui/icons-material/Star';
  import   NotificationsItem   from './NotificationsItem';
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import {Link} from "react-router-dom";
import RestaurentItem  from './RestaurentItem';
 import PublicIcon from '@mui/icons-material/Public';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
export default function ShipperProfile() {
  const [email,setEmail]=useState("");
  const [name,setName]=useState("");
   const [country,setCountry]=useState("");
  const [city,setCity]=useState("");
  const [address,setAddress]=useState("");
  const [phone,setPhone]=useState("");
  const [newPassword,setNewPassword]=useState("");
  const [oldPassword,setOldPassword]=useState("");
  const user=JSON.parse(sessionStorage.getItem("user"));
  const query = new URLSearchParams(useLocation().search);
  const userid = query.get('userid');
  const [openDialog, setOpenDialog] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error,setError]=useState('');
  const [open,setOpen]=useState(true);
  const [userData,setUserData]=useState({});
  const data=[{"text":"country","icon":PublicIcon},{"text":"city","icon": LocationCityIcon },
  {"text":"address","icon": HomeIcon },{"text":"phone","icon": LocalPhoneIcon },{"text":"email","icon": EmailIcon }];
  
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/userdata?userid=${userid}`)
    .then(response => {
      setUserData(response.data.data);
      setName(userData.name);
      setEmail(userData.email);
       setCountry(userData.country);
      setCity(userData.city);
      setAddress(userData.address);
      setPhone(userData.phone);
    })
    .catch(error => {
      
    });
  },[open]);


  const updateProfile=(event)=>{
    event.preventDefault()
    if(name==""||country==""||city==""||address==""||phone==""||newPassword==""||oldPassword==""){
      setError("please fill out all the fields");
    } 
    
    else{
     axios.post(`http://localhost:8000/api/updateProfile?userid=${userid}`,{name:name,email:email,country:country
     ,city:city,address:address,phone:phone,newPassword:newPassword,password:oldPassword
    })
     .then((response=>{
      setError(response.data.res);
      
      sessionStorage.setItem("user",JSON.stringify(response.data.data));
  setOpen(true);
     })).catch((error)=>{
  setError("something went wrong,pleas try again later!");
     });
    }
  
   }
  return (
    < >
    <Grid container>
    <Grid xs={12}  >
    <Typography sx={{fontFamily:"Bungee Inline",fontWeight:"bold",fontSize:{xs:"24px",md:"28px",lg:"32px"}}} variant='h1'>Profile</Typography>
    </Grid>
    <Grid xs={6}  sx={{marginTop:"20px"}}> 
    
      
       
      <Avatar src={ cover} sx={{borderRadius:"38px 38px 0  0", width:{xs:"100%",md:"75%", lg:"50%"},height:"150px",position:"absolute"}}>

</Avatar>
<Avatar src={userData.photo} sx={{borderRadius:"100%",width:{xs:"80px",lg:"100px"},height:{xs:"80px",lg:"100px"},marginLeft:"20px", marginTop:"100px",border:"var(--yellow) 4px solid"}}>

</Avatar>
      
      <form onSubmit={updateProfile}>

         <Grid container>
          <Grid xs={12} md={8} >  
          <Typography   sx={{fontFamily:"Montserrat",fontWeight:"bold",marginLeft:"20px"  }} variant="h5"   >
         {name}</Typography> 
         </Grid>

         {userid!=user.userid&&(
              <Grid xs={12} md={4} >  
              <Button component={Link} to={{pathname:"/chat",search:`?userid=${userid}`}}  disableElevation variant='contained' sx={{paddingLeft:"25px",paddingRight:"25px",  color:"white",borderRadius:"38px"
           ,fontFamily:"Montserrat",fontSize:"14px",justifyContent:"center", marginLeft: "auto",
           marginRight: "auto"  }}  >Join Chat</Button>
             </Grid>
           )}
            
         <Grid xs={12}  >
            <Input required className='InputProfile' placeholder='name' sx={{display:open&&"none"}}   value={name} onChange={(event)=>setName(event.target.value)} disabled={open}></Input>
            </Grid>
           
            <Grid xs={12}  >
      <Input required className='InputProfile' placeholder='country' sx={{display:open&&"none"}} onChange={(event)=>setCountry(event.target.value)} value={country} disabled={open}></Input>
             </Grid>
            
            <Grid xs={12}  >
      <Input required className='InputProfile' placeholder='city' sx={{display:open&&"none"}} onChange={(event)=>setCity(event.target.value)}  value={city} disabled={open}></Input>
            </Grid>
            
            <Grid xs={12} >
      <Input required className='InputProfile' placeholder='address' sx={{display:open&&"none"}} onChange={(event)=>setAddress(event.target.value)} value={address} disabled={open}></Input>
            </Grid>
            <Grid xs={12} >
      <Input required className='InputProfile'    placeholder='phone' sx={{display:open&&"none"}} onChange={(event)=>setPhone(event.target.value)} value={phone} disabled={open}></Input>
            </Grid>
            <Grid xs={12} >
      <Input required className='InputProfile' placeholder='old password' type='password' sx={{display:open&&"none"}} onChange={(event)=>setOldPassword(event.target.value)} value={oldPassword} disabled={open}></Input>
            </Grid>
            <Grid xs={12} >
      <Input  required className='InputProfile' placeholder='new password' type='password'  sx={{display:open&&"none"}} onChange={(event)=>setNewPassword(event.target.value)} value={newPassword} disabled={open}></Input>
            </Grid>
            <Divider sx={{marginTop:"25px",marginBottom:"25px"}} />

        {user.userid==userid&&(<>
        
          <Grid xs={12} xl={4}>
         <Button  disableElevation variant='contained' sx={{paddingLeft:"40px",paddingRight:"40px",  color:"white",borderRadius:"38px"
       ,fontFamily:"Montserrat",fontSize:"14px",justifyContent:"center", marginLeft: "auto",
       marginRight: "auto",marginTop:"10px"}} onClick={()=>{setOpen(false)}} disabled={!open}>Edit Profile</Button>
            </Grid>
            <Grid xs={12} xl={4}>
            <Button type="submit"  disableElevation variant='contained' sx={{paddingLeft:"25px",paddingRight:"25px",  color:"white",borderRadius:"38px"
       ,fontFamily:"Montserrat",fontSize:"14px",justifyContent:"center", marginLeft: "auto",
       marginRight: "auto",marginTop:"10px" }}  disabled={open}>Update Profile</Button>
          </Grid>
          </>)} 
          <Grid xs={12}>
           <Typography sx={{fontFamily:"Montserrat", fontSize:"12px",display:"inline-block"}}  >
       {error} 
        </Typography>
           </Grid>
           </Grid>
           </form>

    </Grid>
    <Grid xs={12} >
    {
      data.map((item)=><Typography color="black" sx={{display:{xs:"block",md:"inline-block",verticalAlign:"middle"},marginLeft:"25px"}}>
                      {<item.icon sx={{verticalAlign:"middle"}}/>} {userData[item.text]}</Typography>)
    }</Grid>
    <Grid xs={12}  sx={{marginTop:"20px"}}> 
   
  </Grid>

    </Grid>
    
    </ >
  )
}
