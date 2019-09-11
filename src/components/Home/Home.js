import React, { Component } from 'react'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Question,  {questionType} from '../Question/Question'
import { withStyles } from '@material-ui/core/styles';
import { apiService } from '../../services/api.service';
import Grid from '@material-ui/core/Grid';

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

    contentEnricher(questions, users){
        const listQuestion = questions[0];
        const listUsers = users[0];
        Object.values(listQuestion).forEach(element => {
            const user = Object.values(listUsers).filter(user => user.id === element.author);
            element.authorUser = user[0];
            element.answered = this.props.authedUser.questions.includes(element.id)
          });
          console.log(listQuestion);
          const listNotAnswered = Object.values(listQuestion).filter(question => question.answered === false)
          console.log(listNotAnswered);

          return {
                listNotAnswered: Object.values(listNotAnswered),
          };
    }


    componentDidMount(){
        Promise.all([
            apiService.getQuestions(),
            apiService.getUsers(),
          ]).then(result => {
            const [ questions, users ] = result;
            const { listNotAnswered} = this.contentEnricher(Object.values(questions), Object.values(users));
            this.setState(() => ({
                question: listNotAnswered[0],
            }));
          });
      }

    render(){
        const { classes } = this.props;
        const { question } = this.state;
        return (
            <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md" className={classes.container}>
                <Question questionsUser={question} type={questionType.OPEN}/>
            </Container>
            </React.Fragment>
        )
    }
}

function mapStateToProps ({authedUser}, { id }) {
    return {
      authedUser,
    }
}

export default connect(mapStateToProps) (withStyles(useStyles)(Home));