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
import { styled } from "@mui/material/styles";
import axiosInstance from "./AxiosConfig";
import "./Styles/Notifications.css";

export default function NotificationsItem(props) {
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#000",
    backgroundColor: "pink",
    boxShadow: "3px 3px 5px 3px rgb(0 0 0 ,0.2)",
  }));
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const handleClickSnackBar = () => {
    axiosInstance
      .get(`deleteOrders?orderid=${props.item.order_id}`)
      .then((response) => {
        setOpenSnackBar(true);
        handleCloseDialog();
      })
      .catch((error) => {});
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };
  const [status, setStatus] = React.useState();
  React.useEffect(() => {
    switch (props.item.status) {
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
  }, []);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
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
                {props.item.created_at}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Avatar
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
                You ordred {props.item.product_name} from {props.item.name}
              </Typography>
            </Grid>
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
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList>
                            <MenuItem onClick={handleClose}>
                              Remove It{" "}
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Box>
            </Grid>
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
            Are You sure you want to remove this order from your list 🤔
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>No,it's just a mistake</Button>
          <Button onClick={handleClickSnackBar}>Yup,Im sure</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        message="Your Order Has Been Removed 😊"
      />
    </Grid>
  );
}
