// import { CallMissedSharp } from "@material-ui/icons";
import React from "react";
import { Line } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    doughnutMain:{
        width:"100%",
        height:"400px",
    }
  }));

const data = {
  labels: [
    "Mar 12",
    "Mar 13",
    "Mar 14",
    "Mar 15",
    "Mar 16",
    "Mar 17",
    "Mar 18"
  ],
  datasets: [
    {
      label: "First dataset",
      data: [4, 7, 1, 10, 2, 10, 5],
      fill: false,
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Second dataset",
      data: [5, 9, 10, 0],
      fill: false,
      borderColor: "#742774"
    },
    {
      label: "Third dataset",
      data: [15, 5, 1, 15, 3, 6, 8],
      fill: false,
      borderColor: "red"
    },
    {
      label: "Forth dataset",
      data: [0, 5, 10, 10, 3, 4, 7],
      fill: false,
      borderColor: "green"
    }
  ]
};

export default function Doughnut() {
    const classes = useStyles();
  return (
    <div  >
      <Line  data={data} />
    </div>
  );
}
