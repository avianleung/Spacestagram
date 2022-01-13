import React, { Fragment, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleSnackbar(props) {
  const { url } = props

  const [open, setOpen] = useState(false);

  // copies url of img to clipboard
  const handleClick = () => {
    navigator.clipboard.writeText(url)
    setOpen(true);
  };

  // triggered when copy notif should be closed
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
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