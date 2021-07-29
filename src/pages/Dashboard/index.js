import React from "react";
import { Typography,makeStyles } from "@material-ui/core";
import OverViews from "../../components/chart/OverViews";
import Analytics from "../../components/chart/Analytics";

const useStyles = makeStyles({
  root: {
    width: "99%",
  },
  contentHeader: {
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
          <Typography
          variant="h4"
          gutterBottom
          style={{ marginTop: "1rem", marginBottom: "2rem" }}
        >
          Overview
        </Typography>
        <OverViews />

        <Typography
          variant="h4"
          gutterBottom
          style={{ marginTop: "2rem" }}
        >
          Analytics
        </Typography>

        <Analytics />
    </div>
  );
}
