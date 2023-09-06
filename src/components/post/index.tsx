import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { IPost } from "../posts-list";

export default function Post({
  post,
  onEdit,
  onDelete,
}: {
  post: IPost;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h4" color="text.secondary" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="h6" component="div">
            {post.body}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={onDelete} color="error" size="small">
            Delete
          </Button>
          <Button onClick={onEdit} size="small">
            Edit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
