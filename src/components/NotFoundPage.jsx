import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import notFound from "../images/404_Error.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: theme.spacing(6)
  },
  navLink: {
    textDecoration: "none",
    color: "inherit",
    fontSize: 'large'
  },
}));

const NotFoundPage = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <img src={notFound} alt="page not found" />
      <Link className={styles.navLink} to="/">Go home</Link>
    </div>
  );
};
export default NotFoundPage;
