import React, { useEffect } from 'react'
import cover from './Assets/restauCover.jpg';
import logo from './Assets/restauLogo.jpeg';
import { TabContext, TabList,TabPanel } from '@mui/lab';
import { Avatar , Typography,Button , Grid,Input,Tab,Chip,Box,Divider  } from '@mui/material';
import './Styles/Profile.css';
import { useState,  } from 'react';
import './Styles/RestaurentItem.css'; 
import { useLocation } from 'react-router-dom';
import NotificationsItem   from './NotificationsItem';
import axios from "axios";
import PublicIcon from '@mui/icons-material/Public';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import RestaurentItem  from './RestaurentItem';
import {Link} from "react-router-dom";
export default function Profile() {
  const [email,setEmail]=useState("");
  const [name,setName]=useState("");
   const [country,setCountry]=useState("");
  const [city,setCity]=useState("");
  const [address,setAddress]=useState("");
  const [phone,setPhone]=useState("");
  const [newPassword,setNewPassword]=useState("");
  const [oldPassword,setOldPassword]=useState("");
  const [open,setOpen]=useState(true);
  const data=[{"text":"country","icon":PublicIcon},{"text":"city","icon": LocationCityIcon },
  {"text":"address","icon": HomeIcon },{"text":"phone","icon": LocalPhoneIcon },{"text":"email","icon": EmailIcon }];
  const [userData,setUserData]=useState([]);
  const query = new URLSearchParams(useLocation().search);
  const userid = query.get('userid');
  const user=JSON.parse(sessionStorage.getItem("user"));
  const NotificationsData=[{name:"Montana",city:"new york",country:"United States",address:"Boulevard 19",
  photo:"https://img.freepik.com/premium-vector/restaurant-logo-design-template_79169-56.jpg?w=2000",cover:"https://media-cdn.tripadvisor.com/media/photo-s/05/ac/6a/91/restaurant-le-velocipede.jpg",rating:"4.5"},{name:"Grill",city:"new york",country:"AmeUnited Statesrica",address:"Boulevard 19",
  photo:"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/chef-food-restaurant-logo-editable-design-template-949091af7f6dc8b1fc80d8669faab4d6_screen.jpg?ts=1619030187",cover:"https://www.imperium-ouvertures.fr/wp-content/uploads/2019/09/imperium-ouvertures-chantier-restaurant-veranda2.jpg",rating:"4.5"},{name:"Shawarma",city:"new york",country:"United States",address:"Boulevard 19",
  photo:"https://thumbs.dreamstime.com/b/restaurant-logo-design-idea-chef-hat-fork-graphic-leaf-shape-food-drinks-symbol-concept-cooking-eating-vector-template-173237325.jpg",cover:"https://tybraz.fr/wp-content/uploads/2016/03/final.jpg",rating:"4.5"},{name:"Barbecue",city:"new york",country:"United States",address:"Boulevard 19",
  photo:"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/restaurant-logo-design-template-08a68b9418adeb6c8599892284a22ef1_screen.jpg?ts=1599559226",cover:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_WKdQVGDyhQltS_pqWjBkw1ypSI6qMn5A_Q&usqp=CAU",rating:"4.5"},{name:"Thai Tanic",city:"new york",country:"United States",address:"Boulevard 19",
  photo:"https://s3.amazonaws.com/thumbnails.venngage.com/template/6114cd0a-e706-4e1b-85b5-8aca4c480570.png",cover:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS1MM5vrQgmFMfcw6i04QbBli7gRU5E5xrEr9LVKlwODZituE7bxLrkUiwjZn8AUDXyfY&usqp=CAU",rating:"4.5"},{name:"The Chef In the Hat",city:"new york",country:"United States",address:"Boulevard 19",
  photo:"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/cooking-restaurant-logo-editable-design-template-1937334dced5f5057b812d746dbffc28_screen.jpg?ts=1597223944",cover:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbMtA38UFSKMjpBcNaa6wx-LQNRXTXrUKk5hxZDmRfkolZTUD52TmfjzWRs0Ec8l76tA&usqp=CAU",rating:"4.5"},];
  const [value, setValue] =useState("1");
 const [error,setError]=useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
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
<Avatar src={ userData.photo} sx={{borderRadius:"100%",width:{xs:"80px",lg:"100px"},height:{xs:"80px",lg:"100px"},marginLeft:"20px", marginTop:"100px",border:"var(--yellow) 4px solid"}}>

</Avatar>
      <form onSubmit={updateProfile}>
 
         <Grid container>
          <Grid xs={12} md={8} >  
          <Typography   sx={{fontFamily:"Montserrat",fontWeight:"bold",marginLeft:"20px"  }} variant="h5"   >
         {userData.name}</Typography> 
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
{userid==user.userid&&(
  <>

<Grid xs={12} xl={4}>
<Button  disableElevation variant='contained' sx={{paddingLeft:"40px",paddingRight:"40px",  color:"white",borderRadius:"38px"
,fontFamily:"Montserrat",fontSize:"14px",justifyContent:"center", marginLeft: "auto",
marginRight: "auto",marginTop:"10px"}} onClick={()=>{setOpen(false)}} disabled={!open}>Edit Profile</Button>
  </Grid>
  <Grid xs={12} xl={4}>
  <Button type='submit' disableElevation variant='contained' sx={{paddingLeft:"25px",paddingRight:"25px",  color:"white",borderRadius:"38px"
,fontFamily:"Montserrat",fontSize:"14px",justifyContent:"center", marginLeft: "auto",
marginRight: "auto",marginTop:"10px" }}   disabled={open}>Update Profile</Button>
</Grid>

</>

)}

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
    <TabContext   value={value} >
  <Grid xs={12} sx={{marginTop:"20px"}}>
    <TabList    onChange={handleChange}  >
  
  <Tab  sx={{ fontSize:"18px",fontWeight:"bold",fontFamily:"montserrat"}} label="Orders List" value="1"/>
   
  <Tab    sx={{  fontSize:"18px",fontWeight:"bold",fontFamily:"montserrat"}} label="Favourites"  value="2"  />
 
 
  </TabList>
    </Grid>

     
    

  </TabContext>
  </Grid>

    </Grid>
    
    </ >
  )
}
