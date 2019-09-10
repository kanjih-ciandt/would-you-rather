import React, { Component } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import Question from '../Question/Question';
import { apiService } from '../../services/api.service';


const useStyles = theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 1200

    }
});

class ListQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionsUser: null
        };
    }

    mergeUserDataInQuestion(listQuestion, listUsers){
        Object.values(listQuestion).forEach(element => {
            const user = Object.values(listUsers).filter(user => user.id === element.author);
            element.authorUser = user[0];
          });

          return Object.values(listQuestion)
        
    }


    componentDidMount(){

        Promise.all([
            apiService.getQuestions(),
            apiService.getUsers(),
          ]).then(result => {
            const [ questions, users ] = result;
            const listQuestion = Object.values(questions);
            const listUsers = Object.values(users);


            this.setState(() => ({
                questionsUser: this.mergeUserDataInQuestion(listQuestion[0], listUsers[0]),
                
            }));
            console.log(this.state.questionsUser)
          });
      }

    render(){
        const { classes } = this.props;
        const { questionsUser } = this.state;
        return (
            <React.Fragment>
            <CssBaseline />
       
                <Grid container justify="center">
                    <Grid key='1' item direction="column" xs={9} container justify="center" >
                        {questionsUser && questionsUser.map((question) => (
                            <Container maxWidth="md" className={classes.container} key={question.id}>
                                <Question questionsUser={question}/>
                            </Container>
                        ))}
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