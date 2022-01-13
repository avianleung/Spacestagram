import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleSnackbar(props) {
  const { url } = props

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(url)
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <IconButton 
        aria-label="share" 
        onClick={handleClick}
      >
          <ShareIcon />
      </IconButton>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleClose}
        message="Image link copied to clipboard"
        action={action}
      />
    </div>
  );
}