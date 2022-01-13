import React, { useState, useEffect } from 'react';
import store from "store";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';

export default function LikedPage(props) {
  const { date, title, explanation, url, hdurl, mediaType } = props

  const [liked, setLiked] = useState(false)

  function handleLike() {
      liked ? store.remove(`${date}`) : store.set(`${date}`, mediaType === "image" ? (hdurl ? hdurl : url) : url)
      setLiked(!liked)
  }

  useEffect(() => {
    if (store.get(`${date}`)) {
      setLiked(true);
    }
  }, []);

  return (
    <Card sx={{ maxWidth: 550 }}>
      <CardHeader
        title={title}
        subheader={date}
      />
      {mediaType === "image" && (
        <CardMedia
            component="img"
            image={hdurl ? hdurl : url}
            alt="Space Image"
        />
      )}
      {mediaType === "video" && (
        <CardMedia
            component="iframe"
            src={url}
            alt="Space Video"
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {explanation}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <IconButton aria-label="add to favorites" onClick={handleLike}>
        {liked ? (
            <FavoriteIcon />
        ) : (
            <FavoriteBorderIcon />
        )}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}