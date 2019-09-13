import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { connect } from 'react-redux';
import { login } from '../../actions/authedUser';
import { apiService } from '../../services/api.service';

const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
          username: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }

    handleChange(event, newValue) {
        const { users } = this.state;
        const user = users.find(user => user.id === newValue.key)
        this.setState(() => ({
            username: newValue.key,
            user: user
          }));
    }

    handleSubmit(e) {
        this.setState({ submitted: true });
        const { username, users } = this.state;
        if (username) {

          this.props.dispatch(login(users.find(user => user.id === username)))
            
        }
    }

    componentDidMount(){
      apiService.getUsers()
      .then(({ users}) => {
        this.setState(() => ({
          users: Object.values(users),
        }));
        
      })
    }
  
    render (){
        const { username, users, user } = this.state;
        const { classes } = this.props;
        const avatar = user ? <Avatar alt="{user.avatarURL}" src={user.avatarURL} className={classes.bigAvatar} /> : <Avatar className={classes.bigAvatar}><LockOutlinedIcon /></Avatar>
        return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                {avatar}
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} onSubmit={this.handleSubmit}>
                  <TextField
                    id="user"
                    value={username}
                    select
                    label="User Name"
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    onChange={this.handleChange}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}>
                    
                    {users && users.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                    ))}
                    </TextField>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                </form>
              </div>
            </Container>
          );
    }
}



export default connect() (withStyles(useStyles)(Login));