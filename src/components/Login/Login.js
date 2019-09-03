import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];


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
            currency: 'EUR',

        };
        this.handleChange = this.handleChange.bind(this);
    
    }



    handleChange(event, newValue) {
        console.log(newValue);
        this.setState(() => ({
            currency: newValue.key
          }));
        
    
      }
  
    render (){
        const { currency } = this.state;
        const { classes, value } = this.props;
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
                <form className={classes.form} noValidate>
                  <TextField
                    
                    id="user"
                    value={currency}
                    select
                    label="User Name"
                    name="email"
                    autoComplete="email"
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
                    
                    {currencies.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
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

export default withStyles(useStyles)(Login);