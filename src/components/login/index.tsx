import { useAuth } from "../../context/auth";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./login.module.css";
import {
  Box,
  Button,
  Container,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!username) {
      setError(true);
      return;
    }

    login(username).then(() => {
      navigate(from, { replace: true });
    });
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login To Start The Adventure
        </Typography>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            id="username"
            error={error}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(event.target.value);
              setError(false);
            }}
            label="Username"
            variant="outlined"
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}
