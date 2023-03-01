import * as React from "react";
import { Avatar, Typography, Button, Card, Box, Grid } from "@mui/material";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Snackbar from "@mui/material/Snackbar";
import axiosInstance from "./AxiosConfig";
import { Link } from "react-router-dom";
import "./Styles/Notifications.css";
export default function ShipperNotificationsItem(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [sentStatus, setSentStatus] = React.useState("");

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    setSentStatus(event.target.value);
    axiosInstance
      .post("updateRequestStatus", {
        notif_id: props.item.chef_shipper_id,
        status: sentStatus,
      })
      .then((response) => {
        setOpen(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const close = () => {
    setOpen(false);
  };
  const [notification, setNotification] = React.useState("");
  useEffect(() => {
    if (props.item.chef_shipper_id) {
      setNotification(`${props.item.name} restaurent hired you`);
    } else {
      setNotification(
        `your chef accepted ${props.item.quantity} ${props.item.product_name} from ${props.item.name} `
      );
    }
  }, []);

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
                {props.item.created_at}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Avatar
                component={Link}
                to={{
                  pathname: "/clientProfile",
                  search: `?userid=${props.item.userid}`,
                }}
                src={props.item.photo}
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
                {notification}
              </Typography>
            </Grid>

            {props.item.chef_shipper_id && (
              <Grid xs={1}>
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
                              <MenuItem value="0" onClick={handleClose}>
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

            {props.item.chef_shipper_id && (
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
                  {props.item.status == "0" ? "not accepted yet" : "accepted"}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
