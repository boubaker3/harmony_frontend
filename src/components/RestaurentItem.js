import * as React from 'react';
 import CardContent from '@mui/material/CardContent'; 
import { Avatar , Typography,Button,Card,Box,Chip } from '@mui/material';
import './Styles/RestaurentItem.css';
import { Link } from 'react-router-dom';
 import StarIcon from '@mui/icons-material/Star';
 export default function RestaurentItem( props) {
  return (
    < >
      <Card  className='Card' 
       sx={{ width:{xs:"300px",sm:"300px"},boxShadow: "rgba(149, 157, 165, 0.5) 0px 8px 24px",borderRadius:"38px",padding:"10px",marginBottom:"50px",marginTop:"50px"
       }}>
      
      <Chip sx={{backgroundColor:"white",color:"black",fontWeight:"bold",fontSize:"16px" }} icon={<StarIcon sx={{color:"var(--yellow) !important",width:"35px",height:"35px"}} />} label={props.restaurent.rating} />
      <Avatar src={props.restaurent.cover} sx={{borderRadius:"38px 38px 0  0",width:{xs:"300px",sm:"300px"},height:"120px",position:"absolute"}}>

</Avatar>
<Avatar src={props.restaurent.photo} sx={{borderRadius:"100%",width:" 80px",height:"80px",left:"0",right:"0",margin:"auto",marginTop:"75px"}}>

</Avatar>
      
      <CardContent>
        <Typography sx={{fontFamily:"Montserrat",fontWeight:"bold",textAlign:"center",marginTop:"10px"}} gutterBottom variant="h5" component="div">
        {props.restaurent.name}
        </Typography>
        <Box sx={{}}>
        <Typography sx={{fontFamily:"Montserrat", fontSize:"16px"}} gutterBottom variant="h6" component="div">
        {props.restaurent.country}
        </Typography>
       
        <Typography sx={{fontFamily:"Montserrat", fontSize:"16px"}} gutterBottom variant="h6" component="div">
        City: {props.restaurent.city}
        </Typography>
        
        <Typography sx={{fontFamily:"Montserrat"  ,color:"gray",fontSize:"16px"}} gutterBottom variant="h6" component="div">
        Adress: {props.restaurent.address}
        </Typography>
        </Box>
        <Button component={Link} to={{pathname:"/chefProfile",search:`?userid=${props.restaurent.userid}`}}  disableElevation variant='contained' sx={{paddingLeft:"40px",paddingRight:"40px",  color:"white",borderRadius:"38px"
       ,fontFamily:"Montserrat",fontSize:"18px",justifyContent:"center", marginLeft: "auto",textAlign:"center",
       marginRight: "auto",display:"block",marginTop:" 25px",}}  >Visite profile</Button>
          
     
      </CardContent>
     
  </Card>
    </ >
  )
}
