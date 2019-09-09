import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
// import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import {logout} from '../../actions/authedUser'
import { connect } from 'react-redux'
import Home from '../Home/Home';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import ListQuestion from '../ListQuestion/ListQuestion'
import NewQuestion from '../NewQuestion/NewQuestion'


const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  tabs: {
    width: '100%',
    position: 'center'
  },
  toolbarButtons: {
    marginLeft: 'auto',
    position: 'right'
  },
  
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    position: 'center'
  },
});


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
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event, newValue) {
    console.log(newValue);
    this.setState(() => ({
      tabPosition: newValue
    }));
  }

  handleSubmit(e) {
    this.props.dispatch(logout(this.props.authedUser))
    
}

  render() {
    const { tabPosition } = this.state;
    const { classes } = this.props;
    const user = this.props.authedUser ? this.props.authedUser.name : ''
    const avatar = this.props.authedUser ? <Avatar alt="{user.avatarURL}" src={this.props.authedUser.avatarURL} className={classes.avatar} /> : <Avatar className={classes.avatar}><AccountCircle /></Avatar>

    return (
      <div className={classes.root}>

        <AppBar position="static">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={9}>
                <Tabs value={tabPosition}
                  className={classes.tabs}
                  onChange={this.handleChange} aria-label="options table"
                  centered={true}>
                  <Tab label="Home" id="tab-0" />
                  <Tab label="List Question" id="tab-1" />
                  <Tab label="New Question" id="tab-2" />
                  <Tab label="Leader Board" id="tab-3" />
                </Tabs>
              </Grid>
              <Grid item xs={3}>
                  <Grid
                    justify="center"
                    alignItems="center"
                    container
                  >
                    <Grid item>Hello {user}</Grid>
                    <Grid item>{avatar}</Grid>
                    <Grid item><Link
                      component="button"
                      color="inherit"
                      onClick={this.handleSubmit}>
                      Logout
                    </Link>
                    </Grid>
                  </Grid>
              </Grid>
            </Grid>
        </AppBar>
        <TabPanel value={tabPosition} index={0}>
          <Home/>
        </TabPanel>
        <TabPanel value={tabPosition} index={1}>
          <ListQuestion/>
        </TabPanel>
        <TabPanel value={tabPosition} index={2}>
          <NewQuestion/>
        </TabPanel>
        <TabPanel value={tabPosition} index={3}>
          <LeaderBoard/>
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