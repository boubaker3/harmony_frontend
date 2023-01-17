 

import React from 'react';
import Logo from './Assets/Logo.png';
import Cover from './Assets/cover.png';
 import CardContent from '@mui/material/CardContent'; 
import StarIcon from '@mui/icons-material/Star';
import  Carousel from 'react-elastic-carousel';
import communicationService from "./Assets/communicationService.png";
import connectionService from "./Assets/connectionService.png";
import orderService from "./Assets/orderService.png";
import ratingService from "./Assets/ratingService.png";
import Container from "@material-ui/core/Container";
  import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
 import  {  Link,   } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
 import './Styles/welcome.css';
import {Box,Typography,Button,Avatar,Grid,Tab,Card,Chip, Divider} from '@mui/material'; 
import { TabContext, TabList  } from '@mui/lab';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
const useStyles=makeStyles({
  root:{
    "&:hover":{
      backgroundColor:"#EDBB00"
    }
  }
});

export default function Welcome() {
 
  const reviews=[{name:"jack" ,
photo:"https://i.pinimg.com/736x/d6/b7/c5/d6b7c51673311522121f4b06c6b31cb4.jpg" ,rating:4.5,review:"Good job keep growing"}, 
{name:"benjamin" ,
photo:"https://i.pinimg.com/564x/50/67/86/5067861b339e3a4bab9ace75e7f80ea9.jpg" ,rating:4.7,review:"the website is well orgonized,i love it"}, 
{name:"liza" ,
photo:"https://i.pinimg.com/564x/4f/88/b0/4f88b0811823023608b7b1d7046c37f9.jpg" ,rating:4.2,review:"i had a great experience with this website"}, 
{name:"brad" ,
photo:"https://i.pinimg.com/564x/4d/d5/8d/4dd58decc0466df1141db527882a6bf2.jpg" ,rating:4.0,review:"keep up the great job"}, 
];
const servicesData=[{text:" Create a connection between restaurents and their clients",img:connectionService},
                      {text:"Facilitate ordering from restaurents using sample and beautiful UI ",img:orderService},
                      {text:"Show the quality of the restaurents by the rating and feedbacks feature",img:ratingService},
                      {text:"Facilitate communication between restaurents chefs and their shippers ",img:communicationService}];
const footerLinks = ["Home", "Reviews", "Services", "Contact us", "How it works?", "Login","Signup"];

const breakPoints = [
  { width: 1, itemsToShow: 1   },
  { width: 550, itemsToShow: 1   },
  { width: 850, itemsToShow: 2 },
  { width: 1150, itemsToShow: 3  },
  { width: 1450, itemsToShow: 3 },
  { width: 1750, itemsToShow: 3 },
];
  const classes=useStyles();

 const [value, setValue] = React.useState("1");
 const [fullname,setFullname]=React.useState("");
 const [email,setEmail]=React.useState("");
 const [phonenumber,setPhonenumber]=React.useState("");
 const [message,setMessage]=React.useState("");
 const [res,setRes]=React.useState("");
 const [loading, setLoading] = useState(false);
 const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handleSubmit=(event)=>{
    setLoading(true);
    event.preventDefault();
    axios.post('http://localhost:8000/api/reviews',{fullname:fullname,email:email,phonenumber:phonenumber,message:message})
    .then(res=>{
 setRes(res.data.msg);
 setEmail("");
 setFullname("");
 setMessage("");
 setPhonenumber("");
 setLoading(false);

    }).catch(error=>{
      setRes("something went wrong!");
      setLoading(false);

    });
  }
 
  return (
   
 
    <div id="body"  >
   
    <Grid container  >  
    
    <Grid xs={12} md={6}   >  

    <Box  sx={{ backgroundColor:"white",top:0,position:"fixed",width:"100%",height:"100px" ,zIndex:"1"}}>

</Box>
       <Box sx={{width:{xs:"200px",sm:"200px",md:"400px",lg:"400px",xl:"500px"},padding:"5px" ,zIndex:" 1" ,position:"fixed",display:{xs:"none",md:"inline-block"}}} >
       <img id='logo' src={Logo} style={{ }}/>
       <div id='container1' style={{ }}>

       <h6>Harmony</h6>
       </div>
       </Box>
       </Grid>
<Grid xs={12} md={6}  >  
        <Box  sx={{ position:"fixed",zIndex:"1"}}>

        <TabContext  value={value} >
 
    
  <TabList sx={{marginTop:"40px"}}  TabIndicatorProps={{sx:{backgroundColor:" var(--yellow) !important",height:"4px"}}}   onChange={handleChange}  >
  
  <Tab href="# "   label="Home"   sx={{ fontSize:{xs:"12px",md:"16px"},fontWeight:"bold",color:"black"}}  value="1"/>
  <Tab   href="#reviews"  label="Reviews" sx={{  fontSize:{xs:"12px",md:"16px"},fontWeight:"bold",color:"black "}}   value="2"  />
  <Tab    href="#services "  label="Services" sx={{  fontSize:{xs:"12px",md:"16px"},fontWeight:"bold",color:"black   "}}  value="3"  />
   
     <Tab   href="#contactus" label="Contact us" sx={{  fontSize:{xs:"12px",md:"16px"},fontWeight:"bold",color:"black   "}}   value="4"  />
     
  <Tab    href="#Howitworks "  label="How it works?"   sx={{  fontSize:{xs:"12px",md:"16px"},fontWeight:"bold",color:"black   "}}  value="5"  />
 
  </TabList>
 </TabContext>
 
 </Box>
        </Grid>
        <Grid container sx={{height:{xs:"75vh",md:"80vh"},marginTop:{xs:"25%",md:"5%"}}}>

         <Grid id="coverContainer" xs={12} md={12}   lg={6} sx={{ height:{xs:"5vh",lg:'100vh'},zIndex:"-1"}}>
 
 <Avatar  id='cover' sx={{width:{xs:"300px",sm:"400px",md:"500px",lg:"600px",xl:"700px"},
      height:{xs:"300px",sm:"400px",md:"500px",lg:"600px",xl:"700px"},margin:"auto",position:'absolute'
      ,left: {xs:"0",md:"0"},right:{xs:"0",md:"0"},marginLeft:{xs:"auto",md:"auto",lg:"0"},marginRight:{xs:"auto",md:"auto",}}}  src={Cover} /> 

 </Grid>
       
       <Grid      md={12} lg={6}  >

       <Grid  xs={12} lg={12}>
       <Typography variant='h1' sx={{marginTop:{ xs:"25%",md:"50%",lg:"25%"},fontSize:{xs:"50px",sm:"50px",md:"50px",lg:"60px",xl:"70px"},fontFamily:'Allerta Stencil'}}>Welome to harmony</Typography>
       </Grid>

    
   
   <Grid  lg={12}>
       <Typography variant='h2' sx={{fontSize:{xs:"26px",sm:"26px",md:"30px",lg:"34px",xl:"38px"},fontFamily:'Allerta Stencil',
                                     marginTop:"10px",marginLeft:"10px"}}>make your deliveries more smooth</Typography>
      
      </Grid>


        <Button component={Link} to="/chooseAccount" className={classes.root}  variant='contained' disableElevation  color="primary"
         sx={{fontFamily:'Montserrat',width:"250px",fontStyle:"bold", 
        color:'white',marginTop:"5%",fontSize:"24px",borderRadius:"24px",padding:"10px 20px 10px 20px" }}>Get Started</Button>
      </Grid>
      </Grid>
      <Divider  ></Divider>

 
 <Grid xs={12}  sx={{marginTop:"100px"}} >
 <Typography id="reviews"variant='h2' sx={{fontSize:{xs:"26px",sm:"26px",md:"30px",lg:"34px",xl:"38px"},fontFamily:'Allerta Stencil',textAlign:"center",color:"black"
                                      }}>Reviews</Typography>
<Carousel  enableSwipe  showArrows  breakPoints={breakPoints}>
{
  reviews.map(rev=> <Card  className='Card' 
  sx={{ width:{xs:"300px",sm:"300px"},boxShadow: "rgba(149, 157, 165, 0.5) 0px 8px 24px",borderRadius:"38px",padding:"10px",marginBottom:"50px",marginTop:"50px"
  }}>
 
 
 <Avatar src={rev.photo} sx={{borderRadius:"100%",width:" 80px",height:"80px",left:"0" ,marginTop:"5px",display:'inline-block'}}>

</Avatar>
<Typography sx={{fontFamily:"Montserrat",fontWeight:"bold" ,display:'inline-block',fontSize:"18px" }} gutterBottom variant="h5" component="div">
   {rev.name}
   </Typography>
 <CardContent>
   
   <Box>
    
   <Chip sx={{backgroundColor:"white",color:"black",fontWeight:"bold",fontSize:"16px" }} icon={<StarIcon sx={{color:"var(--yellow) !important",width:"35px",height:"35px"}} />} label={rev.rating} />

   <Typography sx={{fontFamily:"Montserrat"  ,color:"gray",fontSize:"16px"}} gutterBottom variant="h6" component="div">
  {rev.review}
   </Typography>
   </Box>
   

 </CardContent>

</Card> )
}
</Carousel>

</Grid>

</Grid>
<Divider sx={{margin:"50px"}}></Divider>

<Typography id='services'variant='h2' sx={{fontSize:{xs:"26px",sm:"26px",md:"30px",lg:"34px",xl:"38px"},fontFamily:'Allerta Stencil',textAlign:"center",color:"black"
                                      }}>Services</Typography>
<Grid container>
 {
servicesData.map(serviceData=><Grid xs={12}>
<Grid xs={12}sx={{marginTop:"20px"}}> 
<Avatar src={serviceData.img} sx={{borderRadius:"0",width:{xs:"200px",md:"500px",xl:"550px"},height:{xs:"200px",md:"500px",lg:"500px"} ,marginLeft:"auto",marginRight:"auto",display:"block"}}></Avatar>
</Grid>
<Grid xs={12} sx={{marginTop:"20px"}}>
<Typography sx={{fontFamily:"Montserrat",color:"gray",margin:"auto",marginTop:"auto",marginBottom:"auto",textAlign:"center",display:"block",fontSize:{xs:"14px",md:"24px"} }} gutterBottom variant=" " component="div">
 {serviceData.text}
 </Typography>
</Grid>
</Grid>)

}
</Grid>
<Divider sx={{margin:"50px"}}></Divider>
<Typography id='contactus' variant='h2' sx={{fontSize:{xs:"26px",sm:"26px",md:"30px",lg:"34px",xl:"38px"},fontFamily:'Allerta Stencil',textAlign:"center",color:"black",margin:"50px"
                                      }}>Contact us</Typography>
                                      
                                      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form onSubmit={handleSubmit}>

           <Grid container spacing={4} >
          <Grid item xs={12}>

              <TextField
                variant="outlined"
                required
                fullWidth
                name="fullname"
                label="full name"
                type="text"
                value={fullname}
                onChange={(event)=>{setFullname(event.target.value)}}
                 autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(event)=>{setEmail(event.target.value)}}
                autoComplete="email"
              />
            </Grid>
         
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phonenumber"
                label="phone number"
                type="number"
                value={phonenumber}
                onChange={(event)=>setPhonenumber(event.target.value)}
                 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="message"
                label="message"
                type="text"
                value={message}
                onChange={(event)=>setMessage(event.target.value)}
                multiline/>
            </Grid>
            <Grid item xs={6}>

            <Button disableElevation fullWidth
              variant="contained"
              type='submit'
              color="primary"
               sx={{textAlign:"center",color:"white",fontFamily:"montserrat"}}
            >
              Submit
            </Button>
            </Grid>
            { loading&& <CircularProgress style={{ color: 'var(--yellow)' ,margin:"20px auto",display:"block"}} />}

            <Typography   sx={{fontSize:"14px",fontFamily:'Montserrat',textAlign:"center",color:"orange",margin:"50px"
                                      }}>{res}</Typography>
            </Grid>      
            
            
                  </form>

      </Container>

      <Divider sx={{margin:"50px"}}></Divider>
<Typography id="Howitworks" variant='h2' sx={{fontSize:{xs:"26px",sm:"26px",md:"30px",lg:"34px",xl:"38px"},fontFamily:'Allerta Stencil',textAlign:"center",color:"black",margin:"50px"
                                      }}>How it works?</Typography>
           
        <Box sx={{margin:"auto",width:"60%" }}>
          <Typography sx={{textAlign:"center",fontSize:"18px"}}>
          Harmony is a platform for restaurants that can create their profiles and publish their products this option for accounts under type chef about customer he has the same option to create his profile but he can just interact with the contents of the chefs (orders, rating , feedbacks, review, payment online) and finally the accounts under type shipper who receive the accepted orders by his boss to prepare them.  

          </Typography></Box>
     
     <Divider sx={{margin:"50px"}}></Divider>
        <Container sx={{ py: 8, }} maxWidth="md">
          {/* End hero unit */}
          <Grid container   spacing={4}>
         
          </Grid>
        </Container>
        <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '20vh',
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
         
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
       
        }}
      >
        <Container maxWidth="sm" >
      <Box sx={{ padding:"5px",margin:"auto",textAlign:"center" }} >
       <Avatar sx={{borderRadius:"0",width:"40px",height:'40px',display:"inline-block",verticalAlign:"middle"}}  src={Logo}></Avatar>
       

       <Typography sx={{display:"inline-block",fontFamily:"montserrat"}} variant="h6">Harmony</Typography>
        </Box>
        <Box sx={{  textAlign:"center" ,margin:"auto"}} >
        <FacebookIcon  sx={{ marginLeft:"20px"}}/>
        <InstagramIcon  sx={{ marginLeft:"20px"}}/>
        <TwitterIcon  sx={{  marginLeft:"20px"}}/>
         </Box>
         <Box spacing={4} sx={{color:"gray",width:"100%",margin:"auto",textAlign:"center"}}>
       {footerLinks.map(link=><Typography sx={{display: "inline",fontFamily:"montserrat",fontWeight:'bold',marginLeft:"10px"}}>{link}</Typography>)}

         </Box>
          <Typography variant="body2" color="text.secondary" sx={{margin:"auto",textAlign:"center"}}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        harmony      </Link>{' '}
      {new Date().getFullYear()}
      {'.'} All rights reserved
    </Typography>        </Container>
      </Box>
    </Box>
    </div>
   
  )
}
