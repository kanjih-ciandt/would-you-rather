import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
// import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  tabs: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
    position: 'center'
  },
  toolbarButtons: {
    marginLeft: 'auto',
    position: 'right'
  },
}));


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}


class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabPosition: 2,

    };
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event, newValue) {
    console.log(newValue);
    this.setState(() => ({
      tabPosition: newValue
    }));

  }

  render() {
    const { tabPosition } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>

        <AppBar position="static">
          <Toolbar>
            <Grid
              justify="space-between" // Add it here :)
              container
            >
              <Grid item>
                
              </Grid>

              <Grid item>
                <Typography className={classes.title} variant="h6" noWrap >
                  Would you Rather
                  </Typography>
              </Grid>

              <Grid item>
                <div>
                  <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                <AccountCircle />
              </IconButton>
                </div>
              </Grid>
            </Grid>

          </Toolbar>
          <Tabs value={tabPosition}
            className={classes.tabs}
            onChange={this.handleChange} aria-label="options table"
            centered={true}>
            <Tab label="Home" id="tab-0" />
            <Tab label="New Question" id="tab-1" />
            <Tab label="Leader Board" id="tab-2" />
          </Tabs>
        </AppBar>
        <TabPanel value={tabPosition} index={0}>
          Home
        </TabPanel>
        <TabPanel value={tabPosition} index={1}>
          New Question
        </TabPanel>
        <TabPanel value={tabPosition} index={2}>
          Leader Board
        </TabPanel>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, tweets}, { id }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps) (withStyles(useStyles)(Dashboard));