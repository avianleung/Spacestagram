import React, { useState, useEffect, useRef } from 'react';
import store from "store";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Share from "./Share"

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SpaceCard(props) {
  const { date, title, explanation, url, hdurl, mediaType } = props

  const [liked, setLiked] = useState(false)
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function handleLike() {
    const spaceItem = {
      date,
      title,
      explanation,
      url,
      hdurl,
      mediaType
    }
    liked ? store.remove(`${date}`) : store.set(`${date}`, spaceItem)
    setLiked(!liked)
  }

  useEffect(() => {
    if (store.get(`${date}`)) {
      setLiked(true);
    }
  }, []);

  return (
    <Card sx={{ width: 560, opacity: 0.75 }}>
      <CardHeader
        style={{ textAlign: 'center' }}
        titleTypographyProps={{variant:'h7' }}
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
            sx={{ height: 300}}
            component="iframe"
            src={url}
            alt="Space Video"
        />
      )}
      <CardActions disableSpacing >
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          {liked ? (
              <FavoriteIcon />
          ) : (
              <FavoriteBorderIcon />
          )}
        </IconButton>
        <Share url={hdurl ? hdurl : url} />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      {/* <CardContent style={{ paddingTop: "6px" }}> */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Typography variant="body2" color="text.secondary" style={{ padding: "0 15px 15px 15px" }}>
          {explanation}
        </Typography>
        </Collapse>
      {/* </CardContent> */}
    </Card>
  );
}