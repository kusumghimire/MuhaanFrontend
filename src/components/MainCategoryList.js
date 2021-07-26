import React, { useState, useEffect, useMemo, useRef } from "react";
// import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TutorialDataService from "../services/TutorialService";

const useStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

// row component
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell align="left">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {row.cat ? row.cat : row.title}
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          <div>
            <span
              style={{ marginRight: "1.5rem" }}
              // onClick={() => openTutorial(rowIdx)}
            >
              <i className="far fa-edit action mr-2"></i>
            </span>

            <span
            // onClick={() => deleteTutorial(rowIdx)}
            >
              <i className="fas fa-trash action"></i>
            </span>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
          align="left"
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="p" gutterBottom component="div">
                SubCategory
              </Typography>
              <p>{row.cat ? row.title : "--"}</p>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

//

const MainCategoryList = () => {
  const [mainCat, setMainCategory] = useState([]);
  const [open, setOpen] = React.useState(false);
  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then((response) => {
        let data = response.data.reduce(function (o, cur) {
          // Get the index of the key-value pair.
          var occurs = o.reduce(function (n, item, i) {
            if (cur.cat !== null) {
              return item.cat === cur.cat ? i : n;
            }
           
          }, -1);

          // If the name is found,
          

          if (occurs >= 0) {
            // append the current value to its list of values.
            // o[occurs].cat = o[occurs].cat.concat(cur.cat);

            o[occurs].title = o[occurs].title.concat(cur.title);

            // Otherwise,
          } 
          
          
          else {
            // add the current item to o (but make sure the value is an array).
            var obj = {
              id: cur.id,
              created_by: 1,
              title: cur.title,
              cat: cur.cat,
            };
            o = o.concat([obj]);
     
          }

          return o;
        }, []);

        setMainCategory(data.reduce((acc, current) => {
          const x = acc.find(item => item.cat === current.title);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []));
        
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    retrieveTutorials();
  }, []);
  console.log(mainCat);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Main Category</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mainCat.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MainCategoryList;
