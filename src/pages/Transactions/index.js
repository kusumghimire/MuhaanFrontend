import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, makeStyles, Button } from "@material-ui/core/";
import MainCategoryTable from "../../components/tables/mainCategory/mainCategory";
import MainCategoryModal from "../../components/modal/mainCategory/mainCategory";
import TransactionList from "../../components/TransactionList";
const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
  },
  contentHeader: {
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
  },
});

export default function Transactions() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid container className={classes.contentHeader}>
        <Grid item>
          <Typography variant="h4" gutterBottom style={{ marginRight: "1rem" }}>
        Transactions
          </Typography>
        </Grid>
        <Grid item>

        </Grid>
      </Grid>
      <Grid container style={{ width: " 100%" }}>
        <Grid item xs={12} md={10}>
          <TransactionList />
        </Grid>
      </Grid>
    </>
  );
}
