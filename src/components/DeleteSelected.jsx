import React from 'react';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';



const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0
  }
}));

export default function DeleteSelected(props) {

  return (
    <div>
      {props.checkboxSelection.length ? (
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
        <Divider className='divider' color='secondary'  />
      )}
    </div>
  )
}

// EOF