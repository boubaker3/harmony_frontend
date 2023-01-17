import React from 'react'
import './Styles/Search.css';
import { Avatar , Typography,Button ,Box  ,FormControl,Select,MenuItem ,Grid,Input,InputAdornment} from '@mui/material';
import {useState,useEffect} from 'react';
  import NotificationsItem from './NotificationsItem';
  import axios from 'axios';
export default function Notifications() {
 const [orders,setOrders]=useState([]);   
 const user=JSON.parse(sessionStorage.getItem("user"));
useEffect(()=>{ 
  axios.get(`http://localhost:8000/api/retrieveOrders?userid=${user.userid}`)
  .then(response => {
    setOrders(response.data.orders);
  
  })
  .catch(error => {
    console.log(error.response.data);
  });
},[orders]);
return (
    < > 
    <Grid container sx={{height:"100%",width:"100%"}}>
    <Grid xs={12} md={6}>
    <Typography sx={{fontFamily:"Bungee Inline",fontWeight:"bold",fontSize:{xs:"24px",md:"28px",lg:"32px"}}} variant='h1'>Your Orders</Typography>
    </Grid>
    

    <Grid xs={12} >
<Box sx={{marginTop:"50px"}}>
 {orders.map((notification)=> <NotificationsItem  item={notification}/>)}
   </Box>
     </Grid>
   
          </Grid>
    </ >
  )
}