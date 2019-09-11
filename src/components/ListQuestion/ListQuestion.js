import React, { Component } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import Question,  {questionType} from '../Question/Question';
import { apiService } from '../../services/api.service';



const useStyles = theme => ({
    container: {
        
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 1200,
        padding: '10px'
        

    }
});

class ListQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionsUser: null,
            showAnswered: true,
            showNotAnswered: true,
        };
        
    }

    

    contentEnricher(listQuestion, listUsers){
        Object.values(listQuestion).forEach(element => {
            const user = Object.values(listUsers).filter(user => user.id === element.author);
            element.authorUser = user[0];
            element.answered = this.props.authedUser.questions.includes(element.id)
          });
          console.log(listQuestion);

          const listAnswered = Object.values(listQuestion).filter(question => question.answered === true)
          const listNotAnswered = Object.values(listQuestion).filter(question => question.answered === false)
          
          console.log(listAnswered);
          console.log(listNotAnswered);

          return Object.values(listNotAnswered);
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
                questionsUser: this.contentEnricher(listQuestion[0], listUsers[0]),
                
            }));
          });
      }

    render(){
        const { classes} = this.props;
        const { questionsUser, showAnswered, showNotAnswered } = this.state;
        const handleChange = name => event => {
            this.setState({ ...this.state, [name]: event.target.checked });
            

          };
        return (
            <React.Fragment>
            <CssBaseline />
       
                <Grid container justify="center">
                    <Grid key='0' item xs={4}>
                    </Grid>
                    <Grid key='1' item direction="column" xs={7} container justify="center" >
                        {questionsUser && questionsUser.map((question) => (
                            <Container maxWidth="md" className={classes.container} key={question.id}>
                                <Question questionsUser={question} type={questionType.PREVIEW}/>
                            </Container>
                        ))}
                    </Grid>
                    <Grid key='2' item xs={1}>
                            <Typography>
                                Status
                            </Typography>
                            <FormGroup
                                aria-label="question"
                                name="question">
                                <FormControlLabel
                                    checked={showAnswered}
                                    control={<Checkbox value="showAnswered" />}
                                    onChange={handleChange('showAnswered')}
                                    label="Answered"
                                    value="showAnswered"
                                /> 
                                <FormControlLabel
                                    checked={showNotAnswered}
                                    control={<Checkbox value="showNotAnswered" />}
                                    label="Not Answered"
                                    onChange={handleChange('showNotAnswered')}
                                    value="showNotAnswered"
                                /> 
                            </FormGroup>
                        
                    </Grid>
                 

            </Grid>
            
            </React.Fragment>
            
        )
    }
}

function mapStateToProps ({authedUser}, { id }) {
    return {
      authedUser,
    }
  }

export default connect(mapStateToProps) (withStyles(useStyles)(ListQuestion));