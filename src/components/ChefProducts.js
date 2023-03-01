import * as React from "react";
import CardContent from "@mui/material/CardContent";
import { Avatar, Typography, Button, Card, Box, Chip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axiosInstance from "./AxiosConfig";
export default function ChefProducts(props) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current.contains(event.target)) {
      return;
    }

    axiosInstance
      .get(`deleteProducts?productId=${props.item.product_id}`)
      .then((response) => {
        setOpen(false);
      })
      .catch((error) => {});
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }
  const close = () => {
    setOpen(false);
  };
  const prevOpen = React.useRef(open);
  return (
    <>
      <Card
        className="Card"
        sx={{
          width: { xs: "300px", sm: "300px" },
          boxShadow: "rgba(149, 157, 165, 0.5) 0px 8px 24px",
          borderRadius: "38px",
          padding: "0 10px 0 10px",
          marginBottom: "50px",
          marginTop: "50px",
        }}
      >
        {props.item.userid == user.userid && (
          <>
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
                        <MenuItem onClick={handleClose}>
                          {<DeleteIcon />} Delete
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </>
        )}

        <Avatar
          src={props.item.product_image}
          sx={{
            borderRadius: "  100%",
            width: " 180px",
            height: "180px",
            left: "0",
            right: "0",
            margin: props.item.userid != user.userid ? "25px auto" : "auto",
          }}
        ></Avatar>

        <CardContent>
          <Box>
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
                fontSize: "24px",
                marginTop: "10px",
              }}
              variant=" "
            >
              {props.item.product_name}
            </Typography>
          </Box>
          <Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  display: "inline-block",
                }}
              >
                rating:
              </Typography>
              <Chip
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "16px",
                  verticalAlign: "middle",
                }}
                icon={
                  <StarIcon
                    sx={{
                      color: "var(--yellow) !important",
                      width: "25px",
                      height: "25px",
                    }}
                  />
                }
                label={props.item.rating}
              />
            </Box>

            <Typography
              sx={{ fontFamily: "Montserrat", fontSize: "16px" }}
              gutterBottom
              variant="h6"
              component="div"
            >
              price: {props.item.product_price}
            </Typography>
          </Box>
          <Button
            component={Link}
            to={{
              pathname: "/productDetails",
              search: `?productId=${props.item.product_id}&userid=${props.item.userid}`,
            }}
            disableElevation
            variant="contained"
            sx={{
              paddingLeft: "40px",
              paddingRight: "40px",
              color: "white",
              borderRadius: "38px",
              fontFamily: "Montserrat",
              fontSize: "18px",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
              marginTop: " 25px",
              textAlign: "center",
            }}
          >
            To Details
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
