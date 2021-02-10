import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../store/actions";

import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";

import DeleteSelected from "./DeleteSelected";
import CircularLoading from "../utils/Loading";

import AddExpenseForm from "./AddExpenseForm";
import { Button } from "@material-ui/core";

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
  // { field: 'id', headerName: 'ID', width: 70 },
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

  // {
  //   field: 'tagss',
  //   headerName: 'Tags',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.getValue('tags') || ''} ${params.getValue('amount') || ''}`,
  // },
];

export default function UserHome(props) {
  console.log("PROPS from addExpense: ", props);

  const dataFromStore = useSelector((state) => state.data);

  const refIs = useRef(dataFromStore);
  console.log('This is refIs ', refIs);



  const isFetching = useSelector((state) => state.isFetching);
  const dispatch = useDispatch();
  const [data, setData] = useState([]); // for checkbox selection

  const [rows, setRows] = useState(dataFromStore);
  //  const [deletedRows, setDeletedRows] = useState([]);

  const classes = useStyles();
  // const dataRef = useRef(data);
  // dataRef.current = data;
  const {
    formState: { isSubmitSuccessful },
  } = useForm();
  // console.log('DATA from store: ', dataFromStore)
  useEffect(() => dispatch(fetchData()), [isSubmitSuccessful]);

  // const handleRowSelection = (e) => {
  //   setDeletedRows([...deletedRows, ...rows.filter((r) => r.id === e.data.id)]);
  //   console.log('ROWS', dataFromStore)
  // };
  const handlePurge = () => {
    setRows(
      rows.filter((r) => data.filter((sr) => Number(sr) === r.id).length < 1)
    );
  };

  return (
    <div className={classes.root}>
      {isFetching && <CircularLoading />}
      {!isFetching && (
        <div style={{ flexGrow: 1, width: 1000, height: 400 }}>
          <DataGrid
            autoHeight
            rows={dataFromStore}
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
      <DeleteSelected checkboxSelection={data} />
      {/* <Button
onClick={handlePurge}
>delete shit</Button> */}

      <AddExpenseForm addData={dataFromStore} fetchingState={isFetching} />
    </div>
  );
}

// const [selection, setSelection] = React.useState([]);
// const [expense, setExpense] = React.useState({});
// const [data, setData] = React.useState({});
// const {
//   control,
//   register,
//   errors,
//   handleSubmit,
//   reset,
//   formState: { isSubmitSuccessful },
// } = useForm({ defaultValues: { title: "", amount: "" } });

// get logged in user expenses
// React.useEffect(() => {
//   // let isMounted = true;

//   axiosWithAuth()
//     .get("/")
//     .then((res) => {
//       // console.log('this is what I get ', res.data);
//       // if (isMounted) {
//       setExpense(res.data);
//       // }
//       // return () => { isMounted = false };
//     })
//     .catch((err) => console.log("Something went wrong"));
// }, [isSubmitSuccessful, data, reset]);

{
  /* <div style={{ flexGrow: 1, width: 1000, height: 400 }}>
        {expense.length ? (
          <DataGrid
            autoHeight
            rows={expense}
            columns={columns}
            pageSize={5}
            checkboxSelection
            {...data}
            onSelectionChange={(newSelection) => {
              setSelection(newSelection.rowIds);
            }}
          />
        ) : (
          <CircularLoading />
        )}
      </div>

      <DeleteSelected
        name="delete"
        selection={selection}
        onClick={() => setExpense(expense)}
      />

      <AddExpenseForm 
        
      /> */
}
