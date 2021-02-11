import React from "react";
import { useForm, Controller } from "react-hook-form";
import { axiosWithAuth, logout } from "../utils/axiosWithAuth";
import MaterialUIInput from "@material-ui/core/Input";

export default function LoginForm(props) {
  const { control, register, errors, handleSubmit } = useForm();

  const onSubmit = (data) => {
    axiosWithAuth()
      .post(`/login`, data)
      .then((res) => {
        console.log("This is response ", res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.id);
        // props.history.push('/welcome')
      })
      .catch((err) => console.log("Axios error ", err.response));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={MaterialUIInput}
        name="username"
        control={control}
        defaultValue=""
        rules={{ required: true }}
      />
      {errors.username && "username is required"}
      <Controller
        as={MaterialUIInput}
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: true }}
      />
      {errors.password && "password is required"}
      {/* <input name="username" ref={register({ required: true, maxLength: 20 })} />
      {errors.username && "First name is required"}
      <input name="password" ref={register({ required: true })} />
      {errors.password && "Last name is required"} */}
      {/* <input name="age" type="number" ref={register({ min: 18, max: 99 })} /> */}
      <input type="submit" />
    </form>
  );
}
