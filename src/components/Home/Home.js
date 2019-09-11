import React, { Component } from 'react'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Question from '../Question/Question'
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    container: {
        // display: 'flex',
        alignItems: 'center',
        justifyContent: 'center' 

    }
});

class Home extends Component {
    render(){
        const { classes } = this.props;
        return (
            <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md" className={classes.container}>
                <Question/>
            </Container>
            </React.Fragment>
            
        )
    }
}

export default connect() (withStyles(useStyles)(Home));