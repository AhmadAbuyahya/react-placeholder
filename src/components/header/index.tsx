import React from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { Button, Typography } from "@mui/material";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return user ? (
    <header className={styles.header}>
      <Typography variant="h6" component="h1" gutterBottom>
        Welcome {user?.name}!
      </Typography>
      <Button
        type="submit"
        variant="contained"
        onClick={() => {
          logout().then(() => {
            navigate("/");
          });
        }}
      >
        Sign out
      </Button>
    </header>
  ) : null;
}
