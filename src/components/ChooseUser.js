import React, { useState } from "react";
import Logo from "./Assets/Logo.png";
import Client from "./Assets/client.png";
import Chef from "./Assets/chef.png";
import Shipper from "./Assets/shipper.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Styles/chooseUser.css";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Grid,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { setAcc } from "./redux/SignupAs";
const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "#EDBB00",
    },
  },
});

export default function ChooseUser() {
  const classes = useStyles();
  const { signupAs } = useSelector((state) => state.signupAs);
  const dispatch = useDispatch();

  const client = (
    <React.Fragment>
      <CardContent>
        <Avatar id="avatar" src={Client} />
        <Typography sx={{ fontWeight: "bold", color: "black" }} variant="h6">
          Signup <br /> as a Client
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            dispatch(setAcc("client"));
          }}
          size="small"
        >
          Choose It
        </Button>
      </CardActions>
    </React.Fragment>
  );

  const chef = (
    <React.Fragment>
      <CardContent>
        <Avatar id="avatar" src={Chef} />

        <Typography sx={{ fontWeight: "bold" }} variant="h6">
          Signup
          <br /> as a Chef
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            dispatch(setAcc("chef"));
          }}
          size="small"
        >
          Choose It
        </Button>
      </CardActions>
    </React.Fragment>
  );

  const shipper = (
    <React.Fragment>
      <CardContent>
        <Avatar id="avatar" src={Shipper} />

        <Typography sx={{ fontWeight: "bold" }} variant="h6">
          Signup
          <br /> as a Shipper
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            dispatch(setAcc("shipper"));
          }}
          size="small"
        >
          Choose It
        </Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <div>
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
      <Grid
        container
        sx={{
          justifyContent: "center",
          marginTop: "5%",
          fontFamily: "Montserrat",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        <Grid item xs={8} md={12} sx={{ marginTop: { xs: "2%" } }}>
          <Typography
            variant="h6"
            sx={{ color: "var(--yellow)", fontFamily: "Montserrat" }}
          >
            Signup as a {signupAs}
          </Typography>
        </Grid>

        <Grid
          item
          id="card"
          xs={8}
          md={3}
          sx={{ marginLeft: "2%", marginTop: { xs: "2%" } }}
        >
          <Card sx={{ borderRadius: "38px", boxShadow: 0 }}>{client}</Card>
        </Grid>
        <Grid
          item
          id="card"
          xs={8}
          md={3}
          sx={{ marginLeft: "2%", marginTop: { xs: "2%" } }}
        >
          <Card sx={{ borderRadius: "38px", boxShadow: 0 }}>{chef}</Card>
        </Grid>
        <Grid
          item
          id="card"
          xs={8}
          md={3}
          sx={{ marginLeft: "2%", marginTop: { xs: "2%" } }}
        >
          <Card sx={{ borderRadius: "38px", boxShadow: 0 }}>{shipper}</Card>
        </Grid>
        <Grid item xs={8} md={12} sx={{ marginTop: { xs: "2%" } }}>
          <Typography sx={{ color: "gray" }}>
            I Already have an account.
          </Typography>
        </Grid>
        <Button
          component={Link}
          to="/registration/login"
          className={classes.root}
          variant="contained"
          disableElevation
          color="primary"
          sx={{
            fontFamily: "Montserrat",
            width: "250px",
            fontStyle: "bold",
            textAlign: "center",
            color: "white",
            marginTop: "5%",
            fontSize: "24px",
            borderRadius: "24px",
            padding: "10px 20px 10px 20px",
          }}
        >
          Continue
        </Button>
      </Grid>
    </div>
  );
}
