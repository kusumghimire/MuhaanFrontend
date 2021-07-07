import React,{useState} from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles, useTheme, Hidden } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import PanoramaIcon from "@material-ui/icons/Panorama";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import GroupIcon from "@material-ui/icons/Group";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ControlPointDuplicateIcon from "@material-ui/icons/ControlPointDuplicate";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import NavLink from "./NavLink";
 import useToken  from "../../useToken";
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

function MainLayout(props) {
  const { children } = props;
  const { window } = props;
  const {setToken} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const history = useHistory();

  // function logOut() {
  //   localStorage.clear();
  //   // window.localStorage.removeItem('token')
  //   history.push("/login");
  // }

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
};

  const drawer = (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <NavLink activeOnlyWhenExact to="/" icon={HomeIcon}>
          Home
        </NavLink>
        <NavLink to="/main-category" icon={AssignmentIcon}>
          Main Category
        </NavLink>
        {/* <NavLink to="/sub-category" icon={CalendarViewDayIcon}>
          Sub Category
        </NavLink> */}
        <NavLink to="/services" icon={CalendarViewDayIcon}>
         Services
        </NavLink>
        <NavLink to="/add-on" icon={CalendarViewDayIcon}>
         Add On 
        </NavLink>
        <NavLink to="/zone" icon={CalendarViewDayIcon}>
         Zone
        </NavLink>
        <NavLink to="/service-provider" icon={GroupAddIcon}>
          Service Provider
        </NavLink>
        <NavLink to="/payment" icon={GroupAddIcon}>
        Payment
        </NavLink>
        <NavLink to="/orders" icon={AddCircleOutlineIcon}>
          Pending Services
        </NavLink>
        <NavLink to="/processing-orders" icon={ControlPointDuplicateIcon}>
          Processing Services
        </NavLink>
        <NavLink to="/completed-orders" icon={ControlPointDuplicateIcon}>
          Completed Services
        </NavLink>
        <NavLink to="/cancelled-orders" icon={ControlPointDuplicateIcon}>
          Cancelled Services
        </NavLink>
        <NavLink to="/customers" icon={GroupIcon}>
          Customers
        </NavLink>
      </List>
    </Drawer>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
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
          <Typography variant="h6"  style={{flexGrow:" 1"}}>
            Muhaan
          </Typography>
          <Button
            variant="outlined"
            onClick={logOut}
          >
            Logout
          </Button>
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
        {children}
      </main>
    </div>
  );
}
// }
MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default MainLayout;
