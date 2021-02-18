import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import CircularLoading from "../utils/Loading";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import AddExpenseForm from "./AddExpenseForm";
import DeleteSelected from "./DeleteSelected";

import UserService from "../services/user.service";
import { useDispatch, useSelector } from "react-redux";



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
  const { user: currentUser } = useSelector((state) => state.auth);

  const classes = useStyles();

  // console.log(currentUser);

// I can put useeffect in a function and call it again in
// delete selected function
// OR make deleteSelected async function and create two promises
// call it one an after



  useEffect(() => {
    if (!currentUser) {
      props.history.push("/login");
      window.location.reload();
  }
    UserService.getUserExpense()
      .then((res) => {
        // console.log(res.data);
        setExpenses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let message;

  const create = (newExpense, tags) => {
    axiosWithAuth()
      .post("/expense", { ...newExpense, tags: tags })
      .then((res) => {
        setExpenses([...expenses, res.data.expense[0]]);
      })
      .catch((err) => {
        // set error message for amount
        message = err.response.data.errors[0].msg;
        console.log(message);
      });
  };

  const deleteSelected =  () => {

    var filteredExpenses = expenses.filter(val => !data.includes(val.id))
    
    data.map((val) => {
      return axiosWithAuth()
        .delete(`/expense/${val}`)
        .then((res) => {
          // update the UI after removing selected expenses
          // let newExpenses = expenses.filter((ex) => ex.id !== Number(val));
          setExpenses(filteredExpenses)
        })
        .catch((err) => err.response);
    });

    // let result = data.map(del => {
    //   return expenses.filter(ex => {
    //     return ex.id !== Number(del)
    //   })
    // })
    // console.log('Result should be ', result);
  };

  return (
    <div className={classes.root}>
      {!expenses.length && <CircularLoading />}
      {expenses.length && (
        <div style={{ flexGrow: 1, width: 1000, height: 400 }}>
          <DataGrid
            autoHeight
            rows={expenses}
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
      <DeleteSelected
        checkboxSelection={data}
        deleteSelected={deleteSelected}
      />
      <AddExpenseForm addExpense={create} message={message} />
    </div>
  );
}
