import React from 'react'
  import { Avatar , Typography,Button , Grid,Box   } from '@mui/material';
   import  Carousel from 'react-elastic-carousel';
import {useLocation} from "react-router-dom";
import {useState,useEffect} from 'react';
import axios from "axios";
import ChatRoom from './ChatRoom';
import {Link} from "react-router-dom";
export default function Chat() {
  const breakPoints = [
    { width: 1, itemsToShow: 1  },
    { width: 550, itemsToShow: 1  },
    { width: 850, itemsToShow: 3 },
    { width: 1150, itemsToShow: 3  },
    { width: 1450, itemsToShow: 3 },
    { width: 1750, itemsToShow: 3 },
  ];
    
const [messagedUsers,setMessagedUsers]=useState([]);

const url=new URLSearchParams(useLocation().search);
const userid=url.get("userid");
const user=JSON.parse(sessionStorage.getItem("user"));
useEffect(()=>{
  axios.get(`http://localhost:8000/api/retrieveMessagedUsers?userid=${user.userid}`)
  .then(response => {
    setMessagedUsers(response.data.messagedUsers);
    })
  .catch(error => {
    
  });
}, []);
return (
    < >
    <Grid container>
    <Grid xs={12}  md={3}>
    <Typography sx={{fontFamily:"Bungee Inline",fontWeight:"bold",fontSize:{xs:"24px",md:"28px",lg:"32px"}}} variant='h1'>Chat</Typography>
    </Grid>
    <Grid xs={12} md={9} > 
    <Carousel  itemPadding={[1, 5]} breakPoints={breakPoints}>
{messagedUsers.map(user=>
 <Box sx={{display:" block", width:"300px",height:"80px",borderRadius:"24px",padding:"5px",
backgroundColor:"#F4F4F4"   }}>
  
       <Avatar src={user.photo} sx={{width: "50px" ,height:"50px" ,borderRadius:"50%",display:"inline-block",verticalAlign:"middle"}}> </Avatar>
 
         <Typography sx={{fontFamily:"Montserrat",color:"gray",verticalAlign:"middle",display:"inline-block" }}    >
        {user.name}
        </Typography>
        
        <Button component={Link} to={{pathname:"/chat",search:`?userid=${user.userid}`}} disableElevation variant='contained' 
          sx={{  margin:"auto",color:"white" ,width:"120px"
       ,fontFamily:"Montserrat",fontSize:"12px", 
        display:"block" }} >Join Chat</Button>
          
     
  
  </Box> ) }
  </Carousel>
</Grid>    
{userid&&(
  <Grid xs={12}   > 
 <ChatRoom/>
</Grid>  
)}
  

</Grid>    

    </ >
  )
}





