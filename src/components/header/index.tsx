import React from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <header className={styles.header}>
      Welcome {user?.name}!{" "}
      <button
        onClick={() => {
          logout().then(() => {
            navigate("/");
          });
        }}
      >
        Sign out
      </button>
    </header>
  );
}
