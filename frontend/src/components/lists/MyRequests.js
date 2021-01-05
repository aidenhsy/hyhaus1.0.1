import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0 20%',
    flexDirection: 'column',
  },
  listItem: {
    height: 100,
  },
}));

const MyRequests = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button divider className={classes.listItem}>
          <ListItemText primary="Request one" />
        </ListItem>
        <ListItem button divider className={classes.listItem}>
          <ListItemText primary="Request two" />
        </ListItem>
        <ListItem button divider className={classes.listItem}>
          <ListItemText primary="Request three" />
        </ListItem>
        <ListItem button divider className={classes.listItem}>
          <ListItemText primary="Request four" />
        </ListItem>
      </List>
    </div>
  );
};

export default MyRequests;
