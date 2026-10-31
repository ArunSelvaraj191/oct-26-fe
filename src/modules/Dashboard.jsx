import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

const Dashboard = () => {
  const username = localStorage.getItem("username") || "there";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [users, setUsers] = useState([]);
  const [editedId, setEditedID] = useState(null);
  const [editedUsername, setEditedUsername] = useState("");

  const handleUpdate = async () => {
    const payload = {
      id: editedId,
      username: editedUsername,
    };
    await axios
      .put(`${API_URL}/users`, payload, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log("response =>", response);
        if (response.status == 200) {
          alert(response.data.message);
          setEditedID(null);
          setEditedUsername("");
          fetchUsers();
        }
      })
      .catch((error) => {
        console.log("response error =>", error.response?.data?.message);
        alert(error.response?.data?.message || "User fetching Failed!");
        handleLogout();
      });
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log("response =>", response);
        if (response.status == 200) {
          alert(response.data.message);
          fetchUsers();
        }
      })
      .catch((error) => {
        console.log("response error =>", error.response?.data?.message);
        alert(error.response?.data?.message || "User fetching Failed!");
        handleLogout();
      });
  };

  const handleChangeEdit = (event) => {
    const { value } = event.target;
    setEditedUsername(value);
  };

  const handleEdit = (id, username) => {
    setEditedUsername(username);
    setEditedID(id);
  };

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
          {users?.map((user, index) => (
            <Card
              key={user._id}
              variant="outlined"
              sx={{ p: 2, borderRadius: 2 }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "primary.light", color: "primary.dark" }}
                >
                  {(user.username || "?").charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  {editedId == user._id ? (
                    <TextField
                      value={editedUsername}
                      onChange={handleChangeEdit}
                    />
                  ) : (
                    <Typography fontWeight={600} noWrap>
                      {user.username || "Unknown user"}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {user.email || "No email provided"}
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={1}
                sx={{ mt: 2, pt: 1.5, borderTop: 1, borderColor: "divider" }}
              >
                {editedId == user._id ? (
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<SaveIcon />}
                    onClick={handleUpdate}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(user._id, user.username)}
                  >
                    Edit
                  </Button>
                )}
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </Button>
              </Stack>
            </Card>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
