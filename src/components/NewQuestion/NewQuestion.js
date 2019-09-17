import React, { Component } from 'react'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { handleAddQuestion } from '../../actions/questions';

import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 1200,
        padding: '10px'

    },
    card: {
        maxWidth: 600,
    },
    cardHeader: {
        backgroundColor: theme.palette.primary.main,
        color: grey[300],
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
        
    },
    
    details: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px'
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        margin: '10px'
    },
    submit: {
        marginTop: '10px'
    }
    
});

class NewQuestion extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            optionOne: '', 
            optionTwo: '', 
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeOptionOne = this.handleChangeOptionOne.bind(this);
        this.handleChangeOptionTwo = this.handleChangeOptionTwo.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        // { optionOneText, optionTwoText, author }
        this.props.dispatch(handleAddQuestion({
            optionOneText:this.state.optionOne,
            optionTwoText:this.state.optionTwo,
            author: this.props.authedUser.id

        }));
    }

    handleChangeOptionOne(event) {
        this.setState({optionOne: event.target.value});
      }
    handleChangeOptionTwo(event) {
        this.setState({optionTwo: event.target.value});
      }


    render(){
        const { classes } = this.props;

       
        return (
            <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md" className={classes.container}>
                <Card className={classes.card}>
                    <CardHeader className={classes.cardHeader}
                        title="New Question" 
                    />
                    <div >
                        <Typography align='center' className={classes.details}>
                            Complete the question.  Would you rather ...
                        </Typography>
                     
                        
                        <form  className={classes.form} onSubmit={this.handleSubmit}>
                            <TextField
                                id="optionOne"
                                label="First Option"
                                placeholder="Enter Option One Text Here"
                                fullWidth
                                margin="normal"
                                variant="filled"
                                value={this.state.optionOne}
                                onChange={this.handleChangeOptionOne}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            <Typography align='center'>
                                OR
                            </Typography>
                            
                            <TextField
                                id="optionTwo"
                                label="Second Option"
                                placeholder="Enter Option Two Text Here"
                                
                                fullWidth
                                margin="normal"
                                variant="filled"
                                value={this.state.optionTwo}
                                onChange={this.handleChangeOptionTwo}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={!this.state.optionTwo  || !this.state.optionOne}
                            
                            className={classes.submit}
                        >
                            SUBMIT
                        </Button>
                    </form>
                        
                    </div>
                </Card>
            </Container>
            </React.Fragment>
            
        )
    }
}

function mapStateToProps ({authedUser}) {
    return {
      authedUser
    }
}

export default connect(mapStateToProps) (withStyles(useStyles)(NewQuestion));