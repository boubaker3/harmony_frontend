import React from 'react'
import {useState,useEffect} from 'react';
import {useLocation} from "react-router-dom";
import { Avatar , Typography,Button ,Input,Tab,InputAdornment,Box,Divider  } from '@mui/material';
 import Chat from '@mui/icons-material/Send'; 
import axios from "axios";
export default function ChatRoom() {
  const [sentMsg,setSentMsg ]=useState("");
 
 const url=new URLSearchParams(useLocation().search);
 const userid=url.get("userid");
 const user=JSON.parse(sessionStorage.getItem("user"));
 const [userData,setUserData]=useState({});

const [msgs,setMsgs]=useState([]);

 useEffect(()=>{
  axios.get(`http://localhost:8000/api/userdata?userid=${userid}`)
  .then(response => {
    setUserData(response.data.data);
   })
  .catch(error => {
    
  });

   
} ,[useLocation().search]);
const sendMsg=(event)=>{
  event.preventDefault();
  axios.post(`http://localhost:8000/api/sendMsg?userid=${userid}`,{sender:user.userid,msg:sentMsg})
  .then((response=>{
setSentMsg("");
  })).catch((error)=>{
  });
}
useEffect(()=>{
  axios.get(`http://localhost:8000/api/retrieveMsgs?sender=${user.userid}&receiver=${userid}`)
  .then(response => {
    setMsgs(response.data.msgs); 
    console.log(response.data.msgs);
  })
  .catch(error => {
    
  });
 },[sentMsg,useLocation().search]);
  return (
    < >
    <Box sx={{width:{xs:"450px ",md:"600px "},height:{xs:"500px",md:"580px"} ,
    borderRadius:"38px", position:"relative" ,margin:"auto"}}>

    <Avatar src={userData.photo} sx={{width:{xs:"80px"},height:"80px" ,borderRadius:"50%",display:"inline-block",verticalAlign:"middle"}}> </Avatar>
 
       
 <Typography sx={{fontFamily:"Montserrat",color:"gray",verticalAlign:"middle",display:"inline-block" }}    >
{userData.name}
</Typography>
<Divider/>

<Box sx={{ height:{xs:"350px",md:"400px"},width:"100%",padding:"10px",overflowX:"hidden",overflowY:"auto" }}>
{
  msgs.map( msg=>
<Box sx={{display:"block",marginTop:"5px"  ,width:"800px",  }}>
<Box sx={{ right:0 }}>
 
<Avatar src={user.userid==msg.sender_user_id?user.photo:msg.sender_user_photo} sx={{width:{xs:"50px"},height:"50px" ,borderRadius:"50%",display:"inline-block", }}> </Avatar>
  <Box sx={{  width:"200px" ,padding:"20px",borderRadius:"12px", backgroundColor:msg.sender_user_id==user.userid?"var(--yellow)":"#F4F4F4" , display:"inline-block" ,marginLeft:"5px",overflow:"hidden"}}>

    <Typography sx={{fontFamily:"Montserrat",color:msg.sender_user_id==user.userid?"white":"gray" }}    >
   {msg.msg}
   </Typography>
   </Box>
   <Typography sx={{fontFamily:"Montserrat",color:"gray",fontSize:"12px",opacity:"0.7",display:"inline-block" }}    >
   {msg.created_at}
   </Typography>
   <Typography sx={{fontFamily:"Montserrat",color:"gray",fontSize:"12px",opacity:"0.7", }}    >
   {msg.status==0?"not seen yet":"seen"}
   </Typography>
   </Box>
  
</Box>
     )
}
</Box>
<form onSubmit={sendMsg}>

<Input value={sentMsg} onChange={(event)=>{setSentMsg(event.target.value)}} 
sx={{backgroundColor:"#F4F4F4",width:"500px",borderRadius:"12px",paddingRight:"100px",height:"50px", bottom:"0",position:"absolute"
     ,marginTop:"20px" }}    disableUnderline  autoFocus  placeholder='write something...' 
     startAdornment={<InputAdornment  position='start'> 
     <Button type='submit' variant='contained' disableElevation sx={{backgroundColor:"#EDBB00" , height:"50px",borderRadius:"12px",justifyContent:"center",alignItems:"center",display:"flex"}}>
      <Chat sx={{ color:"white",width:"40px",height:"40px", }}/></Button> </InputAdornment>}> </Input>
      </form>

    </Box>
    
    </ >
  )
}
