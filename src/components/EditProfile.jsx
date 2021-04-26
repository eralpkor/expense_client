import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { MainContainer } from './MainContainer';
import { Form } from './Form';
import { Input } from './Input';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { PrimaryButton } from './PrimaryButton';

const schema = yup.object().shape({
  firstname: yup
    .string().min(2, 'Minimum of 2 chars required.')
    .max(50, 'Not more than 50 chars')
    .matches(/^([^0-9]*)$/, 'First name should not contain numbers.'),
  lastname: yup
    .string().min(2, 'Minimum of 2 chars required.')
    .max(50, 'Not more than 50 chars')
    .matches(/^([^0-9]*)$/, 'Last name should not contain numbers.'),
  email: yup
    .string()
    .email('Email is not in correct format!')
});

export default function EditProfile(props) {
  // const { data, setValues } = useData();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  // const classes = useStyles();
  const {
    control,
    register,
    errors,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      firstname: props.firstname,
      lastname: props.lastname,
      email: props.email,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit = (e) => {
    console.log(currentUser);

    if (!currentUser) {
      props.history.push("/login");
      window.location.reload();
    }
    console.log("ERROR message ", message);
    props.edit(e);
    reset();
  };

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit(onSubmit)} >
        <Input 
          ref={register}
          name="firstname"
          type="text"
          label="First Name"
          error={!!errors.firstname}
          helperText={errors?.firstname?.message}
        />
        <Input 
          ref={register}
          name="lastname"
          type="text"
          label="Last Name"
          error={!!errors.lastname}
          helperText={errors?.lastname?.message}
        />
        <Input 
          ref={register}
          name="email"
          type="text"
          label="Email"
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </Form>
    </MainContainer>
  );
}
