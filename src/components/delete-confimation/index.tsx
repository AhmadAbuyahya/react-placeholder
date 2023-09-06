import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function DeleteConfirmationModal({
  open,
  handleClose,
  confirm,
}: {
  open: boolean;
  handleClose: () => void;
  confirm: () => void;
}) {
  return (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Delete Post
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        You are about to delete this post. Are you sure?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button color="error" onClick={confirm} autoFocus>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
  );
}
