import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from './Form';
import { Input } from './Input';
import { MainContainer } from './MainContainer';
import { PrimaryButton } from './PrimaryButton';
import Modal from '@material-ui/core/Modal';

const schema = yup.object().shape({
  title: yup
    .string().min(3, 'Minimum of 3 characters required')
    .required('Title field is required'),
  amount: yup
    .number()
    .required('Amount is required. '),
  tags: yup
    .string()
    .required('Tags are required field.')
})

const useStyles = makeStyles((theme) => ({
  root: {
    width: 1024,
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '0px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5, 4, 3),
  },
  _modalClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '0.5em',
    lineHeight: 1,
    background: "#f6f6f7",
    border: 0,
    boxShadow: 0,
    cursor: 'pointer',
  },
  _modalCloseIcon: {
    width: '25px',
    height: '25px',
    fill: 'transparent',
    stroke: 'black',
    strokeLinecap: 'round',
    strokeWidth: 2,
  },
  _hideVisual: {
    border: '0 !important',
    clip: 'rect(0 0 0 0) !important',
    height: '1px !important',
    margin: '-1px !important',
    overflow: 'hidden !important',
    padding: '0 !important',
    position: 'absolute !important',
    width: '1px !important',
    whiteSpace: 'nowrap !important',
  },
}));

export default function AddExpenseForm(props) {
  const [auto, setAuto] = useState({}); // used for tricking the auto complete.
  const [open, setOpen] = useState(false);

  const { isExpired } = useSelector((state) => state.auth);
console.log('is it expired ', isExpired);
  const classes = useStyles();
  const {
    control,
    register,
    errors,
    handleSubmit,
    reset,
    // formState: { isSubmitted },
  } = useForm({
    defaultValues: {
      title: "", 
      amount: "",
      tags: "",
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
// console.log('is submit out of function ', isSubmitted);
  const onAuto = (tag) => {
    if (!tag) {
      console.log("WTF dude");
    }
    setAuto(tag);
    console.log(auto);
  };

  const onSubmit = async (e) => {
    if (isExpired) {
      props.history.push("/login");
    }
    let tags = auto.tags;
    if (!tags) {
      console.log("WTF dude/");
    }
   
    props.addExpense(e, tags);
    reset()
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
     <MainContainer className={classes.paper}>
      <button
        aria-label="Close Modal"
        aria-labelledby="close-modal"
        className={classes._modalClose}
        onClick={handleClose}
      >
        <span id="close-modal" className={classes._hideVisual}>
          Close
        </span>
        <svg className={classes._modalCloseIcon} viewBox="0 0 40 40">
          <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </button>
      <Form
        onSubmit={ handleSubmit(onSubmit)}
        onReset={event => {
          event.preventDefault();
        }}
      >
        <Input 
          ref={register}
          name='title'
          type='text'
          label='Title'
          required
          error={!!errors.title}
          helperText={errors?.title?.message}
        />
        <Input 
          ref={register}
          name='amount'
          type='number'
          label='Amount'
          required
          error={!!errors.title}
          helperText={errors?.amount?.message}
        />

        <Autocomplete
          id="combo-box"
          options={tags}
          getOptionLabel={(option) => option.tags}
          maxwidth="xs"
          onChange={(event, value) => onAuto(value)}
          renderInput={(params) => (
            <Input
            {...params}
              ref={register}
              name='tags'
              type='text'
              label='Select a tag'
              required
              error={!!errors.tags}
              helperText={errors?.tags?.message}
          />
          )}
        />
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </Form>
    </MainContainer>
    );
  
  return (
   <div>
    <PrimaryButton type="button" onClick={handleOpen}>
        Add Expense
    </PrimaryButton>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
      >
        {body}
      </Modal>
   </div>
  );
}

const tags = [
  { tags: "Automotive" },
  { tags: "Food" },
  { tags: "Mortgage" },
  { tags: "Electric" },
  { tags: "Gas" },
  { tags: "Vacation" },
  { tags: "Insurance" },
  { tags: "Gift" },
];

// EOF

{/* <TextField
              {...params}
              label="Select a tag"
              variant="outlined"
              name="tags"
              required
              control={control}
              rules={{ required: true }}
            /> */}