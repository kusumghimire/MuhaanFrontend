import React from "react";
import SimpleCard from "../../components/cards/card";
import { Grid } from "@material-ui/core";
export default function Home() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={4}>
          <SimpleCard />
        </Grid>
        <Grid item md={4}>
          <SimpleCard />
        </Grid>
        <Grid item md={4}>
          <SimpleCard />
        </Grid>
        <Grid item md={4}>
          <SimpleCard />
        </Grid>
        <Grid item md={4}>
          <SimpleCard />
        </Grid>
        <Grid item md={4}>
          <SimpleCard />
        </Grid>
      </Grid>
    </>
  );
}
