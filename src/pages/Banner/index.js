import React from "react";

import { Grid, Typography, makeStyles,Button } from "@material-ui/core/";
import BannerTable from "../../components/tables/banner/banner";
import BannerModal from "../../components/modal/banner/banner";

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

export default function Banner() {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.contentHeader}>
        <Grid item >
        <Typography variant="h4" gutterBottom style={{marginRight:"1rem"}}>
         Banner
        </Typography>
        </Grid>
        <Grid item>
      <BannerModal />
        </Grid>
      </Grid>
      <Grid container style={{ width: " 100%" }}>
        <Grid item xs={12} md={10}>
          <BannerTable />
        </Grid>
      </Grid>
    </>
  );
}
