import React, { Component } from 'react'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Question,  {questionType} from '../Question/Question'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingBar from 'react-redux-loading'
import { history } from '../../helpers/history';



const useStyles = theme => ({
    
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 1200,
        padding: '10px',
        

    },
    progress: {
        margin: theme.spacing(1, 1, 1),

    }
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: null,
        };
    }

    render(){
        const { classes, currentQuestion} = this.props;

        const type = currentQuestion && currentQuestion.answered ? questionType.CLOSED : questionType.OPEN

        let question = ''
        if(currentQuestion === undefined) {
            question = 'You answered all questions !!!' 
        } else {
            question = currentQuestion ?  <Question questionsUser={currentQuestion && currentQuestion} type={type}/> :  <CircularProgress size={100} />
        }
        
        return (
            <React.Fragment>
            <CssBaseline />
            <LoadingBar />
            <Container maxWidth="md" className={classes.container}>
                {question}
            </Container>
            </React.Fragment>
        )
    }
}

function filterNotListed(questions, authedUser, currentQuestion, question_id) {
    
    if (!(Object.keys(questions).length > 0 && authedUser)) {
        return null
    }

    Object.values(questions.questions).forEach(element => {
        element.answered = element.optionOne.votes.concat(element.optionTwo.votes).includes(authedUser.id)
    });

    if(question_id !== undefined) {
        const question = Object.values(questions.questions).filter(element => element.id === question_id)
        console.log('question_id', question[0] === undefined )

        if(question[0] === undefined){
            history.push('/not-found')
        } else {
            return question[0] 
        }

    }

    
    if (Object.keys(currentQuestion).length > 0) {
        return currentQuestion
    }
    

    const listQuestion = Object.values(questions.questions).filter(element => element.answered === false)

    return listQuestion[0]
}


function mapStateToProps ({authedUser, questions, currentQuestion}, props) {

  return {
    authedUser,
    currentQuestion: filterNotListed(questions, authedUser, currentQuestion, props.question_id) 
  }
}

export default connect(mapStateToProps) (withStyles(useStyles)(Home));