import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import CircularLoading from "../utils/Loading";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import AddExpenseForm from './AddExpenseForm';

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
  const classes = useStyles();
 
  useEffect(() => {
    return axiosWithAuth()
      .get("/")
      .then((res) => {
        console.log(res.data);
        setExpenses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const create = (newExpense, tags) => {
    axiosWithAuth()
      .post("/expense", { ...newExpense, tags: tags })
      .then((res) => {
        setExpenses([...expenses, res.data.expense[0]]);
      })
      .catch((err) => console.log(err.response));
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

      <AddExpenseForm 
        addExpense={create}
      />
      
    </div>
  );
}

