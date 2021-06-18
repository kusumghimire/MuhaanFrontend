import React from "react";

import { Grid, Typography, makeStyles,Button } from "@material-ui/core/";
import TimeSlotModal from '../../components/modal/timeSlot/timeSlot';
import TimeSlot from "../../components/tables/timeSlot/timeSlot";
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

export default function MainCategory() {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.contentHeader}>
        <Grid item >
        <Typography variant="h4" gutterBottom style={{marginRight:"1rem"}}>
         Time Slot & Date
        </Typography>
        </Grid>
        <Grid item>
      <TimeSlotModal />    
        </Grid>
      </Grid>
      <Grid container style={{ width: " 100%" }}>
        <Grid item xs={12} md={10}>
          <TimeSlot />
        </Grid>
      </Grid>
    </>
  );
}
