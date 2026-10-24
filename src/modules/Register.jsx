import {
  Box,
  Button,
  OutlinedInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const outlinedPasswordId = useId();

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowCPassword = () => setShowCPassword((show) => !show);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevState) => ({
      ...prevState, // previous changes
      [name]: value, // current changes
    }));
  };

  const handleRegister = async () => {
    if (
      !userDetails.username ||
      !userDetails.email ||
      !userDetails.password ||
      !userDetails.cpassword
    ) {
      return alert("All fields are required!");
    }
    if (userDetails.password != userDetails.cpassword) {
      return alert("Password doesn't match!");
    }
    const payload = {
      username: userDetails.username,
      email: userDetails.email,
      password: userDetails.password,
    };
    await axios
      .post(`${API_URL}/auth/register`, payload)
      .then((response) => {
        console.log("response =>", response);
        if (response.status == 200) {
          alert(response.data.message);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("response error =>", error.response?.data?.message);
        alert(error.response?.data?.message || "Register Failed!");
      });
  };

  // useEffect(() => {
  //   console.log("Register Mounted");
  //   return () => {
  //     console.log("Register Unmounted");
  //   };
  // }, []);
  return (
    <>
      <Typography variant="h4">Register Page</Typography>
      {/* <h1>Register Page</h1> */}
      <Box sx={{ mt: 2 }}>
        <TextField
          required
          name="username"
          label="Username"
          placeholder="Enter your username"
          value={userDetails.username}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <TextField
          required
          name="email"
          label="Email"
          placeholder="Enter your email"
          value={userDetails.email}
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
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor={`${outlinedPasswordId}-input`}>
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id={`${outlinedPasswordId}-input`}
            type={showCPassword ? "text" : "password"}
            name="cpassword"
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showCPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowCPassword}
                  edge="end"
                >
                  {showCPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleRegister}>
          Register
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Already user? Goto Login
        </Button>
      </Box>
    </>
  );
};

export default Register;
