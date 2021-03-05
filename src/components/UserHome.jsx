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

import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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
    marginBottom: "4rem"
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
  // const [userData, setUserData] = useState(true);
  const [successful, setSuccessful] = useState(false);

  const [data, setData] = useState([]); // for checkbox selection
  const { user: currentUser } = useSelector((state) => state.auth);
  const classes = useStyles();
  const dispatch = useDispatch();

  let isRendered = useRef(null);

  useEffect(() => {
    isRendered.current = true;
    if (!currentUser) {
      props.history.push("/login");
      window.location.reload();
    }
    setSuccessful(false);

    if (isRendered.current) {
      dispatch(getUserExpenses())
    }


    UserService.getUserExpense()
      .then((response) => {
        console.log('response data', response.data);
        if (response.status === 202) {
          console.log('response is 202');
          // setExpenses([])
          setSuccessful(true)
        }
        if (!response.data.message && isRendered.current) {
          setExpenses(response.data);
          setSuccessful(true);
        } 
        // return setSuccessful(false)
        
      })
      .catch((err) => {
        console.log('Some data error', err)
        setSuccessful(false);
      });

      return () => isRendered.current = false;
  }, []);
  console.log(successful);
  let msg;
  const create = (newExpense, tags) => {
    axiosWithAuth()
      .post("/expense", { ...newExpense, tags: tags })
      .then((res) => {
        setExpenses([...expenses, res.data.expense[0]]);
      })
      .catch((err) => {
        // set error message for amount
        msg = err.response.data.errors[0].msg;
        console.log(msg);
      });
  };

  const deleteSelected = () => {
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
        })
        .catch((err) => err.response);
    });
  };

// "^4.0.0-alpha.13"
// @material-ui/lab": "^4.0.0-alpha.57",
  return (
    <div className={classes.root}>
    {message && message !== 'Network Error' && (
        <div className={classes.message}>
          <ThemeProvider theme={theme}>
              <Typography variant="h4">{message}</Typography>
              <Typography variant="h5">Would you like to create one?</Typography>
          </ThemeProvider>
        </div>
    )}


      {successful ? (
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
                console.log(data)
              }}
              {...data}
            />
          </div>
        
      ) 
      : (
        <CircularLoading />
        )}

     
      <DeleteSelected
        checkboxSelection={data}
        deleteSelected={deleteSelected}
      />
      <AddExpenseForm addExpense={create} message={msg} />
    </div>
  );
}
