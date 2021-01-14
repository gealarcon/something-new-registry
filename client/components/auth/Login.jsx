import React, { useState } from "react";
import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";
import Register from "./Register";
import LoginBox from "./LoginBox";
import LoginNavBar from "../nav/LoginNavBar";
import {
  Button,
  Box,
  Card,
  CardMedia,
  Divider,
  AppBar,
  Paper,
  TextField,
  Typography,
  Grow,
  Slide,
  IconButton,
  InputAdornment,
  Dialog,
} from "@material-ui/core";
import useStyles from "../../style/theme";
import inputCheck from "../../utils/inputCheck";
import SearchCoupleBtn from "../findRegistry/searchCoupleBtn";

const Login = ({ registerUser, loginUser, ...rest }) => {
  const [emailInput, updateEmail, resetEmail] = useInput("");
  const [pwInput, updatePw, resetPw] = useInput("");
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [checkCookies, setCheckCookies] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseLogin = () => setLoginOpen(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowPasswordLogin = () =>
    setShowPasswordLogin(!showPassword);

  //I need to pass down checkcookies to productcard somehow
  if (document.cookie.match(/ssid/)) {
    () => setCheckCookies(true);
  }

  return (
    <div
      className={classes.root}
      style={{ filter: open ? "blur(5px)" : "none",
               background: "#E2F0EC" }}
    >
      
      <img style={{top: '0px', width: '100%', position: 'absolute'  }} src="https://i.postimg.cc/cHCX0mhf/kitchen.jpg" alt=""/>
      
      <AppBar style={{ filter: loginOpen ? "blur(5px)" : "none", background : "#F3F6F5", height: '8%' }}>
        <LoginNavBar setLoginOpen={setLoginOpen} />
      </AppBar>
        
      
        
      <Box className={classes.loginBox} flexWrap="wrap">
        <Button
          className={classes.loginCreateAccountBtn}
          onClick={handleClickOpen}
          variant="contained"
          
        >
          Build your own
        </Button>
        <div>
          <Link to="/searchcouple">
            <SearchCoupleBtn
              checkCookies={checkCookies}
              className={classes.findRegistryBtn}
              variant="contained"
            />
          </Link>
        </div>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <Register registerUser={registerUser} setOpen={setOpen} />
      </Dialog>

      <Dialog open={loginOpen} onClose={handleCloseLogin}>
        <LoginBox loginUser={loginUser} setLoginOpen={setLoginOpen} />
      </Dialog>
    </div>
  );
};

export default Login;
