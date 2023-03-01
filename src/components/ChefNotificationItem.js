import * as React from "react";
import { Avatar, Typography, Button, Card, Box, Grid } from "@mui/material";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Snackbar from "@mui/material/Snackbar";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import "./Styles/Notifications.css";
import axiosInstance from "./AxiosConfig";
export default function ChefNotificationsItem(props) {
  const [notification, setNotification] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [sentStatus, setSentStatus] = React.useState("");
  React.useEffect(() => {
    switch (props.notification.type) {
      case "order":
        setNotification(
          `${props.notification.name} has ordered ${props.notification.quantity} ${props.notification.product_name} `
        );
        break;
      case "user_rating":
        setNotification(
          `you received a new rating from ${props.notification.name} ${props.notification.rating}`
        );
        break;
      case "user_feedback":
        setNotification(
          `${props.notification.name} left a new feedback for you`
        );
        break;
      case "product_rating":
        setNotification(
          `you received a new rating from ${props.notification.name} for your ${props.notification.product_name} product ${props.notification.rating}`
        );
        break;
      case "product_feedback":
        setNotification(
          `${props.notification.name} left a new feedback for your ${props.notification.product_name} product`
        );
        break;
    }

    switch (props.notification.status) {
      case "-1":
        setStatus("refused");
        break;
      case "0":
        setStatus("not accepted yet");
        break;
      case "1":
        setStatus("accepted");
        break;
    }
  });
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    axiosInstance
      .post("updateNotifStatus", {
        notif_id: props.notification.notif_id,
        status: sentStatus,
      })
      .then((response) => {
        setOpenDialog(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const handleClickSnackBar = () => {
    setOpenSnackBar(true);
    handleCloseDialog();
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(true);
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const close = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    setSentStatus(event.target.value);

    if (anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
    handleOpenDialog();
  };

  return (
    <Grid container>
      <Grid item xs={12} md={8} xl={6}>
        <Card
          className="notifCard"
          sx={{
            boxShadow: " 0px ",
            borderRadius: "38px",
            padding: "10px 40px 10px 10px",
            marginBottom: "50px",
            backgroundColor: "#EFEFEF",
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: { xs: "8px", md: "12px" },
                  left: "0",
                  right: "auto",
                  textAlign: "right",
                }}
              >
                {props.notification.notif_date}{" "}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Avatar
                component={Link}
                to={{
                  pathname: "/clientProfile",
                  search: `?userid=${props.notification.userid}`,
                }}
                src={props.notification.photo}
                sx={{
                  borderRadius: "100%",
                  width: { xs: "60px", md: " 70px" },
                  height: { xs: "60px", md: " 70px" },
                }}
              ></Avatar>
            </Grid>
            <Grid item xs={9} sx={{ margin: " auto 0", textAlign: "left" }}>
              <Typography
                noWrap
                sx={{ fontFamily: "Montserrat", textOverflow: "ellipsis" }}
              >
                {" "}
                {notification}{" "}
                {props.notification.type == "user_rating" ||
                props.notification.type == "product_rating" ? (
                  <StarIcon
                    sx={{ color: "var(--yellow)", verticalAlign: "middle" }}
                  />
                ) : (
                  ""
                )}{" "}
              </Typography>
            </Grid>

            {props.notification.type == "order" && (
              <Grid item xs={1}>
                <Box sx={{ display: "inline-block" }}>
                  <Button
                    sx={{
                      color: "var(--yellow)",
                      borderRadius: "20px",
                      height: "50px",
                      width: "0px",
                    }}
                    ref={anchorRef}
                    aria-haspopup="true"
                    onClick={handleToggle}
                  >
                    <MoreVertIcon sx={{ width: "35px", height: "35px" }} />
                  </Button>
                  <Popper
                    sx={{ zIndex: 100 }}
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
                          transformOrigin: placement === "left top",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={close}>
                            <MenuList>
                              <MenuItem value="1" onClick={handleClose}>
                                Accept It{" "}
                              </MenuItem>
                              <MenuItem value="-1" onClick={handleClose}>
                                Refuse It{" "}
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </Box>
              </Grid>
            )}

            {props.notification.type == "order" && (
              <Grid item xs={12}>
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "12px",
                    left: "0",
                    right: "auto",
                    textAlign: "right",
                    marginRight: "10px",
                    color: "var(--yellow)",
                  }}
                >
                  {status}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Card>
      </Grid>
      <Dialog
        open={openDialog}
        sx={{ borderRadius: "38px" }}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Removing orders</DialogTitle>
        <DialogContent>
          <DialogContentText>
            if you want to accept the order click on accept otherwise hit
            refuse!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Accept it</Button>
          <Button onClick={handleClickSnackBar}>Refuse it</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        message="it's done 😊"
      />
    </Grid>
  );
}
