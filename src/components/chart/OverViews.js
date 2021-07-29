import React from "react";
import {
  Grid,
  makeStyles,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import { LineChart, Line, ResponsiveContainer, XAxis } from "recharts";
import { FiEye, FiArrowUp, FiArrowDown, FiAward } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
const useStyles = makeStyles({
  root: {
    overflow: "hidden",
  },
  cardItem1: {
    background: "#F5F2FA",
    padding: "16px",
    borderRadius: "4px",
  },
  cardItem2: {
    background: "#FAF4F2",
    padding: "16px",
    borderRadius: "4px",
    marginBottom: "16px",
    marginRight: "16px",
  },
  cardItem3: {
    background: "#F2F6FA",
    padding: "16px",
    borderRadius: "4px",
    marginBottom: "16px",
    marginRight: "16px",
  },

  cardItem4: {
    background: " #F2FAF5",
    padding: "16px",
    borderRadius: "4px",
    marginBottom: "16px",
    marginRight: "16px",
  },
  cardContent: {
    margin: "0",
    padding: "0",
  },
  cardSubcontent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "4px",
  },
  cardSubcontent1: {
    display: "flex",
  },
  typoNum: {
    fontSize: "25px",
    fontWeight: "600",
    color: "#1a1a1a",
    fontFamily: "Neutrif Studio",
    lineHeight: "120%",
  },
  icon1: {
    color: "#5817E5",
    background: "rgba(88, 23, 229, 0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    marginRight: "4px",
  },
  icon2: {
    color: "#01BE46",
  },
  icon3: {
    color: "#FF491E",
    background: "rgba(88, 23, 229, 0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    marginRight: "4px",
  },
  icon4: {
    color: "#FF491E",
    
  },
  icon5: {
    color: "#0A65DB",
    background: "rgba(10, 101, 219, 0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    marginRight: "4px",
  },
  icon6: {
    color: "#01BE46",
    background: "rgba(1, 190, 70, 0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    marginRight: "4px",
  },
  subtitle: {
    color: "#5817E5",
    fontFamily: "Nunito Sans",
  },
  subtitle2: {
    color: "#FF491E",
    fontFamily: "Nunito Sans",
  },
  subtitle3: {
    color: "#0A65DB",
    fontFamily: "Nunito Sans",
  },
  subtitle4: {
    color: "#01BE46",
    fontFamily: "Nunito Sans",
  },
});

const data = [
  {
    name: "Jan",
    pv: 2400,
    pw: 2400,
  },
  {
    name: "Feb",
    pv: 4098,
    pw: 4098,
  },
  {
    name: "March",

    pv: 1800,
    pw: 1800,
  },
  {
    name: "April",

    pv: 3908,
    pw: 3908,
  },
  {
    name: "May",

    pv: 1800,
    pw: 1800,
  },
  {
    name: "May",

    pv: 4800,
    pw: 4800,
  },
  {
    name: "June",

    pv: 3800,
    pw: 3800,
  },
  {
    name: "July",
    pv: 4300,
    pw: 4300,
  },
];

export default function OverViews() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid container item sm={6} >
          <Card
            className={classes.cardItem1}
            style={{ width: " 100%", height: 220 }}
            elevation={0}
          >
            <CardContent className={classes.cardContent}>
              <div className={classes.cardSubcontent}>
                <Typography className={classes.typoNum}>11,032</Typography>
                <div className={classes.icon2}>
                  <FiArrowUp /> 3.6%
                </div>
              </div>
              <div className={classes.cardSubcontent1}>
                <div className={classes.icon1}>
                  <FiEye />
                </div>
                <Typography className={classes.subtitle}>Requests</Typography>
              </div>
            </CardContent>
            <ResponsiveContainer>
              <LineChart width={230} height={40} data={data}>
                <XAxis dataKey="name" />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#0A65DB"
                  dot={{ r: 3, fill: "#0A65DB" }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid container item sm={6} >
          <Card
            className={classes.cardItem2}
            style={{ width: " 100%", height: 220 }}
            elevation={0}
          >
            <CardContent className={classes.cardContent}>
              <div className={classes.cardSubcontent}>
                <Typography className={classes.typoNum}>18,171</Typography>
                <div className={classes.icon4}>
                  <FiArrowDown /> 4.7%
                </div>
              </div>
              <div className={classes.cardSubcontent1}>
                <div className={classes.icon3}>
                  <FiEye />
                </div>
                <Typography className={classes.subtitle2}>
                  Inprogress
                </Typography>
              </div>
            </CardContent>
            <ResponsiveContainer>
              <LineChart width={230} height={40} data={data}>
                <XAxis dataKey="name" />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#0A65DB"
                  dot={{ r: 3, fill: "#0A65DB" }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid container item sm={6} >
          <Card
            className={classes.cardItem3}
            style={{ width: " 100%", height: 220 }}
            elevation={0}
          >
            <CardContent className={classes.cardContent}>
              <div className={classes.cardSubcontent}>
                <Typography className={classes.typoNum}>8,848</Typography>
                <div className={classes.icon2}>
                  <FiArrowUp /> 1.3%
                </div>
              </div>
              <div className={classes.cardSubcontent1}>
                <div className={classes.icon5}>
                  <IoIosAddCircleOutline />
                </div>
                <Typography className={classes.subtitle3}>
                  Completed
                </Typography>
              </div>
            </CardContent>
            <ResponsiveContainer>
              <LineChart width={230} height={40} data={data}>
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#0A65DB"
                  dot={{ r: 3, fill: "#0A65DB" }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid container item sm={6} >
          <Card
            className={classes.cardItem4}
            style={{ width: " 100%", height: 220 }}
            elevation={0}
          >
            <CardContent className={classes.cardContent}>
              <div className={classes.cardSubcontent}>
                <Typography className={classes.typoNum}>2,344</Typography>
                <div className={classes.icon4}>
                  <FiArrowDown /> 8.5%
                </div>
              </div>
              <div className={classes.cardSubcontent1}>
                <div className={classes.icon6}>
                  <FiAward />
                </div>
                <Typography className={classes.subtitle4}>
                  Credits
                </Typography>
              </div>
            </CardContent>
            <ResponsiveContainer>
              <LineChart width={230} height={40} data={data}>
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#0A65DB"
                  dot={{ r: 3, fill: "#0A65DB" }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
