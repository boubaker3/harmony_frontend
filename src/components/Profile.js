import React, { useEffect } from "react";
import cover from "./Assets/restauCover.jpg";
import { TabContext, TabList } from "@mui/lab";
import {
  Avatar,
  Typography,
  Button,
  Grid,
  Input,
  Tab,
  Divider,
} from "@mui/material";
import "./Styles/Profile.css";
import { useState } from "react";
import "./Styles/RestaurentItem.css";
import { useLocation } from "react-router-dom";
import axiosInstance from "./AxiosConfig";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
export default function Profile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [open, setOpen] = useState(true);
  const data = [
    { text: "country", icon: PublicIcon },
    { text: "city", icon: LocationCityIcon },
    { text: "address", icon: HomeIcon },
    { text: "phone", icon: LocalPhoneIcon },
    { text: "email", icon: EmailIcon },
  ];
  const [userData, setUserData] = useState([]);
  const query = new URLSearchParams(useLocation().search);
  const userid = query.get("userid");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [value, setValue] = useState("1");
  const [error, setError] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axiosInstance
      .get(`userdata?userid=${userid}`)
      .then((response) => {
        setUserData(response.data.data);
        setName(userData.name);
        setEmail(userData.email);
        setCountry(userData.country);
        setCity(userData.city);
        setAddress(userData.address);
        setPhone(userData.phone);
      })
      .catch((error) => {});
  }, [open]);

  const updateProfile = (event) => {
    event.preventDefault();
    if (
      name == "" ||
      country == "" ||
      city == "" ||
      address == "" ||
      phone == "" ||
      newPassword == "" ||
      oldPassword == ""
    ) {
      setError("please fill out all the fields");
    } else {
      axiosInstance
        .post(`updateProfile?userid=${userid}`, {
          name: name,
          email: email,
          country: country,
          city: city,
          address: address,
          phone: phone,
          newPassword: newPassword,
          password: oldPassword,
        })
        .then((response) => {
          setError(response.data.res);
          sessionStorage.setItem("user", JSON.stringify(response.data.data));
          setOpen(true);
        })
        .catch((error) => {
          setError("something went wrong,pleas try again later!");
        });
    }
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontFamily: "Bungee Inline",
              fontWeight: "bold",
              fontSize: { xs: "24px", md: "28px", lg: "32px" },
            }}
            variant="h1"
          >
            Profile
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ marginTop: "20px" }}>
          <Avatar
            src={cover}
            sx={{
              borderRadius: "38px 38px 0  0",
              width: { xs: "100%", md: "75%", lg: "50%" },
              height: "150px",
              position: "absolute",
            }}
          ></Avatar>
          <Avatar
            src={userData.photo}
            sx={{
              borderRadius: "100%",
              width: { xs: "80px", lg: "100px" },
              height: { xs: "80px", lg: "100px" },
              marginLeft: "20px",
              marginTop: "100px",
              border: "var(--yellow) 4px solid",
            }}
          ></Avatar>
          <form onSubmit={updateProfile}>
            <Grid container>
              <Grid item xs={12} md={8}>
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    marginLeft: "20px",
                  }}
                  variant="h5"
                >
                  {userData.name}
                </Typography>
              </Grid>

              {userid != user.userid && (
                <Grid item xs={12} md={4}>
                  <Button
                    component={Link}
                    to={{ pathname: "/chat", search: `?userid=${userid}` }}
                    disableElevation
                    variant="contained"
                    sx={{
                      paddingLeft: "25px",
                      paddingRight: "25px",
                      color: "white",
                      borderRadius: "38px",
                      fontFamily: "Montserrat",
                      fontSize: "14px",
                      justifyContent: "center",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    Join Chat
                  </Button>
                </Grid>
              )}

              <Grid item sx={{ display: open && "none" }}>
                <Grid item xs={12}>
                  <Input
                    required
                    className="InputProfile"
                    placeholder="name"
                    value={user.name}
                    onChange={(event) => setName(event.target.value)}
                    disabled={open}
                  ></Input>
                </Grid>

                <Grid item xs={12}>
                  <Input
                    required
                    className="InputProfile"
                    placeholder="country"
                    onChange={(event) => setCountry(event.target.value)}
                    value={user.country}
                    disabled={open}
                  ></Input>
                </Grid>

                <Grid item xs={12}>
                  <Input
                    required
                    className="InputProfile"
                    placeholder="city"
                    onChange={(event) => setCity(event.target.value)}
                    value={user.city}
                    disabled={open}
                  ></Input>
                </Grid>

                <Grid item xs={12}>
                  <Input
                    required
                    className="InputProfile"
                    placeholder="address"
                    onChange={(event) => setAddress(event.target.value)}
                    value={user.address}
                    disabled={open}
                  ></Input>
                </Grid>
                <Grid item xs={12}>
                  <Input
                    required
                    className="InputProfile"
                    placeholder="phone"
                    onChange={(event) => setPhone(event.target.value)}
                    value={user.phone}
                    disabled={open}
                  ></Input>
                </Grid>
                <Grid item xs={12}>
                  <Input
                    required
                    className="InputProfile"
                    placeholder="old password"
                    type="password"
                    onChange={(event) => setOldPassword(event.target.value)}
                    value={oldPassword}
                    disabled={open}
                  ></Input>
                </Grid>
                <Grid item xs={12}>
                  <Input
                    required
                    className="InputProfile"
                    placeholder="new password"
                    type="password"
                    onChange={(event) => setNewPassword(event.target.value)}
                    value={newPassword}
                    disabled={open}
                  ></Input>
                </Grid>
              </Grid>

              <Divider sx={{ marginTop: "25px", marginBottom: "25px" }} />
              {userid == user.userid && (
                <>
                  <Grid xs={12} xl={4}>
                    <Button
                      disableElevation
                      variant="contained"
                      sx={{
                        paddingLeft: "40px",
                        paddingRight: "40px",
                        color: "white",
                        borderRadius: "38px",
                        fontFamily: "Montserrat",
                        fontSize: "14px",
                        justifyContent: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "10px",
                      }}
                      onClick={() => {
                        setOpen(false);
                      }}
                      disabled={!open}
                    >
                      Edit Profile
                    </Button>
                  </Grid>
                  <Grid xs={12} xl={4}>
                    <Button
                      type="submit"
                      disableElevation
                      variant="contained"
                      sx={{
                        paddingLeft: "25px",
                        paddingRight: "25px",
                        color: "white",
                        borderRadius: "38px",
                        fontFamily: "Montserrat",
                        fontSize: "14px",
                        justifyContent: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "10px",
                      }}
                      disabled={open}
                    >
                      Update Profile
                    </Button>
                  </Grid>
                </>
              )}

              <Grid xs={12}>
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "12px",
                    display: "inline-block",
                  }}
                >
                  {error}
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid xs={12}>
          {data.map((item) => (
            <Typography
              color="black"
              sx={{
                display: {
                  xs: "block",
                  md: "inline-block",
                  verticalAlign: "middle",
                },
                marginLeft: "25px",
              }}
            >
              {<item.icon sx={{ verticalAlign: "middle" }} />}{" "}
              {userData[item.text]}
            </Typography>
          ))}
        </Grid>
        <Grid xs={12} sx={{ marginTop: "20px" }}>
          <TabContext value={value}>
            <Grid xs={12} sx={{ marginTop: "20px" }}>
              <TabList onChange={handleChange}>
                <Tab
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "montserrat",
                  }}
                  label="Orders List"
                  value="1"
                />

                <Tab
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "montserrat",
                  }}
                  label="Favourites"
                  value="2"
                />
              </TabList>
            </Grid>
          </TabContext>
        </Grid>
      </Grid>
    </>
  );
}
