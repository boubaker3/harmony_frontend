import * as React from "react";
import { Avatar, Typography, Card, Grid } from "@mui/material";
import "./Styles/Notifications.css";
export default function Feedbacks(props) {
  const [openDialog, setOpenDialog] = React.useState(false);

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
                {props.item.created_at}{" "}
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
                {" "}
                {props.item.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                noWrap
                sx={{
                  fontFamily: "Montserrat",
                  textOverflow: "ellipsis",
                  margin: "20px",
                  fontSize: "14px",
                  color: "gray",
                }}
              >
                {" "}
                {props.item.type == "user_feedback"
                  ? props.item.feedback
                  : props.item.product_feedback}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
