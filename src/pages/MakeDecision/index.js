import React from "react";

import { Grid, Typography, makeStyles,Button } from "@material-ui/core/";
import OrderTable from "../../components/tables/orders/order";
import MakeDecisionTable from "../../components/tables/makeDecision/makeDecision";
import { Height } from "@material-ui/icons";
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

export default function MakeDecision() {
  const classes = useStyles();
  return (
    <>
    <div>
      <Grid container className={classes.contentHeader}>
        <Grid item >
        <Typography variant="h4" gutterBottom style={{marginRight:"1rem"}}>
         Make A Decision
        </Typography>
        </Grid>
        <Grid item>
        {/* <Button variant="contained" color="primary" >
      Create New
      </Button>       */}
        </Grid>
      </Grid>
      <Grid container style={{ width: " 100%",  }}>
        <Grid item xs={12} md={12}>
          <MakeDecisionTable />
        </Grid>
      </Grid>

    </div>


      {/* <Grid container className={classes.contentHeader}>
        <Grid item >
        <Typography variant="h4" gutterBottom style={{marginRight:"1rem"}}>
        Available Service Provider
        </Typography>
        </Grid>
        <Grid item>
  
        </Grid>
      </Grid>
      <Grid container style={{ width: " 100%", height:"150px" }}>
        <Grid item xs={12} md={12}>
          <MakeDecisionTable />
        </Grid>
      </Grid> */}
    </>
  );
}
