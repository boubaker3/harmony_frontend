import React from "react";
import { Input, Box, Grid, Button, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import "./Styles/Login.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "./AxiosConfig";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

export default function Signup() {
  const [value, setValue] = React.useState("1");
  const { signupAs } = useSelector((state) => state.signupAs);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  const [phonenumber, setPhonenumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [bio, setBio] = React.useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const sendSignupInputs = (event) => {
    setLoading(true);
    event.preventDefault();
    axiosInstance
      .post("signup", {
        name: username,
        email: email,
        password: password,
        country: country,
        city: city,
        phone: phonenumber,
        address: address,
        bio: bio,
        type: signupAs,
      })
      .then((response) => {
        setLoading(false);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/uploadPicture");
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <form onSubmit={sendSignupInputs}>
      <Box
        sx={{
          height: "450px",
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
        }}
      >
        <Grid container>
          <Grid xs={12}>
            <TabContext value={value}>
              <Box
                sx={{
                  width: "300px",
                  left: "0",
                  right: "0",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
              >
                <TabList onChange={handleChange}>
                  <Tab
                    sx={{ fontSize: "18px", fontWeight: "bold" }}
                    label="1"
                    value="1"
                  />

                  <Tab
                    sx={{ fontSize: "18px", fontWeight: "bold" }}
                    label="2"
                    value="2"
                  />
                  <Tab
                    sx={{ fontSize: "18px", fontWeight: "bold" }}
                    label="3"
                    value="3"
                  />
                </TabList>
              </Box>
              <TabPanel sx={{ width: "100%" }} value="1" index={0}>
                <Grid item xs={12}>
                  <Input
                    onChange={(event) => setUsername(event.target.value)}
                    disableUnderline={true}
                    name="username"
                    value={username}
                    sx={{
                      width: "100%",
                      paddingLeft: "20px",
                      paddingRight: "100px",
                      paddingTop: "20px",
                    }}
                    id="input"
                    placeholder={
                      signupAs == "client" ? "username" : "Brand name"
                    }
                  ></Input>
                </Grid>
                <Grid item xs={12}>
                  <Input
                    onChange={(event) => setEmail(event.target.value)}
                    disableUnderline={true}
                    name="email"
                    value={email}
                    sx={{
                      marginTop: "20px",
                      width: "100%",
                      paddingLeft: "20px",
                      paddingRight: "100px",
                    }}
                    id="input"
                    placeholder="Email"
                  ></Input>
                </Grid>
                <Grid item xs={12}>
                  <Input
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    disableUnderline={true}
                    name="password"
                    value={password}
                    sx={{
                      width: "100%",
                      paddingLeft: "20px",
                      paddingRight: "100px",
                      paddingTop: "20px",
                    }}
                    id="input"
                    placeholder="Password"
                  ></Input>
                </Grid>
              </TabPanel>
              <TabPanel sx={{ width: "100%" }} value="2" index={1}>
                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <Input
                      onChange={(event) => setCountry(event.target.value)}
                      disableUnderline={true}
                      name="country"
                      value={country}
                      sx={{
                        width: "100%",
                        paddingLeft: "20px",
                        paddingRight: "100px",
                        paddingTop: "20px",
                      }}
                      id="input"
                      placeholder="Country"
                    ></Input>
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      onChange={(event) => setCity(event.target.value)}
                      disableUnderline={true}
                      name="city"
                      value={city}
                      sx={{
                        width: "100%",
                        paddingLeft: "20px",
                        paddingRight: "100px",
                        paddingTop: "20px",
                      }}
                      id="input"
                      placeholder="City"
                    ></Input>
                  </Grid>

                  <Input
                    onChange={(event) => setPhonenumber(event.target.value)}
                    disableUnderline={true}
                    name="phonenumber"
                    value={phonenumber}
                    sx={{
                      width: "100%",
                      paddingLeft: "20px",
                      paddingRight: "100px",
                      paddingTop: "20px",
                    }}
                    id="input"
                    placeholder="Phone number"
                  ></Input>
                </Grid>
              </TabPanel>
              <TabPanel sx={{ width: "100%" }} value="3" index={2}>
                <Grid item xs={12}>
                  <Input
                    onChange={(event) => setAddress(event.target.value)}
                    disableUnderline={true}
                    name="address"
                    value={address}
                    sx={{
                      width: "100%",
                      paddingLeft: "20px",
                      paddingRight: "100px",
                      paddingTop: "20px",
                    }}
                    id="input"
                    placeholder="Address"
                  ></Input>
                </Grid>
                <Grid item xs={12}>
                  <Input
                    onChange={(event) => setBio(event.target.value)}
                    disableUnderline={true}
                    name="bio"
                    value={bio}
                    sx={{
                      width: "100%",
                      paddingLeft: "20px",
                      paddingRight: "100px",
                      paddingTop: "20px",
                    }}
                    id="input"
                    placeholder="Bio"
                  ></Input>
                </Grid>
              </TabPanel>
            </TabContext>
          </Grid>
          <Grid item xs={5}>
            {loading && (
              <CircularProgress
                style={{
                  color: "var(--yellow)",
                  margin: "0px auto",
                  display: "block",
                }}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            <Button
              type="submit"
              disableElevation
              variant="contained"
              sx={{
                paddingLeft: "60px",
                paddingRight: "60px",
                float: "right",
                marginRight: "50px",
                color: "white",
                borderRadius: "38px",
                fontFamily: "Montserrat",
                fontSize: "18px",
              }}
            >
              Signup
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
