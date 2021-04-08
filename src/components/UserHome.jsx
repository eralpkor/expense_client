import React, { useEffect, useState, useRef } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import CircularLoading from "../utils/Loading";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import AddExpenseForm from "./AddExpenseForm";
import DeleteSelected from "./DeleteSelected";

import Container from './Mcontainer';


import UserService from "../services/user.service";
import { useDispatch, useSelector } from "react-redux";
// import { getUserExpenses } from "../store/actions/auth";
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
    margin: "auto",
    marginTop: theme.spacing(5),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  CircleLoading: {
    marginTop: theme.spacing(25),
  },
  divider: {
    margin: "auto",
  },
  message: {
    textAlign: "center",
    padding: "0.1rem"
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
  const triggerText = 'Open form';


  const [expenses, setExpenses] = useState({
    loading: true,
    data: [],
  });

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
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
    console.log('User logged isloggedin: ', isLoggedIn);

    // if (isRendered.current) {
    //   dispatch(getUserExpenses());
    // }
console.log('what is isRendered.current ', isRendered.current);
    if (isRendered.current) {
      UserService.getUserExpense()
        .then((response) => {
          if (response.status === 202) {
            setExpenses({
              loading: false,
              data: []
            });
            setUserMessage(response.data.message);
            setIsDeleted(true);
          }
        if (!response.data.message && isRendered.current) {
          setExpenses({
            loading: false,
            data: response.data
          });
        }
      })
      .catch((err) => {
        console.log("Some data error", err);
        setIsDeleted(true);
      });
    }
    return () => (isRendered.current = false);
  }, [isExpired]);

  let msg;
  const create = (newExpense, tags) => {
    setIsDeleted(true);
    console.log("isLoggedIn true/false ", isLoggedIn);

    if (!currentUser || isExpired || !isLoggedIn) {
      console.log("who is current user ", currentUser);
      props.history.push("/login");
      window.location.reload();
    }
    console.log("what is message token ", message);
    axiosWithAuth()
      .post("/expense", { ...newExpense, tags: tags })
      .then((res) => {
        setExpenses({
          loading: false,
          data: [...expenses.data, res.data.expense[0]],
        });
        setUserMessage('');
      })
      .catch((err) => {
        // set error message for amount
        if (err.response.data.statusText === 'Unauthorized') {
          console.log('WHAT IS THE ERR ', err.response);
          props.history.push("/login");
        }
        console.log('WHAT IS THE ERR ', err.response.data.errors);
        if (err.response.data.errors.includes('Invalid token')) {
          props.history.push("/login");
          window.location.reload();
        }
        msg = err.response.data.errors[0].msg;
        console.log(msg);
      });
  };

  const deleteSelected = () => {
    setIsDeleted(false);
    // filter out selected expenses for deleting
    var filteredExpenses = expenses.data.filter(
      (val) => !data.includes(val.id.toString())
    );

    data.map((val) => {
      return axiosWithAuth()
        .delete(`/expense/${val}`)
        .then((res) => {
          // update the UI after removing selected expenses
          setExpenses({
            loading: false,
            data:filteredExpenses
          });
          setIsDeleted(true);
          if (expenses.data.length === 0) {
            setUserMessage(message);
          }
          console.log(message);
        })
        .catch((err) => {
          console.log(err.response.data.errors);
          setUserMessage(err.response.data.errors);
          setIsDeleted(false);
        });
    });
  };

  // "^4.0.0-alpha.13"
  // @material-ui/lab": "^4.0.0-alpha.57",
console.log('what is user message ', userMessage);

  return (
    <div className={classes.root}>
      {!expenses.loading ? (
        <div style={{ flexGrow: 1, width: 1000, height: 400 }}>
          <DataGrid
            autoHeight
            rows={expenses.data}
            columns={columns}
            pageSize={5}
            checkboxSelection
            // set checkbox selection for deleting
            onSelectionChange={(newSelection) => {
              setData(newSelection.rowIds);
              !newSelection.rowIds.length ? setIsDeleted(true) :
              setIsDeleted(false);
            }}
            {...data}
          />

          {/* <Container triggerText={triggerText} addExpense={create} /> */}
        </div>
      ) : (
        <CircularLoading />
      )}
      {userMessage && userMessage !== "Network Error" && (
        <div className={classes.message}>
          <ThemeProvider theme={theme}>
            <Typography variant="h6">{userMessage}</Typography>
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
