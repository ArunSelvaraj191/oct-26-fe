import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [showPassword, setShowPassword] = useState(false);
  const outlinedPasswordId = useId();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevState) => ({
      ...prevState, // previous changes
      [name]: value, // current changes
    }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = async () => {
    console.log("Details :::", userDetails);
    if (!userDetails.email || !userDetails.password) {
      return alert("All fields are required!");
    }
    await axios
      .post(`${API_URL}/auth/login`, userDetails)
      .then((response) => {
        if (response.status == 200) {
          console.log("response =>", response);
          alert(response.data.message);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.user.username);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log("response error =>", error.response?.data?.message);
        alert(error.response?.data?.message || "Login Failed!");
      });
  };

  // const [count, setCount] = useState(0); //  const [state,setState] = useState(initialValue) => setCount(count+1)
  // const [disableBtn, setDisableBtn] = useState(false);
  // useEffect(()=>{},[])'

  // useEffect(() => {
  //   console.log("Login Updating", count);
  //   // if (count == 10) {
  //   //   setDisableBtn(true);
  //   // }
  // }, [count]);
  // const handleNew = () => {
  //   // window.open("https://mui.com/material-ui/react-text-field/");
  //   // window.location.href = "https://mui.com/material-ui/react-text-field/";
  // };
  // useEffect(() => {
  //   console.log("Login Mounted");
  //   return () => {
  //     console.log("Login Unmounted");
  //   };
  // }, []);
  return (
    <>
      <Typography variant="h4">Login Page</Typography>
      <Box sx={{ mt: 2 }}>
        <TextField
          name="email"
          label="Email"
          placeholder="Enter your email"
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor={`${outlinedPasswordId}-input`}>
            Password
          </InputLabel>
          <OutlinedInput
            id={`${outlinedPasswordId}-input`}
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={() => navigate("/register")}>
          create an account
        </Button>
        {/* <button onClick={handleNew}>New</button> */}
      </Box>
    </>
  );
};

export default Login;
