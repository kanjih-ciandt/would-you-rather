import React, { Component } from 'react'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import LeaderBoardCard from '../LeaderBoadCard/LeaderBoardCard'
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center' 

    }
});

class LeaderBoard extends Component {
    render(){
        const { classes } = this.props;
        return (
            <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md" className={classes.container}>
                <LeaderBoardCard/>
            </Container>
            </React.Fragment>
            
        )
    }
}

export default connect() (withStyles(useStyles)(LeaderBoard));