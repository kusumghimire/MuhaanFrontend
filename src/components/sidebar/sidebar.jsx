import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import AssignmentIcon from "@material-ui/icons/Assignment";
import HomeIcon from "@material-ui/icons/Home";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import PanoramaIcon from "@material-ui/icons/Panorama";
import GroupIcon from "@material-ui/icons/Group";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import SimpleCard from "../cards/card";
import Grid from "@material-ui/core/Grid";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
     <div className={classes.toolbar} />



      <Divider />
      <List>
        {/* {['Dashboard', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 6 === 0 ? : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
 
          <ListItem button>
            <ListItemIcon>
              {" "}
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItem>
        <ListItem button>
          <ListItemIcon>
            {" "}
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText>Main Category</ListItemText>
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            {" "}
            <CalendarViewDayIcon />
          </ListItemIcon>
          <ListItemText>Sub Category</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            {" "}
            <TimelapseIcon />
          </ListItemIcon>
          <ListItemText>Time and Date Slot</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            {" "}
            <PanoramaIcon />
          </ListItemIcon>
          <ListItemText>Banner</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            {" "}
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText>Service Provider</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            {" "}
            <GroupIcon />
          </ListItemIcon>
          <ListItemText>Customers</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            {" "}
            <AcUnitIcon />
          </ListItemIcon>
          <ListItemText>Orders</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            {" "}
            <StarBorderIcon />
          </ListItemIcon>
          <ListItemText>Review & Rating</ListItemText>
        </ListItem>
      </List>

    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={3}>
          <Grid item md={4}>
            <SimpleCard />
          </Grid>
          <Grid item md={4}>
            <SimpleCard />
          </Grid>
          <Grid item md={4}>
            <SimpleCard />
          </Grid>
          <Grid item md={4}>
            <SimpleCard />
          </Grid>
          <Grid item md={4}>
            <SimpleCard />
          </Grid>
          <Grid item md={4}>
            <SimpleCard />
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
