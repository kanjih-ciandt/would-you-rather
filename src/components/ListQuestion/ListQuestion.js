import React, { Component } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import Question,  {questionType} from '../Question/Question';

const useStyles = theme => ({
    container: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 1200,
        padding: '10px'
    },
    card: {
        marginBottom: '30px'
    },
    status: {
        position: 'absolute',
        top: '0px',
        right: '0px',
        marginBottom: '30px'
    },
   

});

class ListQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAnswered: true,
            showNotAnswered: true,
        };
    }

    render(){
        const { classes, questionProcessed} = this.props;
        const { showAnswered, showNotAnswered } = this.state;
        const handleChange = name => event => {
            this.setState({ ...this.state, [name]: event.target.checked });
        };

        return (
            <React.Fragment>
            <CssBaseline />
                { questionProcessed
                    ?  <Container maxWidth="md"  className={classes.container}>
                            <div>
                                {questionProcessed && showNotAnswered && questionProcessed.notAnswered.map((question) => (
                                    <div className={classes.card} key={question.id}>
                                        <Question questionsUser={question} type={questionType.PREVIEW} />
                                    </div>
                                ))}
                                {questionProcessed && showAnswered &&  questionProcessed.answered.map((question) => (
                                    <div className={classes.card} key={question.id}>
                                        <Question questionsUser={question} type={questionType.PREVIEW} />
                                    </div>
                                ))}
                            </div>
                            <div className ={classes.status}>
                                <Typography>
                                        Status
                                </Typography>
                                <FormGroup
                                    aria-label="question"
                                    name="question">
                                    <FormControlLabel
                                        checked={showNotAnswered}
                                        control={<Checkbox value="showNotAnswered" />}
                                        label="Not Answered"
                                        onChange={handleChange('showNotAnswered')}
                                        value="showNotAnswered"
                                    /> 
                                    <FormControlLabel
                                        checked={showAnswered}
                                        control={<Checkbox value="showAnswered" />}
                                        onChange={handleChange('showAnswered')}
                                        label="Answered"
                                        value="showAnswered"
                                    /> 
                                </FormGroup>
                            </div>
                        </Container>
                    :  <Container maxWidth="md"  className={classes.container}> <CircularProgress size={100} /> </Container>}
        </React.Fragment>
        )
    }
}
        
function filterList(questions, authedUser) {
      Object.values(questions.questions).forEach(element => {
        element.answered = element.optionOne.votes.concat(element.optionTwo.votes).includes(authedUser.id)
      });
      const answered = Object.values(questions.questions).filter(element => element.answered === true)
            .sort((a,b,) => b.timestamp - a.timestamp)
      const notAnswered = Object.values(questions.questions).filter(element => element.answered === false)
            .sort((a,b,) => b.timestamp - a.timestamp)
      
      return {answered, notAnswered};
}


function mapStateToProps ({authedUser, questions}) {
    return {
      authedUser,
      questionProcessed: Object.keys(questions).length > 0 && authedUser ? filterList(questions, authedUser) : null,
    }
}

export default connect(mapStateToProps) (withStyles(useStyles)(ListQuestion));