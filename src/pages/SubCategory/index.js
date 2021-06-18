import React from "react";
import { Grid, Typography, makeStyles, Button } from "@material-ui/core/";
import SubCategoryTable from "../../components/tables/subCategory/subCategory";
import SubCategoryModal from "../../components/modal/subCategory/subCategory";

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

export default function SubCategory() {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.contentHeader}>
        <Grid item>
          <Typography variant="h4" gutterBottom style={{ marginRight: "1rem" }}>
            Sub Category
          </Typography>
        </Grid>
        <Grid item>
          {/* <SubCategoryModal /> */}
        </Grid>
      </Grid>
      <Grid container style={{ width: " 100%" }}>
        <Grid item xs={12} md={10}>
          {/* <SubCategoryTable /> */}
        </Grid>
      </Grid>
    </>
  );
}
