import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";

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

export default function AddExpenseForm(props) {
  const [auto, setAuto] = useState({}); // used for tricking the auto complete.
  const classes = useStyles();
  const {
    control,
    register,
    errors,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({ defaultValues: { title: "", amount: "" } });

  const onAuto = (tag) => {
    if (!tag) {
      console.log("WTF dude");
    }
    setAuto(tag);
    console.log(auto);
  };

  const onSubmit = (e, shit) => {
    let tags = auto.tags;
    if (!tags) {
      console.log("WTF dude/");
    }

    props.addExpense(e, tags);
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
          inputRef={register({ required: true, minLength: 2 })}
          label="Title"
          autoFocus
          name="title"
          control={control}
        />
        {errors.title &&
          errors.title.type === "required" &&
          "Title is required!"}
        {errors.title &&
          errors.title.type === "minLength" &&
          "This field required min length of 2"}

        <Controller
          as={TextField}
          variant="outlined"
          margin="normal"
          fullWidth
          required
          inputRef={register}
          label="Amount"
          defaultValue=""
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
          maxwidth="xs"
          onChange={(event, value) => onAuto(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select a tag"
              variant="outlined"
              name="tags"
              required
              control={control}
              rules={{ required: true }}
            />
          )}
        />
        {errors.tags && "Tags required"}

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
