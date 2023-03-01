import React from "react";
import { useState } from "react";
import { Input, Box, Grid, Avatar, Button } from "@mui/material";
import Logo from "./Assets/Logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axiosInstance from "./AxiosConfig";
import { useNavigate } from "react-router-dom";
export default function UploadPicture() {
  let user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const [upload, setUpload] = useState(AccountCircleIcon);
  const [uploaded, setUploaded] = useState(false);
  const [encoded, setEncoded] = useState("");
  function handleChange(e) {}
  const handleFileChange = (event) => {
    setUploaded(true);
    setUpload(URL.createObjectURL(event.target.files[0]));
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      setEncoded(base64);
    };
    reader.readAsDataURL(file);
  };
  const sendPicture = (event) => {
    event.preventDefault();
    axiosInstance
      .post("updatePicture", { photo: encoded, userid: user.userid })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <form onSubmit={sendPicture}>
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              width: {
                xs: "200px",
                sm: "200px",
                md: "400px",
                lg: "400px",
                xl: "500px",
              },
              padding: "5px",
            }}
          >
            <img id="logo" src={Logo} />
            <div id="container1">
              <h6>Harmony</h6>
            </div>
          </Box>
        </Grid>
        <Box
          sx={{
            height: "500px",
            width: {
              xs: "450px",
              sm: "450px",
              md: "500px",
              lg: "500px",
              xl: "500px",
            },
            boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
            borderRadius: "20px",
            marginTop: "50px",
            left: "0",
            right: "0",
            marginRight: "auto",
            marginLeft: "auto",
            padding: "20px",
          }}
        >
          <Box
            sx={{
              height: "200px",
              position: "absolute",
              width: {
                xs: "450px",
                sm: "450px",
                md: "500px",
                lg: "500px",
                xl: "500px",
              },
              borderRadius: "20px",
              marginTop: "20px",
              left: "0",
              right: "0",
              marginRight: "auto",
              marginLeft: "auto",
              backgroundColor: "gray",
              opacity: "0.1",
            }}
          ></Box>

          <Box
            sx={{
              margin: "100px auto",
              display: "block",
              width: "150px",
              height: "150px",
              backgroundColor: "rgb(241, 241, 241)",
              borderRadius: "38px",
              padding: uploaded ? "0px" : "20px",
              position: "relative",
            }}
          >
            <label for="avatar">
              <Avatar
                src={upload}
                sx={{
                  width: uploaded ? "100%" : "120px",
                  height: uploaded ? "100%" : "120px",
                  borderRadius: "38px",
                  margin: "auto",
                  position: "absolute",
                  top: "0",
                  bottom: "0",
                  left: "0",
                  right: "0",
                }}
              ></Avatar>
            </label>

            <Input
              sx={{ visibility: "hidden" }}
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleFileChange}
              accept="image/png, image/jpeg"
            ></Input>
          </Box>

          <Grid xs={12}>
            <Button
              type="submit"
              onClick={sendPicture}
              disableElevation
              variant="contained"
              sx={{
                width: "250px",
                paddingLeft: "60px",
                paddingRight: "60px",
                color: "white",
                borderRadius: "38px",
                fontFamily: "Montserrat",
                fontSize: "18px",
                marginTop: "120px ",
                justifyContent: "center",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
                textAlign: "center",
              }}
            >
              Upload It
            </Button>
          </Grid>
        </Box>
      </Grid>
    </form>
  );
}
