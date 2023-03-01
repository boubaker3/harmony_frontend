import * as React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import axiosInstance from "./AxiosConfig";
import "./Styles/Home.css";
import ChefProducts from "./ChefProducts";
import Carousel from "react-elastic-carousel";
export default function ChefHomePage() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [products, setProducts] = useState([]);
  const breakPoints = [
    { width: 1, itemsToShow: 1, showArrows: false },
    { width: 550, itemsToShow: 1, showArrows: false },
    { width: 850, itemsToShow: 2 },
    { width: 1150, itemsToShow: 3 },
    { width: 1450, itemsToShow: 3 },
    { width: 1750, itemsToShow: 3 },
  ];
  useEffect(() => {
    if (user.type == "chef") {
      axiosInstance
        .get(`retrieveProducts?userid=${user.userid}&type=chef`)
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else if (user.type == "shipper") {
      axiosInstance
        .get(`retrieveProducts?userid=${user.userid}&type=shipper`)
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch((error) => {});
    }
  }, [products]);

  return (
    <>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontFamily: "Bungee Inline",
              fontWeight: "bold",
              fontSize: { xs: "24px", md: "28px", lg: "32px" },
            }}
            variant="h1"
          >
            Home
          </Typography>
        </Grid>

        <Grid item xs={8} sx={{ marginTop: "50px" }}>
          <Typography
            variant="h4"
            sx={{
              display: { xs: "none", md: "inline-block" },
              fontFamily: "Montserrat",
              color: "gray",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            My Products
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <Carousel enableSwipe breakPoints={breakPoints}>
              {products.map((item) => (
                <ChefProducts item={item} key={item.id} />
              ))}
            </Carousel>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
