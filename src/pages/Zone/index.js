import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, makeStyles, Button } from "@material-ui/core/";
import ZoneList from "../../components/ZoneList";
const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
  },
  contentHeader: {
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
  },
});

export default function Zone() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid container className={classes.contentHeader}>
        <Grid item>
          <Typography variant="h4" gutterBottom style={{ marginRight: "1rem" }}>
        Zone
          </Typography>
        </Grid>
        <Grid item>
          {/* <MainCategoryModal /> */}
          <Link to={"/zone/add"}>
            <Button variant="contained" color="primary">
              Create New
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid container style={{ width: " 100%" }}>
        <Grid item xs={12} md={10}>
          <ZoneList />
        </Grid>
      </Grid>
    </>
  );
}
