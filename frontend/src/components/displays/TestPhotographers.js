import React, { useEffect } from 'react';
import {
  Avatar,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import { fetchPhotographers } from '../../redux/photographer';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    marginLeft: '4em',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  avatarnull: {
    '&:hover': {
      cursor: 'pointer',
    },
    backgroundColor: theme.palette.secondary.main,
  },
}));

const TestPhotographers = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotographers());
  }, [dispatch]);

  const { photographers } = useSelector((state) => state.photographer);

  return (
    <List className={classes.root}>
      {photographers.map((photographer) => (
        <ListItem
          alignItems="flex-start"
          component={Link}
          to={`/photographers/${photographer._id}`}
        >
          <ListItemAvatar>
            {photographer.image ? (
              <Avatar alt={photographer.name} src={photographer.image} />
            ) : (
              <Avatar className={classes.avatarnull}>
                {photographer.name.split(' ')[0].charAt(0)}
              </Avatar>
            )}
          </ListItemAvatar>
          <ListItemText
            primary={photographer.name}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {photographer.city}
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TestPhotographers;
