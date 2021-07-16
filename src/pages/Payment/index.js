import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, makeStyles,Button } from "@material-ui/core/";
import PaymentList from "../../components/PaymentList";
const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
  },
  contentHeader:{
    marginTop:"1.5rem",
    marginBottom:"1.5rem",
  }
});

export default function Payment() {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.contentHeader}>
        <Grid item >
        <Typography variant="h4" gutterBottom style={{marginRight:"1rem"}}>
        Payment
        </Typography>
        </Grid>
        <Grid item>
        <Link to={"/payment-gateway/add"}>
            <Button variant="contained" color="primary">
              Create New
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid container style={{ width: " 100%" }}>
        <Grid item xs={12} md={12}>
        <PaymentList />
        </Grid>
      </Grid>
    </>
  );
}
