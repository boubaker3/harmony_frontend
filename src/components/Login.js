import React, { useState } from 'react'
import { Input,Box,Grid,Checkbox,FormControlLabel,Button,Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
export default function Login() {

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const navigate=useNavigate(); 
const [loading, setLoading] = useState(false);

const sendLoginInputs=(event)=>{
    event.preventDefault();
    setLoading(true);
    axios.post("http://localhost:8000/api/login", {email:email, password:password}, 
    {headers:{"Content-Type": "application/json",
  
    }})
    .then(response => {
      setLoading(false);
      sessionStorage.setItem("token",response.data.token);
      sessionStorage.setItem("user",JSON.stringify(response.data.user));
      navigate("/");
    })
    .catch(error => {
      setLoading(false);
    });
  }

  return (
    <form onSubmit={sendLoginInputs}>

    <Box sx={{height:"450px",width:{xs:"450px",sm:"450px",md:"500px",lg:"500px",xl:"500px"},boxShadow:' rgba(149, 157, 165, 0.2) 0px 8px 24px',  borderRadius: "20px",marginTop:"50px",left:"0",right:"0",marginRight:"auto",marginLeft:"auto" }}>
     <Grid container>
      
      <Grid  xs={12}>
      
      <Input onChange={(event)=>setEmail(event.target.value)} name="email" disableUnderline={true}   sx={{ width:"100%",paddingLeft:"50px",paddingRight:"50px",paddingTop:"50px"}} id='input'  placeholder='Email'></Input>
      </Grid>
      <Grid xs={12}>
      <Input type="password" onChange={(event)=>setPassword(event.target.value)} name="password" disableUnderline={true} sx={{ marginTop:"20px",width:"100%",paddingLeft:"50px",paddingRight:"50px",paddingBottom:"50px"}} id='input'  placeholder='Password'></Input>
      </Grid>
      <Grid xs={12}>

     <FormControlLabel sx={{paddingLeft:"50px" }} control={<Checkbox  />} label="Stay Logged in"/>
     </Grid>
     <Grid xs={5}>
     { loading&&  <CircularProgress style={{ color: 'var(--yellow)' ,margin:"20px auto",display:"block",marginTop:"45px"}} />}

     
     </Grid>
     <Grid xs={6}>

     <Button type="submit"     disableElevation variant='contained' sx={{paddingLeft:"60px",paddingRight:"60px" ,margin:"50px",color:"white",borderRadius:"38px"
     ,fontFamily:"Montserrat",fontSize:"18px"}}>Login</Button>
     </Grid>    
      </Grid>   
      
      </Box>
      </form>

  )
}
