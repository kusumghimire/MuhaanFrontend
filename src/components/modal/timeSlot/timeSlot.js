import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

import TimeCheckbox from "./timeCheckbox";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
  formHeader: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "0px",
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const classes = useStyles();
  const { children, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(0),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(4),
    paddingTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}))(MuiDialogActions);

export default function TimeSlotModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create New
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          className={classes.formHeader}
        >
          <Typography variant="h4" >
          Add Date & Time Slot
          </Typography>
        </DialogTitle>

        <DialogContent>
          <form className={classes.form} noValidate>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-category-native-simple">
                Sub Category
              </InputLabel>
              <Select
                // native
                value={state.category}
                onChange={handleChange}
                fullWidth
                label="Sub Category"
                inputProps={{
                  name: "category",
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>Sub Category 1</option>
                <option value={20}>Sub Category 2</option>
                <option value={30}>Sub Category 3</option>
                <option value={40}>Sub Category 4</option>
              </Select>
            </FormControl>
            {/* <TextField
        id="date"
        label="Birthday"
        type="date"

        defaultValue="2017-05-24"
        InputLabelProps={{
          shrink: true,
        }}
      /> */}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="date"
              label="Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              label="Days Added on "
              fullWidth
              type="number"
              id="quantity"
            />
            <TimeCheckbox />
          </form>
        </DialogContent>

        <DialogActions>
          <Button
            fullWidth
            variant="contained"
            autoFocus
            onClick={handleClose}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
