import React from 'react'
import { Tab,Box ,Grid  } from '@mui/material'
import { TabContext, TabList } from '@mui/lab';
import { BrowserRouter,Routes , Route, Link, Outlet } from 'react-router-dom';
 import Login from './Login';
import Signup from './Signup';
import Logo from './Assets/Logo.png';

export default function RegisterTab( ){
    const [value, setValue] = React.useState(0);
    const [tabTxtColor, setTabTxtColor] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <Grid container> 
        <Grid xs={12}>
        <Box sx={{width:{xs:"200px",sm:"200px",md:"400px",lg:"400px",xl:"500px"},padding:"5px"  }} >
         <img id='logo' src={Logo} />
         <div id='container1'>
  
         <h6>Harmony</h6>
         </div>
         </Box>
        </Grid>
        
           <Box  sx={{    marginTop:"2%",
 left:"0",right:"0",marginRight:"auto",marginLeft:"auto",}}>
<Grid xl={12}> 
    
 
       <TabContext  value={value} >
  

  
  <TabList   TabIndicatorProps={{sx:{height:"50px",borderRadius:"38px", }}} onChange={handleChange}  >
  
  <Tab component={Link}  to='/registration/login'  onClick={()=>{setTabTxtColor(0)}}  sx={{width:{xs:"200px",sm:"250px",md:"250px",lg:"250px",xl:"250px"},zIndex:"100", 
  color: tabTxtColor==0?"white !important":"gray !important",fontSize:"18px",fontWeight:"bold"}} label="Login" />
   
  <Tab component={Link}  to='/registration/signup'  onClick={()=>{setTabTxtColor(1)}} sx={{width:{xs:"200px",sm:"250px",md:"250px",lg:"250px",xl:"250px"},zIndex:"100", color: tabTxtColor==1?"white !important":"gray !important",fontSize:"18px",fontWeight:"bold"}} label="Signup"   />
  </TabList>
 
  </TabContext>
   
 <Outlet/>
   
   </Grid>  
   </Box>
   
   </Grid>
);
}
