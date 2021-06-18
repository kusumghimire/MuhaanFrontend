import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Restaurant } from "@material-ui/icons";

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
  paper: {
    marginTop: theme.spacing(8),
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
  },
}));

export default function Reset() {
  const classes = useStyles();
  const [username, setusername] = React.useState(" ");
  const [password, setpassword] = React.useState(" ");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("hello");
    const responseData = async () => {
      const response = await fetch(
        "https://muhaan.enterprisesgravity.com/dashboard/login/",
        {
          method: "POST",
          headers: {
            // " Authorization": "Token 7644fe2df45b1e279c396e77e2bc83534f87d79e",
            "content-type": "application/json ",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      ).then(response => console.log(response.json));
      // console.log(responseData);
    };
    // .then(resp =>console.log(resp))
    // console.log(username,password);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper} elevation={1}>
        <Avatar>M</Avatar>
        <Typography component="h1" variant="h5">
    Change Password
        </Typography>
        <form className={classes.form} onSubmit={handleLogin} noValidate>
  
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Current Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
    
    <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
    <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm New Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // action=
          >
           Update Password
          </Button>
        </form>
      </Paper>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
