import React, {useEffect,useState} from "react";
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import validation from "../../validation/validation";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://enterprisesgravity.com/">
        Gravity Enterprises
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root:{
    background:` linear-gradient(135deg,#3c3d70, #509977)`,
    width:"100%",
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  },
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 30,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background:"#1e5297",
    color:"#ffffff",
    textTransform:"capitalize",
   " &:hover":{
     color:"#000",
   }
  },
}));

async function loginUser(credentials) {
  return fetch('https://muhaan.enterprisesgravity.com/dashboard/login/', {
    method: 'POST',
    headers: {      
      "Content-Type": "application/json ",
      "Accept":'application/json',
      // "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Headers" : "Content-Type",
// "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }
 

export default function Login({ setToken }) {
  const classes = useStyles();
  const [username, setUsername] = useState(" ");
  const [password, setPassword] = useState(" ");

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
   await setToken(token.token);
  //  setErrors(validation(tutorial));
  }
 

  return (
    <div className={classes.root}> 
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <Paper className={classes.paper} elevation={0}>
        <Avatar>M</Avatar>
        <Typography component="h1" variant="h5">
         Muhaan
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="email"
            autoComplete="email"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField         
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign In
          </Button>

        </form>
      </Paper>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>        
    </div>
  );
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}


