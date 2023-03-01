import React from "react";
import cover from "./Assets/restauCover.jpg";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Avatar,
  Typography,
  Button,
  Grid,
  Input,
  Tab,
  Chip,
  Box,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  Snackbar,
} from "@mui/material";
import "./Styles/Profile.css";
import { useState, useEffect } from "react";
import "./Styles/RestaurentItem.css";
import StarIcon from "@mui/icons-material/Star";
import Feedbacks from "./Feedbacks";
import ChefProducts from "./ChefProducts";
import { CircularProgress } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import axiosInstance from "./AxiosConfig";
export default function ChefProfile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [open, setOpen] = useState(true);
  const [rating, setRating] = useState(2);
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedback, setFeedback] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const query = new URLSearchParams(useLocation().search);
  const userid = query.get("userid");
  const [openDialog, setOpenDialog] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState("");
  const [shippers, setShippers] = useState([]);
  const [alreadyRated, setAlreadyRated] = useState(false);
  const data = [
    { text: "country", icon: PublicIcon },
    { text: "city", icon: LocationCityIcon },
    { text: "address", icon: HomeIcon },
    { text: "phone", icon: LocalPhoneIcon },
    { text: "email", icon: EmailIcon },
  ];

  const handleCloseDialog = () => {
    axiosInstance
      .post(`sendRating?userid=${userid}`, {
        rating: rating,
        sender: user.userid,
      })
      .then((response) => {
        console.log(response.data.res);
        setOpenDialog(false);
        handleClickSnackBar();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  useEffect(() => {
    user.userid == userid && setOpenDialog(false);
    axiosInstance
      .get(`retrieveProducts?userid=${userid}&type=chef`)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`checkRating?sender=${user.userid}&receiver=${userid}`)
      .then((response) => {
        setOpenDialog(response.data.res);
      })
      .catch((error) => {});
  }, []);

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
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`retrieveFeedbacks?userid=${userid}`)
      .then((response) => {
        setFeedbacks(response.data.feedbacks);
      })
      .catch((error) => {});
  }, [feedbacks]);
  useEffect(() => {
    axiosInstance
      .get(`retrieveShippers?userid=${userid}`)
      .then((response) => {
        setShippers(response.data.shippers);
      })
      .catch((error) => {});
  }, []);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const handleClickSnackBar = () => {
    setOpenSnackBar(true);
  };
  const sendFeedback = (event) => {
    setLoading(true);
    event.preventDefault();
    axiosInstance
      .post(`saveFeedbacks?userid=${userid}`, {
        sender: user.userid,
        feedback: feedback,
      })
      .then((response) => {
        setLoading(false);
        setFeedback("");
      })
      .catch((error) => {
        setLoading(false);
      });
  };

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
  const [openShipperDialog, setOpenShipperDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenShipperDialog(true);
  };

  const handleClose = () => {
    setOpenShipperDialog(false);
  };
  const addShipper = (event) => {
    event.preventDefault();
    axiosInstance
      .post("saveShippers", { email: shipper, userid: user.userid })
      .then((response) => {
        setOpenShipperDialog(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const [shipper, setShipper] = useState("");
  const handleSearch = (event) => {
    setShipper(event.target.value);
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
          <Chip
            sx={{
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              fontSize: "16px",
            }}
            icon={
              <StarIcon
                sx={{
                  color: "var(--yellow) !important",
                  width: "35px",
                  height: "35px",
                }}
              />
            }
            label={userData.rating}
          />
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
              <Grid sx={{ display: open && "none" }}>
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
              {user.userid == userid && (
                <>
                  <Grid item xs={12} xl={4}>
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
                  <Grid item xs={12} xl={4}>
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
                  <Grid item xs={12} xl={4}>
                    <Button
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
                      onClick={handleClickOpen}
                    >
                      Add Shipper
                    </Button>
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
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

        <Grid item xs={12}>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontSize: "18px",
              marginTop: "25px",
              marginBottom: "25px",
            }}
          >
            About {userData.name}
          </Typography>

          {data.map((item) => (
            <Typography
              key={item.text}
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

        <Grid item xs={12}>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontSize: "18px",
              marginTop: "25px",
              marginBottom: "25px",
            }}
          >
            {userData.name} Shippers:
          </Typography>

          {shippers.map((shipperItem) => (
            <Grid
              item
              key={shipperItem.id}
              component={Link}
              to={{
                pathname: "/shipperProfile",
                search: `?userid=${shipperItem.shipper_id}`,
              }}
            >
              <Avatar
                sx={{
                  borderRadius: "100%",
                  display: "inline-block",
                  verticalAlign: "middle",
                  fontFamily: "Montserrat",
                }}
                src={shipperItem.photo}
              ></Avatar>
              <Typography
                sx={{
                  display: "inline-block",
                  marginLeft: "10px",
                  color: "black",
                }}
              >
                {shipperItem.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "20px" }}>
          <TabContext value={value}>
            <Grid item xs={12} sx={{ marginTop: "20px" }}>
              <TabList onChange={handleChange}>
                <Tab
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "montserrat",
                  }}
                  label="products"
                  value="1"
                />

                <Tab
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "montserrat",
                  }}
                  label="Feedbacks"
                  value="2"
                />
              </TabList>
            </Grid>

            <TabPanel value="1" index={0}>
              <Grid item xs={12} sx={{ marginTop: "20px" }}>
                {products.map((product) => (
                  <Box key={product.id} sx={{ display: "inline-block" }}>
                    {" "}
                    <ChefProducts item={product} />{" "}
                  </Box>
                ))}
              </Grid>
            </TabPanel>
            <TabPanel sx={{ width: "100%" }} value="2" index={1}>
              <form onSubmit={sendFeedback}>
                <Grid item xs={12}>
                  <Avatar
                    src={user.photo}
                    sx={{
                      display: "inline-block",
                      width: "60px",
                      height: "60px",
                    }}
                  >
                    {" "}
                  </Avatar>
                  <Input
                    value={feedback}
                    sx={{ marginLeft: "20px", width: "350px" }}
                    onChange={(event) => {
                      setFeedback(event.target.value);
                    }}
                    placeholder="write your feedback about this restaurent..."
                  ></Input>

                  <Button
                    type="submit"
                    disableElevation
                    variant="contained"
                    sx={{
                      paddingLeft: "60px",
                      paddingRight: "60px",
                      color: "white",
                      borderRadius: "38px",
                      fontFamily: "Montserrat",
                      fontSize: "18px",
                      justifyContent: "center",
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "block",
                      marginTop: "12px",
                    }}
                  >
                    Share It
                  </Button>
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
                <Grid item xs={12} sx={{ marginTop: "20px" }}>
                  {feedbacks.map((feedback) => (
                    <Box key={feedback.id} sx={{ display: "block" }}>
                      {" "}
                      <Feedbacks item={feedback} />{" "}
                    </Box>
                  ))}
                </Grid>
              </form>
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        sx={{ borderRadius: "38px" }}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Rate The Restaurent</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Share your exprience with the restaurent by rating.
          </DialogContentText>
          <Rating
            size="large"
            name="half-rating"
            onChange={(event) => {
              setRating(event.target.value);
            }}
            defaultValue={2}
            precision={1}
          />
          <Typography>Rated with {rating}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Send the rating</Button>
        </DialogActions>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>No thanks</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        message="Your rating has been sent😊"
      />

      <Dialog onClose={handleClose} open={openShipperDialog}>
        <DialogTitle sx={{ color: "black", fontFamily: "montserrat" }}>
          {" "}
          Adding Shippers{" "}
        </DialogTitle>
        <List sx={{ pt: 0, margin: "auto" }}>
          <ListItem>
            <Input
              required
              placeholder="search for shippers"
              onChange={handleSearch}
              value={shipper}
            ></Input>
          </ListItem>

          <form onSubmit={addShipper}>
            <Button
              disableElevation
              type="submit"
              variant="contained"
              sx={{ color: "white", textAlign: "center" }}
            >
              Add Shipper
            </Button>
          </form>
        </List>
      </Dialog>
    </>
  );
}
