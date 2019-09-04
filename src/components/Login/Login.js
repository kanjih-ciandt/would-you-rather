import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {login} from '../../actions/authedUser'


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
        this.setState(() => ({
            username: newValue.key
          }));
    }

    handleSubmit(e) {
        this.setState({ submitted: true });
        const { username} = this.state;
        if (username) {
          this.props.dispatch(login(username))
            
        }
    }
  
    render (){
        const { username } = this.state;
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
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
                    
                    {this.props.usersIds.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
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

function mapStateToProps ({ users }) {
  return {
    usersIds: Object.values(users)
  }
}


export default connect(mapStateToProps) (withStyles(useStyles)(Login));