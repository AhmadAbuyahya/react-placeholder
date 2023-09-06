import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { IPost } from "../posts-list";
import { put, post as postApi } from "../../api";

export default function Modal({
  open,
  handleClose,
  post,
}: {
  open: boolean;
  handleClose: () => void;
  post: IPost | null;
}) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    if (post) {
      put<IPost>(`/posts/${post.id}`, {
        title,
        body,
      })
        .then(() => {
          handleClose();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      postApi<IPost>(`/posts`, {
        title,
        body,
        userId: 1,
      })
        .then((res) => {
          handleClose();
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Post</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Post Title"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <TextField
          margin="dense"
          id="body"
          label="Post Body"
          fullWidth
          multiline
          rows={10}
          variant="outlined"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>
          {loading ? "Loading..." : `${post ? "Update" : "Add"}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
