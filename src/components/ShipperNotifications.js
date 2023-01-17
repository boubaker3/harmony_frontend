import React from 'react'
import './Styles/Search.css';
import { Avatar , Typography,Button ,Box  ,FormControl,Select,MenuItem ,Grid,Input,InputAdornment} from '@mui/material';
import {useState,useEffect} from 'react';
import ShipperNotificationsItem from './ShipperNotificationItem';
import axios from "axios";

export default function ShipperNotifications() {
  
const user=JSON.parse(sessionStorage.getItem("user"));
  const [notifications,setNotifications]=useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/retrieveShipperNotifications?userid=${user.userid}`)
    .then((response)=>{
    setNotifications(response.data.notifications);
    console.log(response.data.notifications)
    }).catch((error)=>{
    console.log(error.response.data)
    });
    },[]);
  
  
  return (
      < > 
      <Grid container sx={{height:"100%",width:"100%"}}>
      <Grid xs={12} md={6}>
      <Typography sx={{fontFamily:"Bungee Inline",fontWeight:"bold",fontSize:{xs:"24px",md:"28px",lg:"32px"}}} variant='h1'>Notifications</Typography>
      </Grid>
      
  
      <Grid xs={12} >
  <Box sx={{marginTop:"50px"}}>
   {notifications.map((notification)=> <ShipperNotificationsItem  item={notification}/>)}
     </Box>
       </Grid>
     
            </Grid>
      </ >
    )
  }