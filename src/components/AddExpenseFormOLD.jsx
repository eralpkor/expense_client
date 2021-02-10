import React, { useState, useEffect} from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../store/actions';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 1024,
    // height: 500,
    margin: 'auto',
    marginTop: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    flexDirection: 'column',
    height: '100%',
  },
  CircleLoading: {
    marginTop: 600
  },
  divider: {
    margin: "auto",
    marginTop: 60,
  },
  form: {
    marginTop: 10,
  }
}));


export default function AddExpenseForm(props) {
  const [data, setData] = useState({}); // used for autocomplete
  let dataFromStore = useSelector(state => state.data);
  let isFetching = useSelector(state => state.isFetching);
  const dispatch = useDispatch();

  console.log('dataFrom store from  ', dataFromStore);

  const { control, register, errors, handleSubmit, reset,
    formState: { isSubmitSuccessful }
  } = useForm({ defaultValues: { title: '', amount: ''}});

  const classes = useStyles();


  const onAuto = (tag) => {
    if (!tag) {
      console.log('WTF dude')
    }
    setData(tag);
    console.log(data);
  }

  const onSubmit = (event) => {
    console.log(event);
    console.log('Where is the data ', data.tags);
    let tags = data.tags;
    if (!tags) {
      console.log('WTF dude');
    }
    if (isSubmitSuccessful) {
      reset({ title: '', amount: ''})
    }
    
    axiosWithAuth()
      .post(`/expense`, {...event, tags: tags })
      .then((res) => {
        console.log(res.data.expense[0])
      })
      .catch((err) => console.log("Axios error ", err.response));
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <form
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          as={TextField}
          variant="outlined"
          margin="normal"
          fullWidth
          required
          inputRef={register}
          label="Title"
          autoFocus
          name="title"
          control={control}
          rules={{ required: true }}
        />
          {errors.title && "Title is required!"}

          <Controller
            as={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            inputRef={register}
            label="Amount"
            autoFocus
            name="amount"
            control={control}
            rules={{ required: true }}
          />
          {errors.amount && "Amount is required!"}
      
        
        <Autocomplete
          id="combo-box"
          options={tags}
          getOptionLabel={(option) => option.tags}
          maxWidth="xs"
          onChange={(event, value) => onAuto(value)} 
          
          renderInput={(params) => 
            
            <TextField {...params}
            label="Select a tag" 
            variant="outlined"
            name="tags"
            required
            control={control}
            rules={{ required: true }}

          />}
        />
        {errors.tags && 'Tags required'}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          
        >
          Submit
        </Button>
      </form>
      </Container>
  )
}

const tags = [
  {tags: 'Automotive'},
  {tags: 'Food'},
  {tags: 'Mortgage'}, 
  {tags: 'Electric'}, 
  {tags: 'Gas'}, 
  {tags: 'Vacation'},
  {tags: 'Insurance'}, 
  {tags: 'Gift'},
]