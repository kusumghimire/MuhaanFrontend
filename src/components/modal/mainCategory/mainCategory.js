import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
  formHeader:{
      display:"flex",
      justifyContent:"space-between",
      paddingBottom:"0px",
  }
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
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
  },
}))(MuiDialogActions);

async function addModal(credentials) {
  const token= JSON.parse(localStorage.getItem('token'));
  console.log(token);
  return fetch('https://muhaan.enterprisesgravity.com/dashboard/category/create/', {
    method: 'POST',
    headers: {    
      "Authorization":`Token ${token}`,    
      "Content-Type": "application/json ",
      "Accept":'application/json',
      // "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json(

    ))
   
 }

export default function MainCategoryModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({});
  const [data, setData] = useState([]);
  const [title, setUsername] = useState(" ");
  // This is for creating api
  // alert(token);
 
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await addModal({
      title,
    });
  }

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
        <DialogTitle id="customized-dialog-title" onClose={handleClose} className={classes.formHeader}>
        <Typography variant="h4" >
          Main Category
        </Typography>
        </DialogTitle>

        <DialogContent>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label="Category Name"
              name="name"
              autoComplete="name"
              autoFocus
            onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="file"
              id="avatar"
              name="avatar"
            />

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-status-native-simple">
                Status
              </InputLabel>
              <Select
                // native
                value={state.status}
                onChange={handleChange}
                fullWidth
                label="Status"
                inputProps={{
                  name: "status",
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>Publish</option>
                <option value={20}>Unpublish</option>
              </Select>
            </FormControl>
            <Button fullWidth type="submit"  variant="contained" autoFocus onClick={handleClose} color="primary">
            Save
          </Button>
          </form>
        </DialogContent>
        {/* <DialogActions>
          <Button fullWidth  variant="contained" autoFocus onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
MainCategoryModal.propTypes = {
  setToken: PropTypes.func.isRequired
}
