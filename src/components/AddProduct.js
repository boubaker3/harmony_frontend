import React from 'react'
 import { Avatar , Typography,Button ,Box   ,Grid,Input,InputAdornment} from '@mui/material';
import {useState  } from 'react';
import './Styles/addProduct.css';
 import uploadDefault from './Assets/uploadDefault.png';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { CircularProgress } from '@material-ui/core';
export default function AddProduct() {
    const [title,setTitle]=useState("");
    const [price,setPrice]=useState("");
    const [description,setDescription]=useState("");
    const [encoded,setEncoded]=useState("");

    const [upload,setUpload]=useState(uploadDefault);
    const [uploaded,setUploaded]=useState(false);
    const user=JSON.parse(sessionStorage.getItem("user"));
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    function handleChange(e) {
      setUploaded(true);
      setUpload(URL.createObjectURL(e.target.files[0]));
    
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        setEncoded(event.target.result);
       }
    
      // Declare and initialize the file variable
      const file = e.target.files[0];
    
      // Create a Blob object from the selected file
      const blob = new Blob([file], { type: file.type });
    
      fileReader.readAsDataURL(blob);
    }
 
const sendProduct=(event)=>{
  setLoading(true);

  event.preventDefault();
  axios.post("http://localhost:8000/api/addProduct",{product_name:title,product_price:price,
                              product_desc:description,product_image:encoded,userid:user.userid})
                              .then((response)=>{
                                setLoading(false);
                                navigate("/");
  
                              })
                              .catch((error)=>{
                                console.log(error.response.data)
                                setLoading(false);

                              });

}
  return (
    < > 
<form onSubmit={sendProduct}>
  
    <Grid container sx={{height:"100%",width:"100%"}}>
    <Grid xs={12}  >
    <Typography sx={{fontFamily:"Bungee Inline",fontWeight:"bold",fontSize:{xs:"24px",md:"28px",lg:"32px"}}} variant='h1'>Add Product</Typography>
    </Grid>
    <Grid xs={12} md={6}  >
 <Box sx={{margin: '50px auto',display:"block",width:"50%",height:"200px",backgroundColor:"rgb(241, 241, 241)",borderRadius:"38px"  ,padding:uploaded?"0px":"20px",position:"relative"}}>
 <label for="avatar">
  <Avatar src={upload} sx={{width:uploaded?"100%":"120px",height:uploaded?"100%":"120px",borderRadius:uploaded?"38px":"0px", margin:"auto",position:"absolute",top:"0",bottom:'0',left:"0",right:"0"}}></Avatar></label>

<Input sx={{visibility:"hidden"}}  type="file"
       id="avatar" name="product_image" onChange={handleChange}
       accept="image/png, image/jpeg"></Input>
</Box>
    </Grid>

    <Grid  xs={12} md={6} sx={{marginTop:{xs:"20px",md:"100px"}}} >
    <Grid xs={12} >
    <Input value={title} name="product_name" onChange={(event)=>{setTitle(event.target.value)}} sx={{margin:{xs:"25px",md:"0px"}}} className='shareInput'  disableUnderline  autoFocus  placeholder='Title'  ></Input>
    </Grid>
    <Grid xs={12}  name="product_price" sx={{ marginTop:{xs:"10px",md:"50px"}}}>
     <Input value={price} onChange={(event)=>{setPrice(event.target.value)}} sx={{margin:{xs:"25px",md:"0px"}}} type="number"   className='shareInput'  disableUnderline  autoFocus  placeholder='Price'  ></Input>
     </Grid>
     <Grid xs={12} name="product_desc" sx={{ marginTop:{xs:"10px",md:"50px"}}}>
    <Input InputProps={{
    inputProps: {
      maxLength: 500
    }
  }}   value={description} onChange={(event)=>{setDescription(event.target.value)}} 
    sx={{margin:{xs:"25px",md:"0px"},height:"80px",paddingt:"20px",overflow:"auto" }} className='shareInput' disableUnderline placeholder='Description'  ></Input>
    </Grid>
    <Button  type="submit" variant='contained' disableElevation  color="primary"
         sx={{fontFamily:'Montserrat',width:"45%",fontStyle:"bold",display:"block", textAlign:"center", margin: '0 auto',
        color:'white',marginTop:{xs:"2%",md:"5%"},fontSize:{xs:"16px",md:"20px"},height:"60px",borderRadius:"24px",padding:"10px 20px 10px 20px" }}>Share It Now</Button>
     <Grid xs={12}>
     { loading&& <CircularProgress style={{ color: 'var(--yellow)' ,margin:"20px auto",display:"block"}} />}
     </Grid>
  </Grid> 

          </Grid>
  </form>    

    </ >
  )
}
