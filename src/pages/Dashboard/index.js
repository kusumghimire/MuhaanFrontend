import React from "react";
import { Typography } from "@material-ui/core";
import OverViews from "../../components/chart/OverViews";
import Analytics from "../../components/chart/Analytics";



export default function Home() {
  return (
    <div>
          <Typography
          variant="h4"
          gutterBottom
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
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
