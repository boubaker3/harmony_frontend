import React from "react";
import "./Styles/Search.css";
import {
  Avatar,
  Typography,
  Button,
  Box,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Input,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RestaurentItem from "./RestaurentItem";
import axiosInstance from "./AxiosConfig";
export default function Search() {
  const [searchedFor, setSearch] = useState("");
  const [restaurents, setRestaurents] = useState([]);

  const SearchedFor = (event) => {
    setSearch(event.target.value);

    axiosInstance
      .get(`searchForRestaurents?searchFor=${searchedFor}`)
      .then((response) => {
        setRestaurents(response.data.restaurents);
        console.log(restaurents);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <Grid container sx={{ height: "100%", width: "100%" }}>
        <Grid item xs={12} md={6}>
          <Typography
            sx={{
              fontFamily: "Bungee Inline",
              fontWeight: "bold",
              fontSize: { xs: "24px", md: "28px", lg: "32px" },
            }}
            variant="h1"
          >
            Search for Restaurents
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            value={searchedFor}
            onChange={SearchedFor}
            sx={{ margin: { xs: "25px", md: "0px" } }}
            className="searchInput"
            disableUnderline
            placeholder="Search for restaurents"
            startAdornment={
              <InputAdornment position="start">
                {" "}
                <SearchIcon />
              </InputAdornment>
            }
          ></Input>
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              margin: {
                xs: "25px",
                md: "0px",
                fontFamily: "montserrat",
                fontSize: "20px",
                display: searchedFor.length == 0 && "none",
              },
            }}
          >
            Results for {searchedFor}{" "}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ marginTop: "50px" }}>
            {restaurents.map((restaurent) => (
              <Box
                key={restaurent.id}
                sx={{ display: "inline-block", marginLeft: "20px" }}
              >
                <RestaurentItem restaurent={restaurent} margin={true} />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
