import React  from 'react'
import { useRef } from 'react';
import {  Box,Grid,List,ListItem,ListItemIcon,Divider, Typography,Tab } from '@mui/material';
import { TabContext, TabList  } from '@mui/lab';
 import { useEffect } from 'react';
import Logo from './Assets/Logo.png';
import { useState } from 'react';
 import "./Styles/Main.css";
import Home from '@mui/icons-material/Home';
import Search from '@mui/icons-material/Search';
import Orders from '@mui/icons-material/FeaturedPlayList';
import Profile from '@mui/icons-material/Person';
import Chat from '@mui/icons-material/Send'; 
import Button from '@mui/material/Button';
 import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
 import ClickAwayListener from '@mui/material/ClickAwayListener';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {  Link, Outlet,useLocation  } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { setUser } from './redux/UserDataReducer';
 export default function Main() {
  const [selectedItem,setSelectedItem]=useState("");
  const user=JSON.parse(sessionStorage.getItem("user"));
  const userType=user.type;
  const dispatch=useDispatch();
  const {userData}=useSelector(state=>state.userData);
 const navigate=useNavigate();
 let location = useLocation();

 useEffect(() => {
  switch(location.pathname) {
    case '/':
      setSelectedItem('1');
      break;
    case '/addProduct':
      setSelectedItem('2');
      break;
    case '/notifications':
      setSelectedItem('3');
      break;
    case '/chefProfile':
      setSelectedItem('4');
      break;
    case '/chat':
      setSelectedItem('5');
      break;
    case '/clientProfile':
      setSelectedItem('4');
      break;
      case '/shipperProfile':
        setSelectedItem('4');
        break; 
      case '/orders':
        setSelectedItem('3');
        break;
       case '/search':
      setSelectedItem('2');
      break;
    default:
      setSelectedItem(null);
  }
}, [location.pathname]);
 useEffect(()=>{

       
      axios.get(`http://localhost:8000/api/userdata?userid=${user.userid}`)
      .then(response => {
        dispatch(setUser(response.data.data));
      
      })
      .catch(error => {
      });
    },[]);
 
    let pathname;

switch (userType) {
  case "client":
    pathname = "/clientProfile";
    break;
  case "chef":
    pathname = "/chefProfile";
    break;
    case "shipper":
      pathname = "/shipperProfile";
      break;
  default:
    pathname = "/";
}
    const [value, setValue] =  useState("1");
 
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [open, setOpen] =  useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if ( anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };
    function handleClosed(event) {
      if ( anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === 'Escape') {
        setOpen(false);
      }
    }
  
     const prevOpen =  useRef(open);

 
    return (
         <Grid   container >
             
             <Grid xs={6} md={9} xl={10} >
            <Box id='logocontainer' sx={{width:{xs:"200px",sm:"200px",md:"400px",lg:"400px",xl:"500px"},padding:"5px",  }} >
         <img id='logo' src={Logo} />
         <div id='container1'>
  
         <h6>Harmony</h6>
         </div>
         </Box>
        </Grid>
        <Grid xs={12}  sx={{ display: {xs:"block",md:"none"},marginTop:"120px" }}>  
        
        <TabContext   value={value} >
 
    
  <TabList TabIndicatorProps={{sx:{display:"none"}}}   onChange={handleChange}  >
  
  <Tab component={Link}  to="/"    sx={{ fontSize:"18px",fontWeight:"bold"}} icon={<Home/>} value="1"/>
 
  <Tab component={Link} to={userType=="client"||userType=="shipper"?"/search":"/addProduct"}   sx={{  fontSize:"18px",fontWeight:"bold"}} icon={userType=="client"||userType=="shipper"?<Search/>:<AddIcon/>}  value="2"  />
  <Tab   component={Link} to={userType=="client"?"/orders":"/notifications"}  sx={{  fontSize:"18px",fontWeight:"bold"}}icon={<Orders/>} value="3"  />
  <Tab  component={Link}  to={{pathname:pathname,search:`?userid=${user.userid}`}}    sx={{  fontSize:"18px",fontWeight:"bold"}}icon={<Profile/>} value="4"  />
  <Tab  component={Link} to="/chat"    sx={{  fontSize:"18px",fontWeight:"bold"}}icon={<Chat/>} value="5"  />
 

  </TabList>
 </TabContext>
        </Grid>
        <Grid xs={6} md={3} xl={2} >
 
            <Box id='infoscontainer' sx={{ padding:"5px" ,display:"inline-block" ,}} >
            <h6 style={{color:"gray",fontStyle:'normal',display:"inline-block"}}>{userData.name} </h6>

         <img id='logo' src={ userData.photo } style={{borderRadius:"20px",marginLeft:"5px" }}/>
         
         <Box sx={{display:"inline-block"}}>
        <Button sx={{ color:"var(--yellow)",borderRadius:"20px" ,height:"50px",width:"0px"}}
          ref={anchorRef}
         
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MoreVertIcon sx={{width:"35px",height:"35px"}}/>
        </Button>
        <Popper sx={{zIndex:100}}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement ===   'left top' 
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    > 
                     <MenuItem onClick={handleClose}>My account</MenuItem>
                     <MenuItem onClick={handleClose}>About us</MenuItem>
                     <MenuItem onClick={handleClose}>Security privacy</MenuItem>
                    <MenuItem onClick={()=>{ 
                                    sessionStorage.clear();
                                    navigate("/welcome")}}>Logout</MenuItem>
                    
                    
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
          </Box>
         
        </Grid>

        <Grid xs={1} sx={{visibility:{xs:"hidden",md:"visible"}}} >
        

            <Box sx={{ height:"500px"  ,margin: 0, 
  position: "fixed",
  top:" 50%",
   msTransform:" translateY(-50%)",
  transform:" translateY(-50%)",}}>
        
            <List className="list" 
      sx={{  width:  "60px" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      
    >
      <ListItem className='listItem' component={Link} to="/"  onClick={()=>setSelectedItem("1")}>
        <ListItemIcon className='listIcon' sx={{backgroundColor: selectedItem=="1"&&"var(--yellow)", 
         boxShadow: selectedItem=="1"&& "var(--yellow) 0px 8px 20px" ,  }}>
      <Home className='icon' sx={{color: selectedItem=="1"&&"white", 
        padding:selectedItem=="1"&& "10px",}}   />
        </ListItemIcon  >
       </ListItem>

      <ListItem className='listItem' component={Link} to={userType=="client"||userType=="shipper"?"/search":"/addProduct"}  onClick={()=>setSelectedItem("2")}>
        <ListItemIcon className='listIcon' sx={{ backgroundColor: selectedItem=="2"&&"var(--yellow)", 
         boxShadow: selectedItem=="2"&& "var(--yellow) 0px 8px 20px" ,  }}>
           {
        userType=="client"||userType=="shipper"?(  <Search className='icon' sx={{color: selectedItem=="2"&&"white", 
        padding:selectedItem=="2"&& "10px",}}   /> ):  <AddIcon className='icon' sx={{color: selectedItem=="2"&&"white", 
        padding:selectedItem=="2"&& "10px",}}   /> 
       } 
        </ListItemIcon>
       </ListItem>

      <ListItem  className='listItem' component={Link} to={userType=="client"?"/orders":"/notifications"} onClick={()=>setSelectedItem("3")}>
        <ListItemIcon className='listIcon' sx={{backgroundColor: selectedItem=="3"&&"var(--yellow)", 
         boxShadow: selectedItem=="3"&& "var(--yellow) 0px 8px 20px"  }}>
          {userType=="client"?(<Orders   className='icon'sx={{color: selectedItem=="3"&&"white"  ,
         padding:selectedItem=="3"&& "10px",}} /> ):<NotificationsIcon   className='icon'sx={{color: selectedItem=="3"&&"white"  ,
         padding:selectedItem=="3"&& "10px",}} /> }
        </ListItemIcon>
      </ListItem>

      <ListItem className='listItem' component={Link} to={{pathname:pathname ,search:`?userid=${user.userid}`}} onClick={()=>setSelectedItem("4")}>
        <ListItemIcon className='listIcon' sx={{backgroundColor: selectedItem=="4"&&"var(--yellow)", 
         boxShadow: selectedItem=="4"&& "var(--yellow) 0px 8px 20px"  }}>
          <Profile className='icon'sx={{color: selectedItem=="4"&&"white", 
         padding:selectedItem=="4"&& "10px",}}  /> 
        </ListItemIcon>
      </ListItem>

      <ListItem className='listItem' component={Link} to="/chat" onClick={()=>setSelectedItem("5")}>
        <ListItemIcon className='listIcon' sx={{backgroundColor: selectedItem=="5"&&"var(--yellow)" ,
         boxShadow: selectedItem=="5"&& "var(--yellow) 0px 8px 20px" }}>
          <Chat className='icon'sx={{color: selectedItem=="5"&&"white",
         padding:selectedItem=="5"&& "10px"}}  /> 
        </ListItemIcon>
      </ListItem>
     
    </List>
           
           </Box>
        </Grid>
        <Grid xs={10} sx={{height:"100%",width:"100%",marginTop:{xs:"20px",md:"175px"}}}>
      <Outlet/>
       
        </Grid>
        
           </Grid> 
      )
}
