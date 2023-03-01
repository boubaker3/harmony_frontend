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
import ChefNotificationsItem from "./ChefNotificationItem";
import axiosInstance from "./AxiosConfig";
export default function ChefNotifications() {
  const [notifications, setNotifications] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  useEffect(() => {
    axiosInstance
      .get(`retrieveNotifications?userid=${user.userid}`)
      .then((response) => {
        setNotifications(response.data.notifications);
      })
      .catch((error) => {});
  }, []);

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
            Notifications
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ marginTop: "50px" }}>
            {notifications.map((notification) => (
              <ChefNotificationsItem
                notification={notification}
                key={notification.id}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
