import React, { useEffect, useState, useRef } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import CircularLoading from "../utils/Loading";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import AddExpenseForm from "./AddExpenseForm";
import DeleteSelected from "./DeleteSelected";

import UserService from "../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { getUserExpenses } from "../store/actions/auth";

import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
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
  message: {
    textAlign: "center",
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
  const { message } = useSelector((state) => state.message);
  const [successful, setSuccessful] = useState(false);
  const { isExpired } = useSelector((state) => state.auth);
  const [userMessage, setUserMessage] = useState(message);
  const [isDeleted, setIsDeleted] = useState(true);
  const [data, setData] = useState([]); // for checkbox selection
  const { user: currentUser } = useSelector((state) => state.auth);
  const classes = useStyles();
  const dispatch = useDispatch();

  let isRendered = useRef(null);
// console.log('is token expired ', isExpired);
  useEffect(() => {
    isRendered.current = true;
    setUserMessage(message);
    setIsDeleted(true);
    if (!currentUser || isExpired) { // check if isExpired works
      props.history.push("/login");
      window.location.reload();
    }
    setSuccessful(false);

    if (isRendered.current) {
      dispatch(getUserExpenses());
    }

    UserService.getUserExpense()
      .then((response) => {
        console.log("response data", response.data);
        if (response.status === 202) {
          setSuccessful(true);
          setIsDeleted(true);
        }
        if (!response.data.message && isRendered.current) {
          setExpenses(response.data);
          setSuccessful(true);
        }
        // return setSuccessful(false)
      })
      .catch((err) => {
        console.log("Some data error", err);
        setSuccessful(false);
        setIsDeleted(true);
      });

    return () => (isRendered.current = false);
  }, []);

  let msg;
  const create = (newExpense, tags) => {
    setSuccessful(false);
    setIsDeleted(true);
    console.log("who is current user ", currentUser);

    if (!currentUser || isExpired) {
      setSuccessful(false);
      console.log("who is current user ", currentUser);
      props.history.push("/login");
      window.location.reload();
    }
    console.log("what is message token ", message);
    axiosWithAuth()
      .post("/expense", { ...newExpense, tags: tags })
      .then((res) => {
        setSuccessful(true);

        setExpenses([...expenses, res.data.expense[0]]);
        // setUserMessage('');
      })
      .catch((err) => {
        // set error message for amount
        msg = err.response.data.errors[0].msg;
        setSuccessful(false);
        console.log(msg);
      });
  };

  const deleteSelected = () => {
    setIsDeleted(false);
    // filter out selected expenses for deleting
    var filteredExpenses = expenses.filter(
      (val) => !data.includes(val.id.toString())
    );

    data.map((val) => {
      return axiosWithAuth()
        .delete(`/expense/${val}`)
        .then((res) => {
          // update the UI after removing selected expenses
          setExpenses(filteredExpenses);
          setIsDeleted(true);
          console.log(message);
        })
        .catch((err) => {
          console.log(err.response);
          setIsDeleted(false);
        });
    });
  };

  // "^4.0.0-alpha.13"
  // @material-ui/lab": "^4.0.0-alpha.57",
  // {successful}
console.log('what is userMessage ', userMessage);
  return (
    <div className={classes.root}>
      {expenses.length ? (
        <div style={{ flexGrow: 1, width: 1000, height: 400 }}>
          <DataGrid
            autoHeight
            rows={expenses}
            columns={columns}
            pageSize={5}
            checkboxSelection
            // set checkbox selection for deleting
            onSelectionChange={(newSelection) => {
              setData(newSelection.rowIds);
              console.log('what is newSelection ', newSelection.rowIds)
              !newSelection.rowIds.length ? setIsDeleted(true) :
              setIsDeleted(false);
            }}
            {...data}
          />
        </div>
      ) : (
        <CircularLoading />
      )}
      {userMessage && userMessage !== "Network Error" && (
        <div className={classes.message}>
          <ThemeProvider theme={theme}>
            <Typography variant="h4">{userMessage}</Typography>
            <Typography variant="h5">Would you like to create one?</Typography>
          </ThemeProvider>
        </div>
      )}

      <DeleteSelected
        checkboxSelection={data}
        deleteSelected={deleteSelected}
        deleted={isDeleted}
      />
      <AddExpenseForm addExpense={create} message={msg} />
    </div>
  );
}
