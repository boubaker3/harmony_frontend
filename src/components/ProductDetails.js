import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { CircularProgress } from "@material-ui/core";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PaymentIcon from "@mui/icons-material/Payment";
import Feedbacks from "./Feedbacks";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import {
  Avatar,
  Typography,
  Button,
  Grid,
  Input,
  Chip,
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  Rating,
  ButtonGroup,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { decrementOrders, incrementOrders } from "./redux/reducer";
import axiosInstance from "./AxiosConfig";

export default function ProductDetails() {
  const query = new URLSearchParams(useLocation().search);
  const productId = query.get("productId");
  const userid = query.get("userid");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState(2);
  const [openDialog, setOpenDialog] = useState(true);

  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  useEffect(() => {
    axiosInstance
      .get(`retrieveProductDetails?productId=${productId}`)
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  const sendOrder = (event) => {
    event.preventDefault();
    axiosInstance
      .post(`saveOrders`, {
        sender: user.userid,
        receiver: userid,
        product_id: productId,
        quantity: count,
      })
      .then((response) => {
        setOpen(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDialog = () => {
    axiosInstance
      .post(`sendProductRating?productId=${productId}`, {
        rating: rating,
        sender: user.userid,
        receiver: userid,
      })
      .then((response) => {
        setOpenDialog(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const sendFeedback = (event) => {
    setLoading(true);
    event.preventDefault();
    axiosInstance
      .post(`saveProductFeedback?userid=${userid}`, {
        sender: user.userid,
        productId: productId,
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

  useEffect(() => {
    axiosInstance
      .get(`retrieveProductsFeedbacks?productId=${productId}`)
      .then((response) => {
        setFeedbacks(response.data.feedbacks);
      })
      .catch((error) => {});
  }, [loading]);

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
            Product details
          </Typography>
        </Grid>
        <Grid
          item
          xs={10}
          sx={{ padding: "20px", borderRadius: "38px", margin: "25px auto" }}
        >
          <Avatar
            src={product.product_image}
            sx={{
              borderRadius: "100%",
              width: "200px",
              height: "200px",
              objectFit: "cover",
              margin: "auto",
            }}
          ></Avatar>

          <Typography
            sx={{
              fontFamily: "montserrat",
              fontSize: "32px",
              textAlign: "center",
              display: "inline-block",
            }}
          >
            {product.product_name}
          </Typography>

          <Chip
            sx={{
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              fontSize: "16px",
              display: "inline-block",
              textAlign: "center",
            }}
            icon={
              <StarIcon
                sx={{
                  color: "var(--yellow) !important",
                  width: "25px",
                  height: "25px",
                  verticalAlign: "middle",
                }}
              />
            }
            label={product.rating}
          />

          <Grid item xs={4}>
            <Typography
              sx={{
                fontFamily: "montserrat",
                fontSize: "18px",
                display: "inline-block",
              }}
            >
              Price: {product.product_price}$
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography
              sx={{
                fontFamily: "montserrat",
                fontSize: "14px",
                display: "inline-block",
                color: "gray",
              }}
            >
              {product.product_desc}
            </Typography>
          </Grid>

          <Box sx={{ marginTop: "25px" }}>
            <Box sx={{ display: "inline-block", marginRight: "100px" }}>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button onClick={() => dispatch(decrementOrders())}>-</Button>
                <Button>{count}</Button>
                <Button onClick={() => dispatch(incrementOrders())}>+</Button>
              </ButtonGroup>
            </Box>
            <Button
              onClick={handleClickOpen}
              variant="contained"
              sx={{
                padding: "10px 50px 10px 40px",
                borderRadius: "38px",
                color: "white",
                boxShadow: "0",
                display: "inline-block",
              }}
              startIcon={<AddShoppingCartIcon />}
            >
              Get it now
            </Button>
          </Box>
        </Grid>
        <form onSubmit={sendFeedback}>
          <Grid item xs={12}>
            <Avatar
              src={user.photo}
              sx={{ display: "inline-block", width: "60px", height: "60px" }}
            >
              {" "}
            </Avatar>
            <Input
              value={feedback}
              sx={{ marginLeft: "20px", width: "350px" }}
              onChange={(event) => {
                setFeedback(event.target.value);
              }}
              placeholder="write your feedback about this dish..."
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
        </form>

        <Grid
          item
          xs={12}
          sx={{
            margin: "20px auto",
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
          }}
        >
          {feedbacks.map((feedback) => (
            <Box sx={{ display: "block" }}>
              {" "}
              <Feedbacks item={feedback} />{" "}
            </Box>
          ))}
        </Grid>
      </Grid>

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ color: "black" }}>Set Payment Method</DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem disableGutters>
            <form onSubmit={sendOrder}>
              <Button type="submit">
                <LocalAtmIcon
                  sx={{ color: "var(--yellow)", width: "60px", height: "50px" }}
                />
                <ListItemText
                  sx={{ fontWeight: "bold", fontFamily: "montserrat" }}
                  primary="cash on delivery"
                />
              </Button>
            </form>
          </ListItem>
          <ListItem disabled disableGutters>
            <Button type="submit">
              <PaymentIcon
                sx={{ color: "var(--yellow)", width: "60px", height: "50px" }}
              />
              <ListItemText
                sx={{ fontWeight: "bold", fontFamily: "montserrat" }}
                primary="pay online"
              />
            </Button>
          </ListItem>
        </List>
      </Dialog>

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
            Share your exprience with the dish by rating.
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
    </>
  );
}
