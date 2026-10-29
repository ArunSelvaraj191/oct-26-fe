import {
  Avatar,
  Box,
  Button,
  Card,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const username = localStorage.getItem("username") || "there";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [users, setUsers] = useState([]);

  console.log("users ::", users);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchUsers = async () => {
    await axios
      .get(`${API_URL}/users`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log("response =>", response);
        if (response.status == 200) {
          // alert(response.data.message);
          setUsers(response.data.users);
        }
      })
      .catch((error) => {
        console.log("response error =>", error.response?.data?.message);
        alert(error.response?.data?.message || "User fetching Failed!");
        handleLogout();
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchUsers();
    }
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fb", p: { xs: 2, sm: 4 } }}>
      <Paper
        elevation={0}
        sx={{
          maxWidth: 1000,
          mx: "auto",
          p: { xs: 2, sm: 3 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              {username.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Welcome, {username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Here’s your dashboard.
              </Typography>
            </Box>
          </Stack>
          <Button variant="outlined" color="inherit" onClick={handleLogout}>
            Log out
          </Button>
        </Stack>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          maxWidth: 1000,
          mx: "auto",
          mt: 3,
          p: { xs: 2, sm: 3 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Users
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          {users.map((user, index) => (
            <Card
              key={user.id ?? user._id ?? user.email ?? index}
              variant="outlined"
              sx={{ p: 2, borderRadius: 2 }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "primary.light", color: "primary.dark" }}
                >
                  {(user.username || "?").charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ minWidth: 0 }}>
                  <Typography fontWeight={600} noWrap>
                    {user.username || "Unknown user"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {user.email || "No email provided"}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
