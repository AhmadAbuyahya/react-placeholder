import { useEffect, useState } from "react";
import { get } from "../../api";
import Post from "../post";
import { Button, Container, Grid } from "@mui/material";
import Modal from "../post-modal";
import DeleteConfirmationModal from "../delete-confimation";

export interface IPost {
  id: number;
  userId: string;
  body: string;
  title: string;
}

export default function PostsList() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<IPost | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [postToDeleteId, setPostToDeleteId] = useState<number | null>(null);

  async function loadPosts() {
    setLoading(true);
    const posts = await get<IPost[]>("/posts");
    setPosts(posts);
    setLoading(false);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = (id: number | null) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <div>
      <h1>Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Container maxWidth="lg">
          <div>
            <Button
              variant="contained"
              onClick={() => {
                setModalOpen((prev) => !prev);
              }}
            >
              Add new post
            </Button>
          </div>
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onEdit={() => {
                  setPostToEdit(post);
                  setModalOpen(true);
                }}
                onDelete={() => {
                  setPostToDeleteId(post.id);
                  setDeleteConfirmationOpen(true);
                }}
              />
            ))}
          </Grid>
          {modalOpen && (
            <Modal
              open={modalOpen}
              handleClose={() => {
                setModalOpen(false);
                setPostToEdit(null);
              }}
              post={postToEdit}
            />
          )}

          {deleteConfirmationOpen && (
            <DeleteConfirmationModal
              open={deleteConfirmationOpen}
              handleClose={() => {
                setDeleteConfirmationOpen(false);
              }}
              confirm={() => {
                handleDelete(postToDeleteId);
                setDeleteConfirmationOpen(false);
              }}
            />
          )}
        </Container>
      )}
    </div>
  );
}
