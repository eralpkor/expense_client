import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
// import { useForm } from "react-hook-form";
import CircularLoading from "../utils/Loading";
import { Button } from "@material-ui/core";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useForm, Controller } from "react-hook-form";
import Container from "@material-ui/core/Container";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';



const useStyles = makeStyles((theme) => ({
  root: {
    width: 1024,
    // height: 500,
    margin: "auto",
    marginTop: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "column",
    height: "100%",
  },
  CircleLoading: {
    marginTop: 600,
  },
  divider: {
    margin: "auto",
    marginTop: 60,
  },
  form: {
    marginTop: 10,
  },
}));

const columns = [
  { field: "title", headerName: "Title", width: 230 },
  { field: "amount", headerName: "Amount", type: "number", width: 130 },
  {
    field: "tags",
    headerName: "Tags",
    type: "string",
    width: 120,
  },
  {
    field: "created_at",
    headerName: "Created",
    type: "string",
    width: 190,
  },
  {
    field: "updated_at",
    headerName: "Updated",
    type: "string",
    width: 200,
  },
];

export default function UserHome(props) {
  const [expenses, setExpenses] = useState([]);
  const [data, setData] = useState([]); // for checkbox selection
  const [auto, setAuto] = useState({}); // used for auto complete
  const { control, register, errors, handleSubmit, reset,
    formState: { isSubmitSuccessful }
  } = useForm({ defaultValues: { title: '', amount: ''}});

  const classes = useStyles();

  useEffect(() => {
    return axiosWithAuth()
      .get('/')
      .then(res => {
        setExpenses({ expense: res.data})
      })
      .catch(err => console.log(err));
  }, []);

  const onAuto = (tag) => {
    if (!tag) {
      console.log('WTF dude')
    }
    setAuto(tag);
    console.log(auto);
  }

  const create = (newExpense, tags) => {
    // setExpenses({
    //   expense: [...expenses, newExpense]
    // })
    axiosWithAuth()
    .post('/expense', { ...newExpense, tags: tags })
    .then(res => console.log("This is the post response: ", res.data.expense[0]))
    .then(res => setExpenses([...expenses, res.data.expense[0]]))
    .catch(err => console.log(err))
  }
  const onSubmit = (e) => {
    // e.preventDefault();
    let tags = auto.tags;
    if (!tags) {
      console.log('WTF dude/');
    }
    // if (isSubmitSuccessful) {
    //   reset({ title: '', amount: '' })
    // }
    create(e, tags)

      reset({ title: '', amount: '' })
  }

  console.log('iste budur: ', expenses);
  

  return (
    <div className={classes.root}>
      {!expenses.length && <CircularLoading />}
      {expenses.length && (
        <div style={{ flexGrow: 1, width: 1000, height: 400 }}>
          <DataGrid
            autoHeight
            rows={expenses.expense}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onSelectionChange={(newSelection) => {
              console.log("new selection", newSelection.rowIds);
              setData(newSelection.rowIds);
            }}
            {...data}
          />
        </div>
      )}

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
    </div>
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