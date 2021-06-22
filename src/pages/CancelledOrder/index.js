import React from "react";

import { Grid, Typography, makeStyles,Button } from "@material-ui/core/";
import CancelledServiceList from "../../components/CancelledServiceList";
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

export default function CancelledService() {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.contentHeader}>
        <Grid item >
        <Typography variant="h4" gutterBottom style={{marginRight:"1rem"}}>
             Cancelled Services
        </Typography>
        </Grid>
        <Grid item>
        {/* <Button variant="contained" color="primary" >
      Create New
      </Button>       */}
        </Grid>
      </Grid>
      <Grid container style={{ width: " 100%" }}>
        <Grid item xs={12} md={12}>
          <CancelledServiceList />
        </Grid>
      </Grid>
    </>
  );
}
