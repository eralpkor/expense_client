import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { useForm, Controller } from "react-hook-form";

// import useDeleteState from '../hooks/useDeleteState';
// import { deleteData } from '../store/actions';
// import { useSelector, useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0
  }
}));

export default function DeleteSelected(props) {
  // const [deleted, del] = useDeleteState(false);
  
  console.log('DELETE selected props ',props.checkboxSelection);
  // const [expense, setExpense] = React.useState({});
  // const [data, setData] = React.useState({});
  const classes = useStyles();
  const { handleSubmit, reset,
    formState: { isSubmitSuccessful }
  } = useForm();

  let selection = props.selection;

  // delete all selected expenses
  // const deleteSelected = async () => {
  //   console.log('is submit successful ', isSubmitSuccessful)
  //   const deleteThis = await props.checkboxSelection.map((val, i) => {
  //     return axiosWithAuth()
  //       .delete(`/expense/${val}`)
  //       .then(res => {
  //         // console.log('DELETED: ', val);
  //         console.log('what is res here ', res);
  //       }).catch(err => console.log('Something not cool   '))
  //   });
  // }


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