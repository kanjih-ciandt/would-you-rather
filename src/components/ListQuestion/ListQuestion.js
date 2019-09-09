import React, { Component } from 'react'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Question from '../Question/Question'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { maxWidth } from '@material-ui/system';

const useStyles = theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 1200

    }
});

class ListQuestion extends Component {
    render(){
        const { classes } = this.props;
        return (
            <React.Fragment>
            <CssBaseline />
       
                <Grid container justify="center">
                    <Grid key='1' item direction="column" xs={9} container justify="center" >
                        <Container maxWidth="md" className={classes.container}>
                            <Question/>
                        </Container>
                        <Container maxWidth="md" className={classes.container}>
                            <Question/>
                        </Container>
                    </Grid>
                    <Grid key='2' item xs={3}>
                        <form className={classes.form}>
                            <Typography>
                                Status
                            </Typography>
                            <FormGroup
                                aria-label="question"
                                name="question">
                                <FormControlLabel
                                    control={<Checkbox value="answered" />}
                                    label="Answered"
                                /> 
                                <FormControlLabel
                                    control={<Checkbox value="notAnswered" />}
                                    label="Not Answered"
                                /> 
                            </FormGroup>
                        </form>
                    </Grid>
                 

            </Grid>
            
            </React.Fragment>
            
        )
    }
}

export default connect() (withStyles(useStyles)(ListQuestion));