import React, { Component } from 'react'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Question,  {questionType} from '../Question/Question'
import { withStyles } from '@material-ui/core/styles';


const useStyles = theme => ({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 1200,
        padding: '10px'

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
        const { classes, currentQuestion } = this.props;
       
        return (
            <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md" className={classes.container}>
            <Question questionsUser={currentQuestion && currentQuestion} type={questionType.OPEN}/>
            </Container>
            </React.Fragment>
        )
    }
}

function filterNotListed(questions, authedUser, currentQuestion) {

    if (Object.keys(currentQuestion).length > 0) {
        return currentQuestion
    }
    Object.values(questions.questions).forEach(element => {
      element.answered = authedUser.questions.includes(element.id)
    });

    const listQuestion = Object.values(questions.questions).filter(element => element.answered === false)

    return listQuestion[0]
}


function mapStateToProps ({authedUser, questions, currentQuestion}) {
  return {
    authedUser,
    currentQuestion: Object.keys(questions).length > 0 && authedUser ? filterNotListed(questions, authedUser, currentQuestion) : null,
  }
}

export default connect(mapStateToProps) (withStyles(useStyles)(Home));