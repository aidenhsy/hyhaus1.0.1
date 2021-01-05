import React from 'react';
import {
  Card,
  CardMedia,
  CardActions,
  CardHeader,
  Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    height: 0,
    paddingTop: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  card: {
    maxWidth: 345,
    borderRadius: 30,
  },
  cardHeader: {
    height: 15,
  },
  avatar: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  avatarnull: {
    '&:hover': {
      cursor: 'pointer',
    },
    backgroundColor: theme.palette.secondary.main,
  },
}));

const PhotoCard = ({ photo }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={photo.image}
        title={photo.name}
      />
      <CardActions>
        <CardHeader
          avatar={
            photo.user.image ? (
              <Avatar
                alt="Remy Sharp"
                src={photo.user.image}
                className={classes.avatar}
                component={Link}
                to="/profile/meganli"
              />
            ) : (
              <Avatar className={classes.avatarnull}>
                {photo.user.name.split(' ')[0].charAt(0)}
              </Avatar>
            )
          }
          title={
            <Link to="/profile/meganli" style={{ color: 'black' }}>
              {photo.user.name}
            </Link>
          }
          subheader={photo.time}
          className={classes.cardHeader}
        />
      </CardActions>
    </Card>
  );
};

export default PhotoCard;
