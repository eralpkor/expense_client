import React from 'react';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '50px'
  }
}));

export default function DeleteSelected(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {!props.deleted ? (
        <Container component="main" maxWidth="xs">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={props.deleteSelected}
            >
              Delete selected
            </Button>
        </Container>
      ) : (
        <Divider   />
      )}
    </div>
  )
}

// EOF